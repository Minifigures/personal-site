"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group, Mesh } from "three";

/**
 * GLB Palm Tree: extracts a single tree from the "Palm Trees" pack.
 * The GLB contains 5 trees (PalmTree_1..5) at scale=100 and
 * positions spread 100+ units apart. We grab one, reset its
 * position to origin, and scale it down to scene-appropriate size.
 */
function PalmTreeModel({
  position,
  scale = 0.015,
  rotation = 0,
  treeIndex = 0,
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: number;
  treeIndex?: number;
}) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/palm-trees.glb");

  // Extract a single tree by child index (children 0..4 map to 5 trees)
  const treeClone = useMemo(() => {
    const rootNode = scene.children[0]; // RootNode
    if (!rootNode || !rootNode.children[treeIndex]) {
      return scene.clone(true);
    }
    const singleTree = rootNode.children[treeIndex].clone(true);
    // Reset position (original has huge X offsets like 102-121)
    singleTree.position.set(0, 0, 0);
    return singleTree;
  }, [scene, treeIndex]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z =
        Math.sin(t * 0.6 + position[0] * 2) * 0.02;
      groupRef.current.rotation.x =
        Math.sin(t * 0.4 + position[2]) * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      <primitive object={treeClone} castShadow receiveShadow />
    </group>
  );
}

/* ─── Bench Press ─── */
function BenchPress({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Bench pad */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 1.4]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
      {/* Legs */}
      {[[-0.18, -0.5], [0.18, -0.5], [-0.18, 0.5], [0.18, 0.5]].map((p, i) => (
        <mesh key={i} position={[p[0], 0.15, p[1]]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Rack uprights */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.7, -0.55]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Barbell */}
      <mesh position={[0, 1.0, -0.55]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 1.2, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>
      {/* Plates */}
      {[-0.5, -0.56, 0.5, 0.56].map((x, i) => (
        <mesh key={i} position={[x, 1.0, -0.55]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.1 - (i % 2) * 0.015, 0.1 - (i % 2) * 0.015, 0.035, 16]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Dumbbell on the side */}
      <group position={[0.7, 0.1, 0.3]} rotation={[0, 0.8, 0]}>
        <mesh><cylinderGeometry args={[0.015, 0.015, 0.3, 6]} />
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} /></mesh>
        {[-0.14, 0.14].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.025, 8]} />
            <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} /></mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Speed Boat ─── */
function SpeedBoat({ position }: { position: [number, number, number] }) {
  const boatRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (boatRef.current) {
      const t = clock.getElapsedTime();
      boatRef.current.position.y = position[1] + Math.sin(t * 1.0) * 0.12;
      boatRef.current.rotation.z = Math.sin(t * 0.7) * 0.025;
      boatRef.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.02;
    }
  });

  return (
    <group ref={boatRef} position={position} rotation={[0, -0.5, 0]}>
      {/* Hull */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.3, 3.0]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Hull bottom */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.85, 0.1, 2.8]} />
        <meshStandardMaterial color="#1A2A4A" roughness={0.4} />
      </mesh>
      {/* Bow */}
      <mesh position={[0, 0.02, 1.5]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.75, 0.2, 0.7]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.35, 0.4]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.8, 0.35, 0.05]} />
        <meshStandardMaterial color="#88CCEE" transparent opacity={0.5} metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Dashboard */}
      <mesh position={[0, 0.22, 0.25]}>
        <boxGeometry args={[0.75, 0.08, 0.35]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} />
      </mesh>
      {/* Steering wheel */}
      <mesh position={[0.18, 0.35, 0.2]} rotation={[-0.5, 0, 0]}>
        <torusGeometry args={[0.07, 0.01, 8, 16]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Seats */}
      {[-0.22, 0.22].map((x, i) => (
        <group key={i} position={[x, 0.22, -0.25]}>
          <mesh><boxGeometry args={[0.28, 0.08, 0.3]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.4} /></mesh>
          <mesh position={[0, 0.15, -0.12]}>
            <boxGeometry args={[0.25, 0.25, 0.07]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.4} /></mesh>
        </group>
      ))}
      {/* Outboard motor */}
      <group position={[0, -0.05, -1.55]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.4, 0.22]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.14]} />
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      {/* Racing stripes */}
      {[0.51, -0.51].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.012, 0.1, 2.5]} />
          <meshStandardMaterial color="#E8735A" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Rock ─── */
function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.35, 1]} />
      <meshStandardMaterial color="#6A6A5E" roughness={1} metalness={0.1} />
    </mesh>
  );
}

/* ─── Main Island ─── */
export function Island() {
  const islandRef = useRef<Mesh>(null);
  // Moved island more center-left so it's clearly visible from start
  const islandPosition: [number, number, number] = [12, -0.5, -18];

  const grassTufts = useMemo(
    () => Array.from({ length: 15 }).map((_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      const r = 2 + Math.random() * 2.5;
      return { x: Math.cos(angle) * r, z: Math.sin(angle) * r, y: 0.5 + Math.random() * 0.3, rot: angle };
    }),
    []
  );

  return (
    <group position={islandPosition}>
      {/* Main island terrain */}
      <mesh ref={islandRef} scale={[7, 1.8, 6]} receiveShadow>
        <sphereGeometry args={[1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4B06A" roughness={1} metalness={0} />
      </mesh>
      {/* Wet sand ring */}
      <mesh position={[0, -0.1, 0]} scale={[7.8, 0.5, 6.6]} receiveShadow>
        <sphereGeometry args={[1, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B8944A" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Foam rim */}
      <mesh position={[0, -0.2, 0]} scale={[8.5, 0.2, 7.2]}>
        <sphereGeometry args={[1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3A9B8F" transparent opacity={0.25} roughness={0.2} />
      </mesh>

      {/* GLB Palm trees - each uses a different tree variant (index 0-4) */}
      <PalmTreeModel position={[0, 1.6, 0]} scale={0.018} rotation={0} treeIndex={0} />
      <PalmTreeModel position={[-2.5, 1.45, 1.2]} scale={0.014} rotation={1.2} treeIndex={1} />
      <PalmTreeModel position={[2.8, 1.4, -1.0]} scale={0.016} rotation={2.5} treeIndex={2} />
      <PalmTreeModel position={[-1.0, 1.5, -1.8]} scale={0.012} rotation={4.0} treeIndex={3} />
      <PalmTreeModel position={[1.5, 1.5, 2.0]} scale={0.013} rotation={5.5} treeIndex={4} />

      {/* Bench press */}
      <BenchPress position={[-1.2, 1.55, -0.5]} />

      {/* Rocks */}
      <Rock position={[4.5, 0.3, 2.2]} scale={1.1} />
      <Rock position={[-4.8, 0.25, -1.2]} scale={1.5} />
      <Rock position={[3.5, 0.2, -2.8]} scale={0.8} />
      <Rock position={[-3.0, 0.35, 2.8]} scale={0.6} />

      {/* Grass */}
      {grassTufts.map((t, i) => (
        <mesh key={i} position={[t.x, t.y, t.z]} rotation={[0, t.rot, 0]}>
          <coneGeometry args={[0.05, 0.4, 4]} />
          <meshStandardMaterial color="#5A7E23" roughness={0.9} />
        </mesh>
      ))}

      {/* Beach towel */}
      <mesh position={[-0.5, 1.5, 0.5]} rotation={[-0.1, 0.5, 0]} receiveShadow>
        <boxGeometry args={[0.6, 0.01, 0.35]} />
        <meshStandardMaterial color="#FF6B8A" roughness={0.9} />
      </mesh>

      {/* Flowers */}
      {[[2.0, 1.4, 1.5], [-1.2, 1.3, 2.0], [3.0, 1.1, -0.5]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.24, 4]} />
            <meshStandardMaterial color="#3A6B28" roughness={0.8} />
          </mesh>
          {Array.from({ length: 5 }).map((__, j) => {
            const a = (j / 5) * Math.PI * 2;
            return (
              <mesh key={j} position={[Math.cos(a) * 0.04, 0.25, Math.sin(a) * 0.04]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshStandardMaterial color={j % 2 === 0 ? "#FF6B8A" : "#FF9F5A"} roughness={0.6} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

/* ─── Speed Boat near island ─── */
export function Boat() {
  return <SpeedBoat position={[6, -0.35, -12]} />;
}

useGLTF.preload("/models/palm-trees.glb");
