"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { useState, useCallback, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Minifigures",
    icon: "GH",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/marco-anthony-ayuste",
    icon: "LI",
  },
  {
    label: "Devpost",
    href: "https://devpost.com/minifiguresgt",
    icon: "DP",
  },
  {
    label: "Email",
    href: "mailto:minifiguresgt@gmail.com",
    icon: "EM",
  },
];

const RATE_LIMIT_KEY = "portfolio_email_count";
const RATE_LIMIT_RESET_KEY = "portfolio_email_reset";
const MAX_EMAILS = 5;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

function checkRateLimit(): { allowed: boolean; remaining: number } {
  if (typeof window === "undefined") return { allowed: true, remaining: MAX_EMAILS };

  const now = Date.now();
  const resetTime = Number(localStorage.getItem(RATE_LIMIT_RESET_KEY) ?? "0");

  // Reset counter if 24 hours have passed
  if (now > resetTime) {
    localStorage.setItem(RATE_LIMIT_KEY, "0");
    localStorage.setItem(RATE_LIMIT_RESET_KEY, String(now + RESET_INTERVAL_MS));
  }

  const count = Number(localStorage.getItem(RATE_LIMIT_KEY) ?? "0");
  return {
    allowed: count < MAX_EMAILS,
    remaining: MAX_EMAILS - count,
  };
}

function incrementRateLimit(): void {
  if (typeof window === "undefined") return;
  const count = Number(localStorage.getItem(RATE_LIMIT_KEY) ?? "0");
  localStorage.setItem(RATE_LIMIT_KEY, String(count + 1));

  // Set reset time if first email
  if (!localStorage.getItem(RATE_LIMIT_RESET_KEY)) {
    localStorage.setItem(
      RATE_LIMIT_RESET_KEY,
      String(Date.now() + RESET_INTERVAL_MS)
    );
  }
}

export function Contact() {
  const [formState, setFormState] = useState<
    "idle" | "sending" | "sent" | "error" | "rate_limited"
  >("idle");

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check rate limit
    const { allowed } = checkRateLimit();
    if (!allowed) {
      setFormState("rate_limited");
      return;
    }

    setFormState("sending");
    const form = e.target as HTMLFormElement;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      );

      incrementRateLimit();
      setFormState("sent");
      form.reset();
      setTimeout(() => setFormState("idle"), 3000);
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  }, []);

  const { remaining } = checkRateLimit();

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-coral/70">
            04 / Contact
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-sand sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-sand/50">
            Have a project in mind, a question, or just want to connect?
            I would love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact form */}
          <GlassCard>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="from_name"
                  className="mb-1 block font-mono text-xs uppercase tracking-wider text-sand/40"
                >
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  className="interactive w-full rounded-lg border border-sand/10 bg-sand/5 px-4 py-2.5 text-sm text-sand placeholder:text-sand/20 focus:border-coral/40 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="reply_to"
                  className="mb-1 block font-mono text-xs uppercase tracking-wider text-sand/40"
                >
                  Email
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  required
                  className="interactive w-full rounded-lg border border-sand/10 bg-sand/5 px-4 py-2.5 text-sm text-sand placeholder:text-sand/20 focus:border-coral/40 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block font-mono text-xs uppercase tracking-wider text-sand/40"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="interactive w-full resize-none rounded-lg border border-sand/10 bg-sand/5 px-4 py-2.5 text-sm text-sand placeholder:text-sand/20 focus:border-coral/40 focus:outline-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Hidden field: recipient email for the template */}
              <input type="hidden" name="to_email" value="minifiguresgt@gmail.com" />

              <button
                type="submit"
                disabled={formState === "sending" || formState === "rate_limited"}
                className="interactive mt-2 w-full rounded-full border border-coral/40 bg-coral/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-coral transition-all hover:bg-coral/20 disabled:opacity-50"
              >
                {formState === "idle" && `Send Message (${remaining} left today)`}
                {formState === "sending" && "Sending..."}
                {formState === "sent" && "Sent!"}
                {formState === "error" && "Failed, try again"}
                {formState === "rate_limited" &&
                  "Rate limit reached, try tomorrow"}
              </button>
            </form>
          </GlassCard>

          {/* Social links */}
          <div className="flex flex-col gap-4">
            <GlassCard delay={0.1}>
              <h3 className="mb-4 font-display text-lg font-semibold text-sand">
                Connect
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive flex items-center gap-3 rounded-xl border border-sand/5 bg-sand/[0.02] p-3 transition-all hover:border-coral/20 hover:bg-sand/5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10">
                      <span className="font-mono text-xs font-bold text-coral">
                        {link.icon}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-sand/60">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <h3 className="mb-2 font-display text-lg font-semibold text-sand">
                Location
              </h3>
              <p className="text-sm text-sand/50">Toronto, ON, Canada</p>
              <p className="mt-1 font-mono text-xs text-sand/30">
                University of Toronto Mississauga
              </p>
            </GlassCard>

            <GlassCard delay={0.3}>
              <h3 className="mb-2 font-display text-lg font-semibold text-sand">
                Interested In
              </h3>
              <p className="text-sm text-sand/50">
                2026/2027 internship roles in research, front-end, full-stack,
                UI/UX, product, software engineering, or data/automation.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
