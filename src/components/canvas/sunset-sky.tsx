"use client";

import { Sky } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  type Mesh,
  type SpriteMaterial as SpriteMaterialType,
} from "three";

const SUN_POSITION: [number, number, number] = [100, 12, -100];

export function SunsetSky() {
  const glowRef = useRef<Mesh>(null);
  const spriteRef = useRef<SpriteMaterialType>(null);

  const sunColor = useMemo(() => new Color("#FFF4E0").multiplyScalar(3), []);
  const glowColor = useMemo(() => new Color("#FF8C42").multiplyScalar(2), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Subtle sun pulse for life
    if (spriteRef.current) {
      spriteRef.current.opacity = 0.35 + Math.sin(t * 0.3) * 0.05;
    }
    if (glowRef.current) {
      const scale = 18 + Math.sin(t * 0.2) * 0.5;
      glowRef.current.scale.set(scale, scale, 1);
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

      {/* Sun core: small, extremely bright for bloom to pick up */}
      <mesh position={SUN_POSITION}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color={sunColor}
          toneMapped={false}
        />
      </mesh>

      {/* Outer glow sprite: additive blending creates natural halo */}
      <sprite ref={glowRef} position={SUN_POSITION} scale={[18, 18, 1]}>
        <spriteMaterial
          ref={spriteRef}
          color={glowColor}
          transparent
          opacity={0.35}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>

      {/* Directional light from sun for scene illumination */}
      <directionalLight
        position={SUN_POSITION}
        intensity={2}
        color="#FF9F5A"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
