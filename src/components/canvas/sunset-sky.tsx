"use client";

import { Sky } from "@react-three/drei";

/**
 * Sun position: low elevation for golden hour.
 * Matching the Three.js ocean example approach: let the Sky shader
 * handle ALL sun rendering. No extra spheres or sprites.
 */
const SUN_POSITION: [number, number, number] = [100, 8, -100];

export function SunsetSky() {
  return (
    <>
      {/* Sky shader handles the sun disc, atmospheric scattering, everything.
          Tuned to match Three.js webgl_shaders_ocean example parameters. */}
      <Sky
        distance={450000}
        sunPosition={SUN_POSITION}
        turbidity={10}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Directional light from sun direction for scene illumination only.
          No visible mesh, just light. */}
      <directionalLight
        position={SUN_POSITION}
        intensity={1.5}
        color="#FFDAB9"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
