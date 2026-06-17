"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const METAL = "#a9b2bd";
const DARK = "#454c56";
const GLOW = "#00e5ff";

/**
 * Procedural mechanical robot arm reaching in from off the left edge, angled,
 * with an extended index finger pointing at the central spark (Creation of Adam).
 * Built from primitives so the pose is fully controlled.
 */
export function RobotArm() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -0.35 + Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <group ref={ref} position={[-1.1, -0.35, 0.3]} rotation={[0, 0, -0.1]}>
      {/* Forearm extending off the left edge */}
      <mesh position={[-2.7, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.32, 0.46, 5.2, 16]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Mechanical joint rings */}
      {[-1.3, -2.4, -3.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.47, 0.47, 0.16, 16]} />
          <meshStandardMaterial color={DARK} metalness={0.92} roughness={0.25} />
        </mesh>
      ))}
      {/* Wrist joint + glowing core */}
      <mesh position={[-0.35, 0, 0]} castShadow>
        <sphereGeometry args={[0.34, 18, 18]} />
        <meshStandardMaterial color={DARK} metalness={0.92} roughness={0.25} />
      </mesh>
      <mesh position={[-0.35, 0, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      {/* Palm */}
      <mesh position={[0.02, 0.02, 0]} scale={[1, 0.9, 0.55]} castShadow>
        <boxGeometry args={[0.5, 0.46, 0.42]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Extended index finger pointing toward the spark (+X), two segments + tip */}
      <mesh position={[0.45, 0.08, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.075, 0.42, 10]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0.82, 0.08, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.06, 0.34, 10]} />
        <meshStandardMaterial color={METAL} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[1.02, 0.08, 0.08]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial color="#d4dbe2" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Curled fingers */}
      {[-0.1, 0, 0.1].map((z, i) => (
        <mesh key={i} position={[0.28, -0.2, z]} rotation={[0, 0, 0.6]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.085]} />
          <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {/* Thumb */}
      <mesh position={[0.12, 0.2, -0.16]} rotation={[0, 0, -0.7]} castShadow>
        <boxGeometry args={[0.22, 0.09, 0.08]} />
        <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}
