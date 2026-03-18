"use client";

import { motion } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex h-screen flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        className="font-mono text-xs uppercase tracking-[0.3em] text-sand/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Portfolio 2026
      </motion.div>

      <motion.h1
        className="mt-4 font-display text-5xl font-bold tracking-tight text-sand sm:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
      >
        Marco Anthony
        <br />
        <span
          style={{
            background:
              "linear-gradient(135deg, #C5D5A6 0%, #F4A942 50%, #E8735A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Ayuste
        </span>
      </motion.h1>

      <motion.p
        className="mt-6 max-w-lg text-base text-sand/60 sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
      >
        Full-stack developer, AI/ML engineer, building things that matter
        at the University of Toronto.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <a
          href="#projects"
          className="interactive rounded-full border border-coral/40 bg-coral/10 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-coral transition-all hover:bg-coral/20"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="interactive rounded-full border border-sand/20 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-sand/60 transition-all hover:border-sand/40 hover:text-sand"
        >
          Contact
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="mt-20"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
