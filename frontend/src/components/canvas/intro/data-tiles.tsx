"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import type { Points } from "three";

function field(count: number, spread: number, zMin: number, zMax: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * spread;
    arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62;
    arr[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
  }
  return arr;
}

interface LayerProps {
  count: number;
  size: number;
  color: string;
  opacity: number;
  spread: number;
  zMin: number;
  zMax: number;
  drift: number;
}

/** PointsMaterial renders square points: glowing data tiles with depth bokeh. */
function TileLayer({ count, size, color, opacity, spread, zMin, zMax, drift }: LayerProps) {
  const ref = useRef<Points>(null);
  const positions = useMemo(
    () => field(count, spread, zMin, zMax),
    [count, spread, zMin, zMax],
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * drift * 0.01;
    const m = ref.current.material as { opacity: number };
    m.opacity = opacity * (0.7 + 0.3 * Math.sin(state.clock.elapsedTime * 0.6 + zMin));
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Background field of glowing blue/cyan/purple square tiles (depth-of-field bokeh). */
export function DataTiles() {
  return (
    <group position={[0, 0, -3]}>
      <TileLayer count={150} size={0.07} color="#1e6fff" opacity={0.5} spread={18} zMin={-6} zMax={0} drift={1} />
      <TileLayer count={70} size={0.16} color="#00e5ff" opacity={0.32} spread={15} zMin={-5} zMax={-1} drift={-1.3} />
      <TileLayer count={28} size={0.24} color="#a855f7" opacity={0.3} spread={13} zMin={-5} zMax={-1.5} drift={0.8} />
    </group>
  );
}
