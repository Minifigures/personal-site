"use client";

import { RobotArm } from "./robot-arm";
import { HumanArm } from "./human-arm";

/**
 * The human + AI arms reaching toward the central spark (Creation of Adam).
 * Both arms are procedural geometry, so the pose is fully controlled and there
 * is no GLB load gate (which previously blanked the scene intermittently).
 */
export function IntroHands() {
  return (
    <group>
      <ambientLight intensity={0.45} />
      <pointLight position={[-3, 1.5, 3]} color="#00e5ff" intensity={7} distance={14} />
      <pointLight position={[3, 1.5, 3]} color="#ff9a7a" intensity={7} distance={14} />
      <RobotArm />
      <HumanArm />
    </group>
  );
}
