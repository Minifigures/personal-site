"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useCallback } from "react";

export function SectionHeader({
  number,
  label,
  title,
  center = false,
}: {
  number: string;
  label: string;
  title: string;
  center?: boolean;
}) {
  const controls = useAnimationControls();

  const handleClick = useCallback(async () => {
    await controls.start({
      scale: [1, 1.05, 0.97, 1.02, 1],
      rotateX: [0, -3, 2, -1, 0],
      filter: [
        "brightness(1) drop-shadow(0 0 0px rgba(232,115,90,0))",
        "brightness(1.3) drop-shadow(0 0 20px rgba(232,115,90,0.6))",
        "brightness(1.1) drop-shadow(0 0 10px rgba(232,115,90,0.3))",
        "brightness(1) drop-shadow(0 0 0px rgba(232,115,90,0))",
      ],
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <motion.div
      className={`mb-12 cursor-pointer select-none ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={handleClick}
      animate={controls}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-coral/70">
        {number} / {label}
      </span>
      <motion.h2
        className="mt-2 font-display text-3xl font-bold text-sand sm:text-5xl"
        whileTap={{ scale: 0.96 }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
