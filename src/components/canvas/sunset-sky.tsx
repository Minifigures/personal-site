"use client";

import { Sky } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import { FogExp2, Mesh, AdditiveBlending, Color } from "three";

const SUN_POSITION: [number, number, number] = [20, 3, -200];

/** Glowing sun disc visible near the horizon */
function SunGlow() {
  const meshRef = useRef<Mesh>(null);
  const sunDir = useMemo(() => {
    const d = new Color("#FF8C42");
    return d;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle pulsing glow
      const t = clock.getElapsedTime();
      const pulse = 1 + Math.sin(t * 0.5) * 0.08;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={SUN_POSITION}>
      {/* Core sun disc */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial
          color={sunDir}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner glow halo */}
      <mesh>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial
          color="#FFAA55"
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[40, 24, 24]} />
        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.08}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Warm point light from the sun */}
      <pointLight color="#FFAA55" intensity={8} distance={500} decay={2} />
    </group>
  );
}

/** Horizontal light rays emanating from the sun */
function SunRays() {
  const groupRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  const rays = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      rotation: (i / 8) * Math.PI * 2 + Math.random() * 0.3,
      width: 0.3 + Math.random() * 0.5,
      length: 60 + Math.random() * 80,
      opacity: 0.02 + Math.random() * 0.03,
    }));
  }, []);

  return (
    <group position={SUN_POSITION} ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh key={i} rotation={[0, 0, ray.rotation]}>
          <planeGeometry args={[ray.length, ray.width]} />
          <meshBasicMaterial
            color="#FFB366"
            transparent
            opacity={ray.opacity}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SunsetSky() {
  const { gl, scene } = useThree();

  useEffect(() => {
    gl.toneMappingExposure = 0.5;
    // Add exponential fog for atmospheric depth
    scene.fog = new FogExp2("#2A1A3E", 0.003);
    return () => {
      scene.fog = null;
    };
  }, [gl, scene]);

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={SUN_POSITION}
        turbidity={10}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      <SunGlow />
      <SunRays />

      {/* Main directional light from the sun */}
      <directionalLight
        position={SUN_POSITION}
        intensity={2.5}
        color="#FFB366"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Hemisphere light for realistic sky/ground lighting */}
      <hemisphereLight
        args={["#FFB366", "#1A3A5C", 0.4]}
      />

      {/* Warm ambient fill */}
      <ambientLight intensity={0.25} color="#FFDAB9" />
    </>
  );
}

export { SUN_POSITION };
