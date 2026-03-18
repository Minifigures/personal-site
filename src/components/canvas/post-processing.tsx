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
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Noise
        opacity={0.04}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.4} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
