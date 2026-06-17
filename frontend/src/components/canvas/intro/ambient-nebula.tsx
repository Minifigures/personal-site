"use client";

import { Sparkles } from "@react-three/drei";
import { useAppStore } from "@/stores/use-app-store";

/** Luminous haze giving the scene depth, drawn in a single pass each. */
export function AmbientNebula() {
  const degraded = useAppStore((s) => s.introDegraded);
  return (
    <>
      <Sparkles
        count={degraded ? 40 : 90}
        scale={8}
        size={2.5}
        speed={0.15}
        noise={1}
        color="#2A9D8F"
        opacity={0.4}
      />
      <Sparkles
        count={degraded ? 16 : 32}
        scale={6}
        size={3.5}
        speed={0.1}
        noise={1}
        color="#E8735A"
        opacity={0.25}
      />
    </>
  );
}
