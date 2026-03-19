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
        className="text-outlined font-mono text-xs uppercase tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Portfolio 2026
      </motion.div>

      <motion.h1
        className="text-outlined-heavy mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
      >
        Marco Anthony
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #E8735A 0%, #FF6B35 50%, #F4A942 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "0",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 10px rgba(232,115,90,0.5))",
          }}
        >
          Ayuste
        </span>
      </motion.h1>

      <motion.p
        className="text-outlined mt-6 max-w-lg text-base font-medium sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
      >
        Student graduating 2027 at the University of Toronto.
        AI/ML Software Engineer.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <a
          href="#projects"
          className="interactive glass-thin rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-coral shadow-lg shadow-coral/20 transition-all hover:border-coral/40"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="interactive glass-thin rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:border-white/30"
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
