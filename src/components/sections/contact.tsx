"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { useState, type FormEvent } from "react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Minifigures",
    icon: "GH",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/marcoayuste",
    icon: "LI",
  },
  {
    label: "Devpost",
    href: "https://devpost.com/marcoayuste",
    icon: "DP",
  },
  {
    label: "Email",
    href: "mailto:marco.ayuste@mail.utoronto.ca",
    icon: "EM",
  },
];

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    // EmailJS integration placeholder
    // In production, wire this up to your EmailJS service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormState("sent");
    (e.target as HTMLFormElement).reset();

    setTimeout(() => setFormState("idle"), 3000);
  }

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
                  htmlFor="name"
                  className="mb-1 block font-mono text-xs uppercase tracking-wider text-sand/40"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="interactive w-full rounded-lg border border-sand/10 bg-sand/5 px-4 py-2.5 text-sm text-sand placeholder:text-sand/20 focus:border-coral/40 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block font-mono text-xs uppercase tracking-wider text-sand/40"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
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

              <button
                type="submit"
                disabled={formState === "sending"}
                className="interactive mt-2 w-full rounded-full border border-coral/40 bg-coral/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-coral transition-all hover:bg-coral/20 disabled:opacity-50"
              >
                {formState === "idle" && "Send Message"}
                {formState === "sending" && "Sending..."}
                {formState === "sent" && "Sent!"}
                {formState === "error" && "Try Again"}
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
              <p className="text-sm text-sand/50">
                Toronto, ON, Canada
              </p>
              <p className="mt-1 font-mono text-xs text-sand/30">
                University of Toronto Mississauga
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
