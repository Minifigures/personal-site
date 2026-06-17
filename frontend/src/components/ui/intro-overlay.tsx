"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/use-app-store";

const LEFT_CODE = `print("AI is learning");
if (input == "human") {
  connect();
}`;

const RIGHT_CODE = `// HITL Review & Efficiency
if (processComplexity > threshold) {
  escalateToHuman();
} else {
  streamlinePipelines();
}
costOptimization = true;`;

/** DOM foreground for the intro: title, code, and the Enter gate. */
export function IntroOverlay({ onEnter }: { onEnter: () => void }) {
  const entering = useAppStore((s) => s.phase) === "entering";

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col items-center justify-center px-6">
      {/* CSS vignette over the whole composed view (rain + neural scene) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <AnimatePresence>
        {!entering && (
          <>
            <motion.pre
              key="left"
              className="text-teal absolute left-6 top-1/4 hidden font-mono text-[11px] leading-[1.7] lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {LEFT_CODE}
            </motion.pre>
            <motion.pre
              key="right"
              className="text-coral absolute right-6 top-1/4 hidden text-right font-mono text-[11px] leading-[1.7] lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {RIGHT_CODE}
            </motion.pre>

            <motion.div
              key="center"
              className="flex flex-col items-center text-center"
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-sand/50 font-mono text-[11px] uppercase tracking-[0.5em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Human <span className="text-teal">+</span> AI
              </motion.p>
              <motion.h1
                className="text-sand mt-3 font-display text-6xl font-bold tracking-tight sm:text-8xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Marco Ayuste
              </motion.h1>
              <motion.p
                className="text-sand/55 mt-4 font-mono text-xs uppercase tracking-[0.35em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                AI Engineer <span className="text-teal">|</span> Researcher
              </motion.p>
              <motion.button
                onClick={onEnter}
                className="interactive group text-sand pointer-events-auto mt-12 font-mono text-[0.8rem] uppercase tracking-[0.45em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <span className="relative inline-block">
                  Enter Experience
                  <span className="bg-teal absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
                </span>
              </motion.button>
              <motion.p
                className="text-sand/25 mt-5 font-mono text-[9px] uppercase tracking-[0.3em]"
                animate={{ opacity: [0.25, 0.6, 0.25] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                a beach waits on the other side
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entering && (
          <motion.div
            key="flash"
            className="pointer-events-none fixed inset-0"
            style={{
              background:
                "radial-gradient(circle at center, #7fffef 0%, #2A9D8F 45%, transparent 75%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.0, times: [0, 0.45, 1], ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
