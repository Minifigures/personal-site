"use client";

import { useAppStore } from "@/stores/use-app-store";

/**
 * Static, no-canvas gate for reduced-motion users. The global CSS hides every
 * <canvas> under prefers-reduced-motion, so this DOM layer is the only intro
 * that renders on that path.
 */
export function IntroFallback() {
  const setPhase = useAppStore((s) => s.setPhase);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #0d1a1a 0%, #05060a 100%)",
      }}
    >
      <p className="text-sand/50 font-mono text-[11px] uppercase tracking-[0.5em]">
        Human <span className="text-teal">+</span> AI
      </p>
      <h1 className="text-sand mt-3 font-display text-6xl font-bold tracking-tight sm:text-8xl">
        Marco Ayuste
      </h1>
      <p className="text-sand/55 mt-4 font-mono text-xs uppercase tracking-[0.35em]">
        AI Engineer <span className="text-teal">|</span> Researcher
      </p>
      <button
        onClick={() => setPhase("entered")}
        className="interactive text-sand mt-12 font-mono text-[0.8rem] uppercase tracking-[0.45em] underline-offset-8 hover:underline"
        aria-label="Enter experience"
      >
        Enter Experience
      </button>
    </div>
  );
}
