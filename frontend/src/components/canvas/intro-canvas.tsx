"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import { NeuralSpark } from "./intro/neural-spark";
import { ConvergingStreams } from "./intro/converging-streams";
import { AmbientNebula } from "./intro/ambient-nebula";
import { IntroCameraRig } from "./intro/intro-camera-rig";
import { IntroPostProcessing } from "./intro/intro-post-processing";
import { useAppStore } from "@/stores/use-app-store";

/** The dark neural intro scene. Mounted only while gating (single WebGL context). */
export function IntroCanvas() {
  const setIntroDegraded = useAppStore((s) => s.setIntroDegraded);

  return (
    <Canvas
      className="!fixed !inset-0 !h-screen !w-screen"
      style={{ zIndex: 30 }}
      gl={{ antialias: false, alpha: true, toneMapping: ACESFilmicToneMapping }}
      dpr={[0.75, 1.5]}
      camera={{ position: [0, 0, 5], fov: 60, near: 0.01, far: 50 }}
    >
      <PerformanceMonitor onDecline={() => setIntroDegraded(true)}>
        <Suspense fallback={null}>
          <IntroCameraRig />
          <NeuralSpark />
          <ConvergingStreams />
          <AmbientNebula />
          <IntroPostProcessing />
        </Suspense>
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>
    </Canvas>
  );
}
