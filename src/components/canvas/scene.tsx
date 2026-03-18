"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  PerformanceMonitor,
} from "@react-three/drei";
import { SunsetSky } from "./sunset-sky";
import { Ocean } from "./ocean";
import { ScenePostProcessing } from "./post-processing";
import { Particles } from "./particles";

export function Scene() {
  return (
    <Canvas
      className="!fixed inset-0 !h-screen !w-screen"
      camera={{ position: [0, 3, 10], fov: 55, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <PerformanceMonitor>
        <Suspense fallback={null}>
          <SunsetSky />
          <Ocean />
          <Particles />
          <ScenePostProcessing />
          <ambientLight intensity={0.4} color="#FFDAB9" />
          <directionalLight
            position={[10, 5, -15]}
            intensity={1.5}
            color="#FF8C42"
            castShadow
          />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </PerformanceMonitor>
    </Canvas>
  );
}
