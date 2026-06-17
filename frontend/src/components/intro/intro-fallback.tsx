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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060a] px-6 text-center">
      {/* Static poster of the reaching hands (no motion for reduced-motion users) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/intro/intro-poster.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(5,6,10,0.6)" }}
      />
      <div className="relative flex flex-col items-center" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.72)" }}>
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
    </div>
  );
}
