"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useState, useCallback, useEffect, type FormEvent } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiDevpost } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import type { IconType } from "react-icons";

const SOCIAL_LINKS: { label: string; href: string; icon: IconType }[] = [
  {
    label: "GitHub",
    href: "https://github.com/Minifigures",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/marco-anthony-ayuste",
    icon: FaLinkedinIn,
  },
  {
    label: "Devpost",
    href: "https://devpost.com/minifiguresgt",
    icon: SiDevpost,
  },
  {
    label: "Email",
    href: "mailto:marco.ayuste@mail.utoronto.ca",
    icon: MdEmail,
  },
];

const MAX_EMAILS = 5;

type FormStatus = "idle" | "sending" | "sent" | "error" | "rate_limited";

export function Contact() {
  const [formState, setFormState] = useState<FormStatus>("idle");
  const [remaining, setRemaining] = useState<number>(MAX_EMAILS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/contact")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { remaining?: number } | null) => {
        if (cancelled || !data || typeof data.remaining !== "number") return;
        setRemaining(data.remaining);
        if (data.remaining <= 0) setFormState("rate_limited");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      from_name: String(fd.get("from_name") ?? ""),
      reply_to: String(fd.get("reply_to") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    setFormState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { remaining?: number; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (res.status === 429) {
        setRemaining(0);
        setFormState("rate_limited");
        return;
      }

      if (!res.ok) {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
        return;
      }

      if (typeof data.remaining === "number") setRemaining(data.remaining);
      setFormState("sent");
      form.reset();
      setTimeout(() => setFormState("idle"), 3000);
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  }, []);

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeader number="04" label="Contact" title="Get in Touch" center />
        <p className="-mt-8 mb-12 mx-auto max-w-md text-center text-base text-sand/50">
          Have a project in mind, a question, or just want to connect?
          I would love to hear from you.
        </p>

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
                  maxLength={200}
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
                  maxLength={200}
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
                  maxLength={5000}
                  className="interactive w-full resize-none rounded-lg border border-sand/10 bg-sand/5 px-4 py-2.5 text-sm text-sand placeholder:text-sand/20 focus:border-coral/40 focus:outline-none"
                  placeholder="Tell me about your project..."
                />
              </div>

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
                      <link.icon size={16} className="text-coral" />
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
