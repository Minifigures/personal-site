"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="relative z-10 border-t border-sand/5 px-6 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-sand/30">
          &copy; {new Date().getFullYear()} Marco Anthony Ayuste. All rights reserved.
        </p>
        <p className="font-mono text-xs text-sand/20">
          Built with Next.js, React Three Fiber, and too much caffeine.
        </p>
      </div>
    </motion.footer>
  );
}
