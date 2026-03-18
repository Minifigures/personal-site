"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/** Single cloud: cluster of overlapping translucent spheres */
function Cloud({
  position,
  scale = 1,
  speed = 0.3,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Slow drift across the sky
      ref.current.position.x =
        position[0] + Math.sin(clock.getElapsedTime() * speed * 0.05) * 2;
      ref.current.position.z =
        position[2] - clock.getElapsedTime() * speed * 0.2;

      // Wrap around when too far
      if (ref.current.position.z < -300) {
        ref.current.position.z = 200;
      }
    }
  });

  // Random cluster of spheres to form a cloud shape
  const puffs = useMemo(
    () =>
      Array.from({ length: 5 + Math.floor(Math.random() * 4) }).map(() => ({
        x: (Math.random() - 0.5) * 8 * scale,
        y: (Math.random() - 0.5) * 2 * scale,
        z: (Math.random() - 0.5) * 4 * scale,
        s: (0.8 + Math.random() * 1.5) * scale,
      })),
    [scale]
  );

  return (
    <group ref={ref} position={position}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.s, 8, 6]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.35}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Clouds() {
  const cloudData = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        x: (Math.random() - 0.5) * 200,
        y: 25 + Math.random() * 30,
        z: -50 - Math.random() * 200,
        scale: 0.8 + Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <group>
      {cloudData.map((c, i) => (
        <Cloud
          key={i}
          position={[c.x, c.y, c.z]}
          scale={c.scale}
          speed={c.speed}
        />
      ))}
    </group>
  );
}
