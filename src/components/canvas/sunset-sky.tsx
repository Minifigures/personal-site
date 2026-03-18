"use client";

import { Sky } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function SunsetSky() {
  const sunRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    // Subtle sun bob for life
    if (sunRef.current) {
      sunRef.current.position.y =
        5 + Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[100, 5, -100]}
        inclination={0.48}
        azimuth={0.25}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        rayleigh={2}
        turbidity={8}
      />
      {/* Sun glow sphere */}
      <mesh ref={sunRef} position={[100, 5, -100]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#FF6B35" toneMapped={false} />
      </mesh>
    </>
  );
}
