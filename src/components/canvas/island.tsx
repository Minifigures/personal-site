"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

/** Single palm tree: cylinder trunk + layered cone fronds */
function PalmTree({
  position,
  scale = 1,
  lean = 0,
}: {
  position: [number, number, number];
  scale?: number;
  lean?: number;
}) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle sway in the wind
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z =
        lean + Math.sin(t * 0.8 + position[0]) * 0.03;
      groupRef.current.rotation.x =
        Math.sin(t * 0.6 + position[2]) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, 3, 8]} />
        <meshStandardMaterial color="#8B6914" roughness={0.9} />
      </mesh>

      {/* Frond layers */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <group
          key={i}
          position={[0, 3, 0]}
          rotation={[
            -0.4 - Math.random() * 0.3,
            (angle * Math.PI) / 180,
            0,
          ]}
        >
          <mesh position={[0, 0, -0.8]} castShadow>
            <coneGeometry args={[0.15, 1.8, 4]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#2D5A1E" : "#3A7D28"}
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Coconuts */}
      <mesh position={[0.12, 2.8, 0.1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.7} />
      </mesh>
      <mesh position={[-0.1, 2.85, -0.08]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Rock props scattered on the island */
function Rock({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#7A7A6E"
        roughness={1}
        metalness={0.1}
      />
    </mesh>
  );
}

export function Island() {
  const islandRef = useRef<Mesh>(null);

  // Island terrain: flattened sphere to look like a sandy mound
  const islandPosition: [number, number, number] = [18, -0.8, -22];

  return (
    <group position={islandPosition}>
      {/* Main island body */}
      <mesh
        ref={islandRef}
        position={[0, 0, 0]}
        scale={[5, 1.2, 4]}
        receiveShadow
      >
        <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#D4A960"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Wet sand ring around base */}
      <mesh
        position={[0, -0.05, 0]}
        scale={[5.8, 0.3, 4.6]}
        receiveShadow
      >
        <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#B8944A"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Palm trees */}
      <PalmTree position={[0.5, 1.1, 0]} scale={1.2} lean={0.05} />
      <PalmTree position={[-1.5, 1.0, 0.8]} scale={0.9} lean={-0.1} />
      <PalmTree position={[1.8, 0.9, -0.5]} scale={1.0} lean={0.15} />
      <PalmTree position={[-0.3, 1.05, -1.2]} scale={0.75} lean={-0.05} />

      {/* Scattered rocks */}
      <Rock position={[3.2, 0.2, 1.5]} scale={0.8} />
      <Rock position={[-3.5, 0.15, -0.8]} scale={1.2} />
      <Rock position={[2.5, 0.1, -2.0]} scale={0.6} />

      {/* Beach grass tufts */}
      {useMemo(
        () =>
          Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 2 + Math.random() * 1.5;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * r,
                  0.5 + Math.random() * 0.3,
                  Math.sin(angle) * r,
                ]}
                rotation={[0, angle, 0]}
              >
                <coneGeometry args={[0.05, 0.4, 4]} />
                <meshStandardMaterial
                  color="#6B8E23"
                  roughness={0.9}
                />
              </mesh>
            );
          }),
        []
      )}
    </group>
  );
}
