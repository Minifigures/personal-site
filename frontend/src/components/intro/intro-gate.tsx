"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/use-app-store";
import { IntroFallback } from "./intro-fallback";
import { IntroOverlay } from "@/components/ui/intro-overlay";
import { IntroCanvas } from "@/components/canvas/intro-canvas";

/** Time from clicking Enter to the hard hand-off into the beach (ms). */
const ENTER_DURATION = 1150;

/**
 * The dark neural intro gate. Owns the phase machine, scroll lock, and reduced
 * motion. Renders nothing once entered so the beach (rendered separately) is
 * the only live layer and only one WebGL context exists at a time.
 */
export function IntroGate() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [setReducedMotion]);

  useEffect(() => {
    if (phase === "entered") {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "entering") return;
    const id = window.setTimeout(() => setPhase("entered"), ENTER_DURATION);
    return () => window.clearTimeout(id);
  }, [phase, setPhase]);

  if (phase === "entered") return null;

  if (reducedMotion) return <IntroFallback />;

  return (
    <>
      <IntroCanvas />
      <IntroOverlay onEnter={() => setPhase("entering")} />
    </>
  );
}
