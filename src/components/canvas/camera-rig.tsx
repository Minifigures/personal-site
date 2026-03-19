"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import { useAppStore } from "@/stores/use-app-store";

/**
 * Camera keyframes for each scroll section.
 * Each entry: [cameraPosition, lookAtTarget]
 */
const KEYFRAMES: Array<{
  position: [number, number, number];
  lookAt: [number, number, number];
}> = [
  // 0-15%: Hero, straight-on, slightly elevated, full island panorama
  { position: [0, 4, 12], lookAt: [0, 2, -50] },
  // 15-30%: About, pan left + drop to eye level, intimate with island
  { position: [-5, 1.8, 6], lookAt: [-3, 1.5, -20] },
  // 30-50%: Experience, pull way back, wide cinematic shot over vast ocean
  { position: [-10, 7, -4], lookAt: [0, 1, -50] },
  // 50-65%: Projects, sweep right, close to water surface, low-angle dramatic
  { position: [8, 1.2, -2], lookAt: [5, 1, -30] },
  // 65-80%: Contact, rise up high, bird's-eye looking down at island
  { position: [2, 12, -3], lookAt: [0, 0, -15] },
  // 80-100%: Footer, settle at horizon level, peaceful view facing sunset
  { position: [0, 3, -6], lookAt: [0, 2, -100] },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function CameraRig() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);
  const targetPos = useRef(new Vector3(...KEYFRAMES[0].position));
  const targetLookAt = useRef(new Vector3(...KEYFRAMES[0].lookAt));
  const currentPos = useRef(new Vector3(...KEYFRAMES[0].position));
  const currentLookAt = useRef(new Vector3(...KEYFRAMES[0].lookAt));
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollRef.current = progress;
      setScrollProgress(progress);
    }

    function handleMouse(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useFrame((_state, delta) => {
    const scroll = scrollRef.current;
    const totalSections = KEYFRAMES.length - 1;
    const rawIndex = scroll * totalSections;
    const index = Math.min(Math.floor(rawIndex), totalSections - 1);
    const sectionProgress = smoothstep(rawIndex - index);

    const from = KEYFRAMES[index];
    const to = KEYFRAMES[Math.min(index + 1, KEYFRAMES.length - 1)];

    // Interpolate target position and lookAt based on scroll
    targetPos.current.set(
      lerp(from.position[0], to.position[0], sectionProgress),
      lerp(from.position[1], to.position[1], sectionProgress),
      lerp(from.position[2], to.position[2], sectionProgress)
    );

    targetLookAt.current.set(
      lerp(from.lookAt[0], to.lookAt[0], sectionProgress),
      lerp(from.lookAt[1], to.lookAt[1], sectionProgress),
      lerp(from.lookAt[2], to.lookAt[2], sectionProgress)
    );

    // Subtle mouse parallax offset
    const parallaxX = mouseRef.current.x * 0.3;
    const parallaxY = mouseRef.current.y * -0.15;
    targetPos.current.x += parallaxX;
    targetPos.current.y += parallaxY;

    // Smooth lerp towards target (frame-rate independent)
    const lerpFactor = 1 - Math.pow(0.05, delta);
    currentPos.current.lerp(targetPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);

    // Apply to camera
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
