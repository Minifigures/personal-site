"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function UiToggle({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  const toggle = useCallback(() => setVisible((v) => !v), []);

  // Keyboard shortcut: H key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (
        e.key === "h" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggle();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggle]);

  return (
    <>
      {/* Toggle button: fixed bottom-right */}
      <button
        onClick={toggle}
        className="interactive fixed right-4 bottom-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-sand/10 bg-sand/5 backdrop-blur-md transition-all hover:border-coral/30 hover:bg-sand/10"
        aria-label={visible ? "Hide UI" : "Show UI"}
        title={`${visible ? "Hide" : "Show"} UI (H)`}
      >
        <span className="font-mono text-[10px] font-bold text-sand/50">
          {visible ? "H" : "S"}
        </span>
      </button>

      {/* UI content with fade animation */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="relative z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
