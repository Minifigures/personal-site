"use client";

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";

export function ScenePostProcessing() {
  return (
    <EffectComposer>
      {/* Bloom: gentle glow on bright areas (sun reflections on water) */}
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.75}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {/* Subtle film grain for cinematic feel */}
      <Noise
        opacity={0.04}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      {/* Soft edge darkening */}
      <Vignette eskil={false} offset={0.15} darkness={0.4} />
      {/* ACES Filmic for warm cinematic tones */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
