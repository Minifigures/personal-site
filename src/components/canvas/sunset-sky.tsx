"use client";

import { Sky } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  type SpriteMaterial as SpriteMaterialType,
} from "three";

const SUN_POSITION: [number, number, number] = [100, 10, -100];

export function SunsetSky() {
  const spriteRef = useRef<SpriteMaterialType>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (spriteRef.current) {
      spriteRef.current.opacity = 0.2 + Math.sin(t * 0.3) * 0.03;
    }
  });

  return (
    <>
      {/* Atmospheric sky shader tuned for golden hour */}
      <Sky
        distance={450000}
        sunPosition={SUN_POSITION}
        turbidity={10}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.95}
      />

      {/* Sun core: warm, not blinding. Color multiplied to ~1.5x for gentle bloom */}
      <mesh position={SUN_POSITION}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color={new Color("#FFECD2").multiplyScalar(1.5)}
          toneMapped={false}
        />
      </mesh>

      {/* Soft outer glow halo */}
      <sprite position={SUN_POSITION} scale={[14, 14, 1]}>
        <spriteMaterial
          ref={spriteRef}
          color={new Color("#FF9F5A")}
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>

      {/* Directional light from sun */}
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
