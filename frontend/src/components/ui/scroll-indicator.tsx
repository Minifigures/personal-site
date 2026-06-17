"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ScrollIndicator() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "#1A1A2E", textShadow: "0 0 15px rgba(255,255,255,0.5)" }}
      >
        Scroll to explore
      </span>
      <div className="h-8 w-5 rounded-full border-2 border-navy/40 p-1">
        {prefersReduced ? (
          <div className="mx-auto h-2 w-1 rounded-full bg-navy/60" />
        ) : (
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-navy/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}
