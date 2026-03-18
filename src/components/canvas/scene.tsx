"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  PerformanceMonitor,
} from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import { SunsetSky } from "./sunset-sky";
import { Ocean } from "./ocean";
import { ScenePostProcessing } from "./post-processing";
import { Particles } from "./particles";
import { CameraRig } from "./camera-rig";
import { Island, Boat } from "./island";

export function Scene() {
  return (
    <Canvas
      className="!fixed inset-0 !h-screen !w-screen"
      camera={{ position: [0, 3, 10], fov: 55, near: 0.1, far: 1000 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: ACESFilmicToneMapping,
      }}
      dpr={[1, 2]}
      shadows
    >
      <PerformanceMonitor>
        <Suspense fallback={null}>
          {/* Scroll-driven camera */}
          <CameraRig />

          {/* Environment */}
          <SunsetSky />
          <Ocean />
          <Island />
          <Boat />
          <Particles />

          {/* Post-processing */}
          <ScenePostProcessing />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </PerformanceMonitor>
    </Canvas>
  );
}
