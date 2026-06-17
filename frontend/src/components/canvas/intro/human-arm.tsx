"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const SKIN = "#e7b289";

/**
 * Procedural human arm + hand (forearm, wrist, palm, fingers with one extended
 * index) reaching in from off the right edge toward the central spark.
 * Built from primitives so it reads unambiguously as a single arm.
 */
export function HumanArm() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -0.25 + Math.cos(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });

  return (
    <group ref={ref} position={[0.4, -0.25, 0.3]} rotation={[0, 0, 0.1]}>
      {/* Forearm: from off the right edge to the wrist */}
      <mesh position={[3.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.26, 0.36, 4.4, 24]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Wrist */}
      <mesh position={[1.2, 0, 0]} castShadow>
        <sphereGeometry args={[0.27, 20, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {/* Palm (flattened sphere) */}
      <mesh position={[0.8, 0, 0]} scale={[1, 0.95, 0.55]} castShadow>
        <sphereGeometry args={[0.33, 20, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {/* Index finger extended toward the spark (along -X) */}
      <mesh position={[0.22, 0.06, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.058, 0.072, 0.72, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      <mesh position={[-0.15, 0.06, 0.12]} castShadow>
        <sphereGeometry args={[0.058, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {/* Curled fingers */}
      {[-0.09, 0, 0.09].map((zoff, i) => (
        <mesh
          key={i}
          position={[0.5, -0.2, zoff]}
          rotation={[0, 0, 0.55]}
          castShadow
        >
          <cylinderGeometry args={[0.05, 0.056, 0.28, 10]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
      ))}
      {/* Thumb */}
      <mesh position={[0.62, 0.16, -0.18]} rotation={[0, 0, 0.95]} castShadow>
        <cylinderGeometry args={[0.05, 0.062, 0.34, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
    </group>
  );
}
