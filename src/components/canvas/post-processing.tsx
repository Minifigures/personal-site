"use client";

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ToneMapping,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export function ScenePostProcessing() {
  return (
    <EffectComposer>
      {/* Bloom: lowered threshold so the bright sun core glows naturally */}
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {/* Film grain for cinematic ASTRODITHER-inspired aesthetic */}
      <Noise
        opacity={0.05}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      {/* Subtle chromatic aberration for lens realism */}
      <ChromaticAberration
        offset={new Vector2(0.0005, 0.0005)}
        radialModulation
        modulationOffset={0.5}
      />
      {/* Soft edge darkening */}
      <Vignette eskil={false} offset={0.15} darkness={0.5} />
      {/* ACES Filmic for cinematic warmth */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
