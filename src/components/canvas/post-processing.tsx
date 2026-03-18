"use client";

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function ScenePostProcessing() {
  return (
    <EffectComposer>
      {/* Bloom: subtle like Three.js ocean example (strength=0.1) */}
      <Bloom
        intensity={0.15}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {/* Subtle film grain */}
      <Noise
        opacity={0.04}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      {/* Soft edge darkening */}
      <Vignette eskil={false} offset={0.15} darkness={0.4} />
      {/* ToneMapping handled by Canvas gl prop + SunsetSky exposure now */}
    </EffectComposer>
  );
}
