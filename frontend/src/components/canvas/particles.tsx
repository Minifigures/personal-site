"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { AdditiveBlending } from "three";
import type { Points as PointsType, BufferAttribute } from "three";

function generateParticles(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)) + 0.5;
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

/** Warm ambient dust/sparkle particles */
function DustParticles() {
  const ref = useRef<PointsType>(null);
  const positions = useMemo(() => generateParticles(350, 25), []);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y += delta * 0.015;

    // Wind drift — move particles gently
    const posAttr = ref.current.geometry.attributes.position as BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t * 0.3 + i) * 0.001; // x drift
      arr[i + 1] += Math.sin(t * 0.5 + i * 0.7) * 0.0005; // y bob
    }
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFD4A8"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/** Golden sparkle particles that catch the sunlight */
function SparkleParticles() {
  const ref = useRef<PointsType>(null);
  const positions = useMemo(() => generateParticles(120, 30), []);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.008;
    ref.current.rotation.x += delta * 0.005;

    // Twinkle effect by modifying opacity via scale
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2) * 0.3;
    ref.current.scale.setScalar(scale);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFE4B5"
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
        blending={AdditiveBlending}
      />
    </Points>
  );
}

/** Low-altitude sea spray particles near the water */
function SeaSpray() {
  const ref = useRef<PointsType>(null);
  const positions = useMemo(() => {
    const count = 80;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position as BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] = Math.abs(Math.sin(t * 0.8 + i * 0.5)) * 1.5;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  );
}

export function Particles() {
  return (
    <>
      <DustParticles />
      <SparkleParticles />
      <SeaSpray />
    </>
  );
}
