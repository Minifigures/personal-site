"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { Color } from "three";
import type { Group, Mesh } from "three";
import { useAppStore } from "@/stores/use-app-store";

/** HDR colours (values above 1 so luminance bloom catches them). */
const CORE_COLOR = new Color(0, 4, 3);
const FRINGE_COLOR = new Color(2.4, 0.3, 1.4);

/** The central spark where the AI and human energy streams converge. */
export function NeuralSpark() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const degraded = useAppStore((s) => s.introDegraded);

  useFrame((state, delta) => {
    const entering = useAppStore.getState().phase === "entering";
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.07;
    }
    if (coreRef.current) {
      const idle = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.18;
      // On enter, blow the HDR core up so bloom detonates into the flash.
      const target = entering ? 9 : idle;
      const next = coreRef.current.scale.x + (target - coreRef.current.scale.x) * (entering ? 0.12 : 1);
      coreRef.current.scale.setScalar(next);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bright HDR core: the point of contact */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={CORE_COLOR} toneMapped={false} />
      </mesh>

      {/* Magenta plasma fringe */}
      <mesh position={[0.04, 0, 0.02]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial
          color={FRINGE_COLOR}
          toneMapped={false}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* Distorted neural shell */}
      {degraded ? (
        <Icosahedron args={[0.22, 2]}>
          <meshStandardMaterial
            color="#020e0c"
            emissive="#2A9D8F"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </Icosahedron>
      ) : (
        <Icosahedron args={[0.22, 6]}>
          <MeshDistortMaterial
            color="#020e0c"
            emissive="#2A9D8F"
            emissiveIntensity={2.2}
            speed={2.5}
            distort={0.32}
            roughness={0.2}
            metalness={0.8}
            toneMapped={false}
          />
        </Icosahedron>
      )}

      {/* Outer wireframe halo */}
      <Icosahedron args={[0.46, 1]}>
        <meshBasicMaterial color="#2A9D8F" wireframe transparent opacity={0.06} />
      </Icosahedron>

      <pointLight color="#00e5ff" intensity={10} distance={4} decay={2} />
      <pointLight
        color="#ff3fa4"
        intensity={4}
        distance={3}
        decay={2}
        position={[0.3, 0, 0.3]}
      />
    </group>
  );
}
