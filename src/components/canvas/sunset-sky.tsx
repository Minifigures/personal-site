"use client";

import { Sky } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

/**
 * Sun position: matching Three.js webgl_shaders_ocean example.
 * elevation=2, azimuth=180 => sun barely above horizon, directly ahead.
 *
 * Converted from spherical:
 *   phi = degToRad(90 - 2) = 1.536 rad
 *   theta = degToRad(180) = PI
 *   x = sin(phi)*cos(theta) = -0.999
 *   y = cos(phi) = 0.035
 *   z = sin(phi)*sin(theta) = ~0
 *
 * Scaled up and positioned so the sun is ahead-left from the starting camera.
 */
const SUN_POSITION: [number, number, number] = [20, 3, -200];

export function SunsetSky() {
  const { gl } = useThree();

  // Match the Three.js example's low exposure for dramatic sunset
  useEffect(() => {
    gl.toneMappingExposure = 0.5;
  }, [gl]);

  return (
    <>
      {/* Sky shader: same params as Three.js ocean example */}
      <Sky
        distance={450000}
        sunPosition={SUN_POSITION}
        turbidity={10}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Directional light from the sun direction */}
      <directionalLight
        position={SUN_POSITION}
        intensity={2}
        color="#FFB366"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Warm ambient fill so the scene isn't pitch black */}
      <ambientLight intensity={0.3} color="#FFDAB9" />
    </>
  );
}

export { SUN_POSITION };
