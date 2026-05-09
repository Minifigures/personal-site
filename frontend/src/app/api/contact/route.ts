import { NextResponse, type NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "nodejs";

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? "",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "24 h"),
  prefix: "contact",
  analytics: false,
});

type ContactPayload = {
  from_name?: unknown;
  reply_to?: unknown;
  message?: unknown;
};

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isStringField(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= max;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { from_name, reply_to, message } = body;
  if (
    !isStringField(from_name, 200) ||
    !isStringField(reply_to, 200) ||
    !isStringField(message, 5000)
  ) {
    return NextResponse.json({ error: "Invalid form fields" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const { success, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: "Rate limit reached. Try again tomorrow.",
        remaining: 0,
        reset,
      },
      { status: 429 }
    );
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: { from_name, reply_to, message },
    }),
  });

  if (!emailjsRes.ok) {
    const detail = await emailjsRes.text();
    return NextResponse.json(
      { error: "Email send failed", detail },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, remaining });
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { remaining, reset } = await ratelimit.getRemaining(ip);
  return NextResponse.json({ remaining, reset });
}
