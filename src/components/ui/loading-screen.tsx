"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xl text-sand/80">Loading</p>
          <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-sand/10">
            <motion.div
              className="h-full rounded-full bg-coral"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
