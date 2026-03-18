"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/** Single seagull: V-shaped wings that flap */
function Seagull({
  position,
  speed = 1,
  radius = 30,
  offset = 0,
}: {
  position: [number, number, number];
  speed?: number;
  radius?: number;
  offset?: number;
}) {
  const ref = useRef<Group>(null);
  const leftWingRef = useRef<Group>(null);
  const rightWingRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;

    // Circular flying path
    ref.current.position.x = position[0] + Math.cos(t * 0.3) * radius;
    ref.current.position.z = position[2] + Math.sin(t * 0.3) * radius;
    ref.current.position.y =
      position[1] + Math.sin(t * 0.5) * 2;

    // Face direction of movement
    ref.current.rotation.y = -t * 0.3 + Math.PI / 2;

    // Wing flapping
    const flapAngle = Math.sin(t * 4) * 0.4;
    if (leftWingRef.current) leftWingRef.current.rotation.z = flapAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flapAngle;
  });

  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.06, 0.05, 0.25]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.6} />
      </mesh>

      {/* Left wing */}
      <group ref={leftWingRef} position={[0.15, 0, 0]}>
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.25, 0.01, 0.15]} />
          <meshStandardMaterial color="#E8E8E8" roughness={0.5} />
        </mesh>
        {/* Wing tip */}
        <mesh position={[0.28, 0, -0.02]}>
          <boxGeometry args={[0.08, 0.01, 0.08]} />
          <meshStandardMaterial color="#CCCCCC" roughness={0.5} />
        </mesh>
      </group>

      {/* Right wing */}
      <group ref={rightWingRef} position={[-0.15, 0, 0]}>
        <mesh position={[-0.12, 0, 0]}>
          <boxGeometry args={[0.25, 0.01, 0.15]} />
          <meshStandardMaterial color="#E8E8E8" roughness={0.5} />
        </mesh>
        <mesh position={[-0.28, 0, -0.02]}>
          <boxGeometry args={[0.08, 0.01, 0.08]} />
          <meshStandardMaterial color="#CCCCCC" roughness={0.5} />
        </mesh>
      </group>

      {/* Tail */}
      <mesh position={[0, 0.01, -0.14]}>
        <boxGeometry args={[0.06, 0.01, 0.06]} />
        <meshStandardMaterial color="#DDDDDD" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function Seagulls() {
  const gulls = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        x: (Math.random() - 0.5) * 40,
        y: 8 + Math.random() * 12,
        z: -10 - Math.random() * 30,
        speed: 0.6 + Math.random() * 0.8,
        radius: 15 + Math.random() * 25,
        offset: Math.random() * Math.PI * 2,
      })),
    []
  );

  return (
    <group>
      {gulls.map((g, i) => (
        <Seagull
          key={i}
          position={[g.x, g.y, g.z]}
          speed={g.speed}
          radius={g.radius}
          offset={g.offset}
        />
      ))}
    </group>
  );
}
