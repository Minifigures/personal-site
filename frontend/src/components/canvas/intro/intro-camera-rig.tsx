"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import gsap from "gsap";
import { useAppStore } from "@/stores/use-app-store";

/** Idle drift + mouse parallax, with a one-shot GSAP dolly on enter. */
export function IntroCameraRig() {
  const { camera } = useThree();
  const target = useRef(new Vector3(0, 0, 5));
  const started = useRef(false);

  useFrame((state) => {
    const phase = useAppStore.getState().phase;

    if (phase === "entering") {
      if (!started.current) {
        started.current = true;
        gsap.to(camera.position, {
          x: 0,
          y: 0,
          z: 1.0,
          duration: 0.95,
          ease: "power3.in",
          onUpdate: () => camera.lookAt(0, 0, 0),
        });
      }
      camera.lookAt(0, 0, 0);
      return;
    }

    const t = state.clock.elapsedTime;
    target.current.set(
      Math.sin(t * 0.12) * 0.35 + state.pointer.x * 0.45,
      Math.cos(t * 0.08) * 0.18 + state.pointer.y * 0.22,
      5,
    );
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
