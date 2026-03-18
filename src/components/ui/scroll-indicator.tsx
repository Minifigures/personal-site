"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm uppercase tracking-widest text-sand/50">
        Scroll to explore
      </span>
      <motion.div
        className="h-8 w-5 rounded-full border-2 border-sand/30 p-1"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        <motion.div
          className="mx-auto h-2 w-1 rounded-full bg-sand/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
