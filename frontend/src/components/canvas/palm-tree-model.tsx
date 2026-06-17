"use client";

import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, Vector3, type Group } from "three";

/**
 * GLB palm tree model from /models/palm-trees.glb.
 * The file contains 5 separate tree nodes. This component clones one tree
 * by index, normalises its scale to a target height, and seats the trunk
 * base at Y = 0 so callers can simply place it at the sand-surface Y.
 */
export function PalmTreeModel({
  position,
  rotation = 0,
  lean = 0.12,
  targetHeight = 3.5,
  treeIndex = 0,
}: {
  position: [number, number, number];
  rotation?: number;
  lean?: number;
  targetHeight?: number;
  treeIndex?: number;
}) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/palm-trees.glb");

  // Pick one of the 5 child nodes from the GLB root, clone it,
  // and normalise the scale so the tree reaches targetHeight.
  const treeObject = useMemo(() => {
    const root = scene;
    const children = root.children;
    const src = children[treeIndex % children.length];
    const clone = src.clone(true);

    // Measure bounding box of the cloned sub-tree in its own local space.
    const box = new Box3().setFromObject(clone);
    const size = new Vector3();
    box.getSize(size);

    const currentHeight = size.y;
    const scaleFactor = currentHeight > 0 ? targetHeight / currentHeight : 1;

    clone.scale.multiplyScalar(scaleFactor);

    // Re-measure after scaling so we can translate the base to Y = 0.
    const boxScaled = new Box3().setFromObject(clone);
    const baseY = boxScaled.min.y;
    clone.position.set(0, -baseY, 0);

    return clone;
  }, [scene, treeIndex, targetHeight]);

  // Gentle sway animation matching the procedural tree feel.
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z =
        lean + Math.sin(t * 0.5 + position[0] * 2) * 0.04;
      groupRef.current.rotation.x = Math.sin(t * 0.3 + position[2]) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      <primitive object={treeObject} castShadow />
    </group>
  );
}

useGLTF.preload("/models/palm-trees.glb");
