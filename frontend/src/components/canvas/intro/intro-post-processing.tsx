"use client";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

const CA_OFFSET = new Vector2(0.0012, 0.0012);

/**
 * Neon-on-black grade for the intro. The canvas is transparent (rain shows
 * behind), so vignette/noise live in CSS to avoid artifacts over transparent
 * pixels. The enter "detonation" is driven by the spark scaling up (more HDR
 * for bloom to catch) plus the DOM flash, so no per-frame effect refs are
 * needed here.
 */
export function IntroPostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={2.4}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.2}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={CA_OFFSET}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  );
}
