"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/stores/use-app-store";

/**
 * Full-screen looping intro backdrop: an animated robotic + human hand reaching
 * toward a glowing spark (Creation of Adam, "Human + AI"). This is a plain
 * <video>, so unlike the previous WebGL scene there is no live GPU context
 * while gating. On Enter it scales and blooms out as the beach takes over.
 */
export function IntroVideo() {
  const entering = useAppStore((s) => s.phase) === "entering";
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Some mobile browsers need an explicit play() after mount for muted autoplay.
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-30 overflow-hidden bg-[#05060a]">
      <video
        ref={ref}
        className="h-full w-full object-cover transition-[transform,filter,opacity] duration-[1100ms] ease-in"
        style={{
          transform: entering ? "scale(1.2)" : "scale(1.02)",
          filter: entering ? "brightness(1.7) saturate(1.3)" : "brightness(1)",
          opacity: entering ? 0 : 1,
        }}
        src="/intro/intro.mp4"
        poster="/intro/intro-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      {/* Uniform scrim + top/bottom falloff so the title reads over the spark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(5,6,10,0.5)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,6,10,0.45) 0%, transparent 30%, transparent 64%, rgba(5,6,10,0.72) 100%)",
        }}
      />
    </div>
  );
}
