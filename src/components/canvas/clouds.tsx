"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/** Single cloud: cluster of soft overlapping spheres */
function CloudCluster({
  position,
  scale = 1,
  speed = 0.3,
  tint = "#FFFFFF",
  cloudOpacity = 0.2,
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
        position[2] - clock.getElapsedTime() * speed * 0.1;

      if (ref.current.position.z < -350) {
        ref.current.position.z = 200;
      }
    }
  });

  const puffs = useMemo(
    () =>
      Array.from({ length: 5 + Math.floor(Math.random() * 4) }).map(() => ({
        x: (Math.random() - 0.5) * 14 * scale,
        y: (Math.random() - 0.5) * 2 * scale,
        z: (Math.random() - 0.5) * 6 * scale,
        s: (1 + Math.random() * 2) * scale,
      })),
    [scale]
  );

  return (
    <group ref={ref} position={position}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.s, 10, 7]} />
          <meshBasicMaterial
            color={tint}
            transparent
            opacity={cloudOpacity}
            depthWrite={false}
            fog={false}
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

    // Left side clouds: high, spread out
    for (let i = 0; i < 3; i++) {
      layers.push({
        x: -80 - Math.random() * 120,
        y: 40 + Math.random() * 30,
        z: -80 - Math.random() * 200,
        scale: 1.5 + Math.random() * 2,
        speed: 0.05 + Math.random() * 0.1,
        tint: ["#FFD4A8", "#FFBF8A", "#FFC9A0"][Math.floor(Math.random() * 3)],
        opacity: 0.12 + Math.random() * 0.08,
      });
    }

    // Right side clouds: high, spread out
    for (let i = 0; i < 3; i++) {
      layers.push({
        x: 80 + Math.random() * 120,
        y: 40 + Math.random() * 30,
        z: -80 - Math.random() * 200,
        scale: 1.5 + Math.random() * 2,
        speed: 0.05 + Math.random() * 0.1,
        tint: ["#FFD4A8", "#FFBF8A", "#FFC9A0"][Math.floor(Math.random() * 3)],
        opacity: 0.12 + Math.random() * 0.08,
      });
    }

    // A few high wispy clouds scattered (NOT in front of sunset center)
    for (let i = 0; i < 2; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      layers.push({
        x: side * (40 + Math.random() * 80),
        y: 50 + Math.random() * 20,
        z: -100 - Math.random() * 150,
        scale: 1 + Math.random() * 1.5,
        speed: 0.08 + Math.random() * 0.15,
        tint: "#FFFFFF",
        opacity: 0.08 + Math.random() * 0.06,
      });
    }

    return layers;
  }, []);

  return (
    <group>
      {cloudData.map((c, i) => (
        <CloudCluster
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
