"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 sm:p-8",
        className
      )}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
