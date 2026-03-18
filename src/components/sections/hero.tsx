"use client";

import { motion } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export function Hero() {
  return (
    <section className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <motion.h1
        className="font-display text-5xl font-bold tracking-tight text-sand sm:text-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Marco Anthony Ayuste
      </motion.h1>
      <motion.p
        className="mt-4 max-w-md text-lg text-sand/70 sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      >
        Full-stack developer, AI/ML engineer, builder of things that matter.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="mt-16"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
