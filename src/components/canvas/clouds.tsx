"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/** Single cloud: cluster of overlapping spheres tinted by sunset */
function Cloud({
  position,
  scale = 1,
  speed = 0.3,
  tint = "#FFFFFF",
  cloudOpacity = 0.35,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  tint?: string;
  cloudOpacity?: number;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x =
        position[0] + Math.sin(clock.getElapsedTime() * speed * 0.05) * 3;
      ref.current.position.z =
        position[2] - clock.getElapsedTime() * speed * 0.2;

      if (ref.current.position.z < -300) {
        ref.current.position.z = 200;
      }
    }
  });

  const puffs = useMemo(
    () =>
      Array.from({ length: 6 + Math.floor(Math.random() * 5) }).map(() => ({
        x: (Math.random() - 0.5) * 10 * scale,
        y: (Math.random() - 0.5) * 2.5 * scale,
        z: (Math.random() - 0.5) * 5 * scale,
        s: (1 + Math.random() * 2) * scale,
      })),
    [scale]
  );

  return (
    <group ref={ref} position={position}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.s, 8, 6]} />
          <meshStandardMaterial
            color={tint}
            transparent
            opacity={cloudOpacity}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Clouds() {
  const cloudData = useMemo(() => {
    const layers: Array<{
      x: number;
      y: number;
      z: number;
      scale: number;
      speed: number;
      tint: string;
      opacity: number;
    }> = [];

    // Background layer — distant, slow, sunset-tinted
    for (let i = 0; i < 6; i++) {
      layers.push({
        x: (Math.random() - 0.5) * 300,
        y: 30 + Math.random() * 25,
        z: -150 - Math.random() * 150,
        scale: 1.5 + Math.random() * 2,
        speed: 0.05 + Math.random() * 0.15,
        tint: ["#FFD4A8", "#FFBF8A", "#FFC9A0"][Math.floor(Math.random() * 3)],
        opacity: 0.2 + Math.random() * 0.1,
      });
    }

    // Mid layer — medium distance
    for (let i = 0; i < 8; i++) {
      layers.push({
        x: (Math.random() - 0.5) * 200,
        y: 20 + Math.random() * 20,
        z: -50 - Math.random() * 150,
        scale: 1 + Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.3,
        tint: ["#FFFFFF", "#FFF0E0", "#FFE8D0"][Math.floor(Math.random() * 3)],
        opacity: 0.3 + Math.random() * 0.1,
      });
    }

    // Foreground wisps — closer, faster, more transparent
    for (let i = 0; i < 4; i++) {
      layers.push({
        x: (Math.random() - 0.5) * 100,
        y: 15 + Math.random() * 10,
        z: -20 - Math.random() * 60,
        scale: 0.6 + Math.random() * 0.8,
        speed: 0.2 + Math.random() * 0.5,
        tint: "#FFFFFF",
        opacity: 0.15 + Math.random() * 0.1,
      });
    }

    return layers;
  }, []);

  return (
    <group>
      {cloudData.map((c, i) => (
        <Cloud
          key={i}
          position={[c.x, c.y, c.z]}
          scale={c.scale}
          speed={c.speed}
          tint={c.tint}
          cloudOpacity={c.opacity}
        />
      ))}
    </group>
  );
}
