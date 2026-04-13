"use client";

import { Sky, Stars } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import { FogExp2, Mesh, AdditiveBlending, Color, Group } from "three";
import { useAppStore } from "@/stores/use-app-store";

/** Base sun position (direction), animated based on scroll */
const BASE_SUN_POSITION: [number, number, number] = [20, 3, -200];

function lerpValue(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Glowing sun disc visible near the horizon, fades as sun sets */
function SunGlow() {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const scroll = useAppStore.getState().scrollProgress;
    if (meshRef.current && groupRef.current) {
      const t = clock.getElapsedTime();
      const pulse = 1 + Math.sin(t * 0.5) * 0.08;
      meshRef.current.scale.setScalar(pulse);

      // Sun moves down slowly, fades only at very end
      const sunY = scroll < 0.5
        ? lerpValue(3, 1, scroll / 0.5)
        : lerpValue(1, -15, (scroll - 0.5) / 0.5);
      groupRef.current.position.set(20, sunY, -200);

      // Fade opacity only during late twilight
      const opacity = scroll < 0.75 ? 0.9 : lerpValue(0.9, 0.2, (scroll - 0.75) / 0.25);
      const mat = meshRef.current.material as InstanceType<typeof import("three").MeshBasicMaterial>;
      mat.opacity = Math.max(0, opacity);
    }
  });

  return (
    <group ref={groupRef} position={BASE_SUN_POSITION}>
      {/* Core sun disc */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C42"
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
  const groupRef = useRef<Group>(null);

  const rays = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      rotation: (i / 8) * Math.PI * 2 + Math.random() * 0.3,
      width: 0.3 + Math.random() * 0.5,
      length: 60 + Math.random() * 80,
      opacity: 0.02 + Math.random() * 0.03,
    }));
  }, []);

  useFrame(({ clock }) => {
    const scroll = useAppStore.getState().scrollProgress;
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;

      // Sun rays move with sun, fade only at end
      const sunY = scroll < 0.5
        ? lerpValue(3, 1, scroll / 0.5)
        : lerpValue(1, -15, (scroll - 0.5) / 0.5);
      groupRef.current.position.set(20, sunY, -200);

      // Fade out rays only during late twilight
      const scale = scroll < 0.75 ? 1 : lerpValue(1, 0, (scroll - 0.75) / 0.25);
      groupRef.current.scale.setScalar(Math.max(0, scale));
    }
  });

  return (
    <group ref={groupRef} position={BASE_SUN_POSITION}>
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

/** Stars that fade in during twilight/night phase */
function NightStars() {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    const scroll = useAppStore.getState().scrollProgress;
    if (groupRef.current) {
      // Stars only start appearing at 80% scroll, fully visible at 95%
      const opacity = scroll < 0.8 ? 0 : Math.min(1, (scroll - 0.8) / 0.15);
      groupRef.current.visible = opacity > 0.01;
      // Scale as proxy for fade (Stars doesn't support opacity directly)
      groupRef.current.scale.setScalar(opacity);
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={200}
        depth={60}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

export function SunsetSky() {
  const { gl, scene } = useThree();
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  useEffect(() => {
    gl.toneMappingExposure = 0.5;
    scene.fog = new FogExp2("#2A1A3E", 0.0015);
    return () => {
      scene.fog = null;
    };
  }, [gl, scene]);

  // Animate fog color based on scroll (sunset lasts longer)
  useEffect(() => {
    if (scene.fog instanceof FogExp2) {
      const fogColor = new Color();
      if (scrollProgress < 0.5) {
        // Golden hour: warm purple fog (0-50%)
        fogColor.set("#2A1A3E");
      } else if (scrollProgress < 0.8) {
        // Sunset: deeper purple (50-80%)
        const t = (scrollProgress - 0.5) / 0.3;
        fogColor.lerpColors(new Color("#2A1A3E"), new Color("#1A0F2E"), t);
      } else {
        // Late twilight: slightly darker (80-100%)
        const t = (scrollProgress - 0.8) / 0.2;
        fogColor.lerpColors(new Color("#1A0F2E"), new Color("#120A22"), t);
      }
      scene.fog.color.copy(fogColor);
    }
  }, [scene, scrollProgress]);

  // Compute sun position based on scroll
  // 0-50%: golden hour (sun high), 50-80%: sunset (sun touches horizon), 80-100%: twilight
  const sunY = scrollProgress < 0.5
    ? lerpValue(3, 1, scrollProgress / 0.5)
    : lerpValue(1, -15, (scrollProgress - 0.5) / 0.5);
  const sunPosition: [number, number, number] = [20, sunY, -200];

  // Sky parameters animated by scroll (sunset lasts much longer)
  const turbidity = lerpValue(10, 16, scrollProgress);
  const rayleigh = scrollProgress < 0.8
    ? lerpValue(2, 4, scrollProgress / 0.8)
    : lerpValue(4, 1.5, (scrollProgress - 0.8) / 0.2);

  // Directional light intensity: stays bright through 80%, gentle dim at end
  const dirLightIntensity = scrollProgress < 0.8
    ? 2.5
    : lerpValue(2.5, 1.0, (scrollProgress - 0.8) / 0.2);
  const ambientIntensity = scrollProgress < 0.8
    ? 0.25
    : lerpValue(0.25, 0.12, (scrollProgress - 0.8) / 0.2);

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={sunPosition}
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      <SunGlow />
      <SunRays />
      <NightStars />

      {/* Main directional light from the sun */}
      <directionalLight
        position={sunPosition}
        intensity={dirLightIntensity}
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

      {/* Warm ambient fill, dims at night */}
      <ambientLight intensity={ambientIntensity} color="#FFDAB9" />
    </>
  );
}

export { BASE_SUN_POSITION as SUN_POSITION };
