"use client";

import { useState, useCallback, useEffect } from "react";

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
      {/* Toggle button: fixed right edge, always visible */}
      <button
        onClick={toggle}
        className="interactive fixed right-4 bottom-6 z-[60] flex items-center gap-2 rounded-full border border-sand/15 bg-navy/60 px-4 py-2 backdrop-blur-md transition-all hover:border-coral/40 hover:bg-navy/80"
        aria-label={visible ? "Hide UI" : "Show UI"}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-sand/60">
          {visible ? "Hide UI" : "Show UI"}
        </span>
        <span className="font-mono text-[10px] text-sand/30">(H)</span>
      </button>

      {/* UI content: hidden via opacity + pointer-events, stays in DOM */}
      <div
        className="relative z-10 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
