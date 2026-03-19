"use client";

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
  HueSaturation,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

const chromaticOffset = new Vector2(0.0006, 0.0006);

export function ScenePostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      {/* Bloom: stronger for sun glow and lighthouse */}
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {/* Warm sunset color grading */}
      <HueSaturation
        blendFunction={BlendFunction.NORMAL}
        hue={0.05}
        saturation={0.15}
      />
      {/* Slight contrast boost for drama */}
      <BrightnessContrast
        brightness={0.0}
        contrast={0.1}
      />
      {/* Chromatic aberration for cinematic lens feel */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaticOffset}
        radialModulation
        modulationOffset={0.5}
      />
      {/* Subtle film grain */}
      <Noise
        opacity={0.035}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      {/* Stronger vignette for focus */}
      <Vignette eskil={false} offset={0.2} darkness={0.55} />
    </EffectComposer>
  );
}
