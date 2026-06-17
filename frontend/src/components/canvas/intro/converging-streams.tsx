"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import type { Points } from "three";
import { useAppStore } from "@/stores/use-app-store";

interface StreamProps {
  color: string;
  /** -1 = left (AI), +1 = right (human) */
  side: number;
  count: number;
}

function randomOrigin(side: number): [number, number, number] {
  return [
    side * (1.5 + Math.random() * 3.5),
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 1,
  ];
}

/** One particle stream flowing inward toward the central spark. */
function Stream({ color, side, count }: StreamProps) {
  const pointsRef = useRef<Points>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const t = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const [ox, oy, oz] = randomOrigin(side);
      origins[i * 3] = positions[i * 3] = ox;
      origins[i * 3 + 1] = positions[i * 3 + 1] = oy;
      origins[i * 3 + 2] = positions[i * 3 + 2] = oz;
      speed[i] = 0.18 + Math.random() * 0.12;
      t[i] = Math.random();
    }
    return { positions, origins, speed, t };
  }, [count, side]);

  useFrame((_state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const boost = useAppStore.getState().phase === "entering" ? 2.6 : 1;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const { origins, speed, t } = data;
    for (let i = 0; i < count; i++) {
      t[i] += delta * speed[i] * boost;
      if (t[i] >= 1) {
        t[i] = 0;
        const [ox, oy, oz] = randomOrigin(side);
        origins[i * 3] = ox;
        origins[i * 3 + 1] = oy;
        origins[i * 3 + 2] = oz;
      }
      const k = 1 - t[i] * t[i];
      arr[i * 3] = origins[i * 3] * k;
      arr[i * 3 + 1] = origins[i * 3 + 1] * k;
      arr[i * 3 + 2] = origins[i * 3 + 2] * k;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Left teal (AI) and right coral (human) streams meeting at the spark. */
export function ConvergingStreams() {
  const degraded = useAppStore((s) => s.introDegraded);
  const count = degraded ? 600 : 1200;
  return (
    <>
      <Stream key={`ai-${count}`} color="#2A9D8F" side={-1} count={count} />
      <Stream key={`human-${count}`} color="#E8735A" side={1} count={count} />
    </>
  );
}
