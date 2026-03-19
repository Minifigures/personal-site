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
        className="font-mono text-xs uppercase tracking-[0.3em]"
        style={{ color: "#1A1A2E", textShadow: "0 0 20px rgba(255,255,255,0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Portfolio 2026
      </motion.div>

      <motion.h1
        className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        style={{
          color: "#1A1A2E",
          textShadow: "0 2px 30px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.3)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
      >
        Marco Anthony
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #B8441A 0%, #D4651E 50%, #E8735A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 10px rgba(232,115,90,0.4))",
          }}
        >
          Ayuste
        </span>
      </motion.h1>

      <motion.p
        className="mt-6 max-w-lg text-base font-medium sm:text-lg"
        style={{
          color: "#2A2A3E",
          textShadow: "0 1px 15px rgba(255,255,255,0.5)",
        }}
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
          className="interactive rounded-full border-2 border-coral bg-coral/90 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral hover:shadow-xl"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="interactive rounded-full border-2 border-navy/60 bg-navy/70 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-sand shadow-lg backdrop-blur-sm transition-all hover:bg-navy/90"
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
