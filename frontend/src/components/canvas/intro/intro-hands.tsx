"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import type { Group, Object3D } from "three";

useGLTF.preload("/models/robot-arm.glb");
useGLTF.preload("/models/right-hand.glb");

/** Clone a loaded scene, recenter its geometry to the origin, and scale it so
 *  its largest dimension equals `target` (poly.pizza models have arbitrary
 *  native pivots/units). */
function useNormalized(scene: Object3D, target: number) {
  return useMemo(() => {
    const obj = scene.clone(true);
    const box = new Box3().setFromObject(obj);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const scale = target / Math.max(size.x, size.y, size.z || 1);
    obj.position.set(-center.x, -center.y, -center.z);
    return { obj, scale };
  }, [scene, target]);
}

/**
 * The human + AI hands reaching toward the central spark (Creation of Adam):
 * robot arm from the left, human pointing hand from the right.
 * Models: poly.pizza, CC-BY 3.0 (see public/models/CREDITS.md).
 */
export function IntroHands() {
  const robotRef = useRef<Group>(null);
  const humanRef = useRef<Group>(null);
  const robot = useGLTF("/models/robot-arm.glb");
  const human = useGLTF("/models/right-hand.glb");

  const robotN = useNormalized(robot.scene, 3.1);
  const humanN = useNormalized(human.scene, 2.8);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (robotRef.current) robotRef.current.position.y = -0.35 + Math.sin(t * 0.6) * 0.04;
    if (humanRef.current) humanRef.current.position.y = -0.35 + Math.cos(t * 0.5) * 0.04;
  });

  return (
    <group>
      <ambientLight intensity={0.45} />
      <pointLight position={[-3, 1.5, 3]} color="#00e5ff" intensity={7} distance={14} />
      <pointLight position={[3, 1.5, 3]} color="#ff9a7a" intensity={7} distance={14} />

      {/* Robot arm reaching in from the left */}
      <group ref={robotRef} position={[-1.7, -0.35, 0.5]} rotation={[0, 0, 0]} scale={robotN.scale}>
        <primitive object={robotN.obj} />
      </group>

      {/* Human hand reaching in from the right, fingers toward the spark */}
      <group ref={humanRef} position={[1.55, -0.1, 0.4]} rotation={[0, Math.PI, Math.PI / 2]} scale={humanN.scale}>
        <primitive object={humanN.obj} />
      </group>
    </group>
  );
}
