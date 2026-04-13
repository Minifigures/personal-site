"use client";

import { useState, useCallback } from "react";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
  HueSaturation,
  BrightnessContrast,
  GodRays,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Vector2, Mesh } from "three";
import { SUN_POSITION } from "./sunset-sky";

const chromaticOffset = new Vector2(0.0006, 0.0006);

export function ScenePostProcessing() {
  const [sunMesh, setSunMesh] = useState<Mesh | null>(null);

  const sunRef = useCallback((mesh: Mesh | null) => {
    if (mesh) setSunMesh(mesh);
  }, []);

  return (
    <>
      {/* Sun mesh used as GodRays light source */}
      <mesh ref={sunRef} position={SUN_POSITION}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial color="#FF8C42" transparent opacity={0} />
      </mesh>

      <EffectComposer multisampling={0}>
        {/* God rays from the sun */}
        {sunMesh ? (
          <GodRays
            sun={sunMesh}
            blendFunction={BlendFunction.SCREEN}
            samples={40}
            density={0.96}
            decay={0.93}
            weight={0.3}
            exposure={0.5}
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur
          />
        ) : (
          <></>
        )}

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
    </>
  );
}
