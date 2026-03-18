"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Animate the counter smoothly
  useEffect(() => {
    const target = Math.round(progress);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [progress]);

  const handleDismiss = useCallback(() => {
    if (progress >= 100) {
      setShow(false);
    }
  }, [progress]);

  // Auto-dismiss after a short delay once loaded
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setShow(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #1A3A2A 70%, #2D3A1E 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={handleDismiss}
        >
          {/* Background grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Animated gradient line at top */}
          <motion.div
            className="absolute top-0 left-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, #A8B98F, #C5D5A6, #F4A942, #E8735A)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Center content */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Initials / Logo */}
            <motion.div
              className="font-display text-6xl font-bold tracking-tighter sm:text-8xl"
              style={{
                background:
                  "linear-gradient(135deg, #C5D5A6 0%, #F4A942 50%, #E8735A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              MA
            </motion.div>

            {/* Progress counter */}
            <div className="flex items-baseline gap-1 font-mono text-sm tracking-widest text-sand/40">
              <motion.span
                className="text-2xl tabular-nums text-sand/60"
                key={displayProgress}
              >
                {String(displayProgress).padStart(3, "0")}
              </motion.span>
              <span>%</span>
            </div>

            {/* Loading bar */}
            <div className="h-[1px] w-48 overflow-hidden bg-sand/10">
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, #A8B98F, #F4A942, #E8735A)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Click prompt when loaded */}
            <AnimatePresence>
              {progress >= 100 && (
                <motion.p
                  className="cursor-pointer font-mono text-xs uppercase tracking-[0.3em] text-sand/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  onClick={handleDismiss}
                >
                  Click to enter
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 h-8 w-8 border-l border-t border-sand/10" />
          <div className="absolute top-6 right-6 h-8 w-8 border-r border-t border-sand/10" />
          <div className="absolute bottom-6 left-6 h-8 w-8 border-l border-b border-sand/10" />
          <div className="absolute bottom-6 right-6 h-8 w-8 border-r border-b border-sand/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
