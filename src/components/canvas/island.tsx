"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group, Mesh, Object3D } from "three";

/**
 * GLB Palm Tree using drei's `nodes` pattern.
 * The pack has nodes: PalmTree_1..5, each at scale=100, positions spread 100+ apart.
 * We use `nodes` to get named references, clone them, reset position.
 */
const TREE_NAMES = ["PalmTree_1", "PalmTree_2", "PalmTree_3", "PalmTree_4", "PalmTree_5"];

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
  const gltf = useGLTF("/models/palm-trees.glb");

  const treeClone = useMemo(() => {
    // Method 1: Use nodes (drei gives named node references)
    const nodes = gltf.nodes as Record<string, Object3D>;
    const treeName = TREE_NAMES[treeIndex % TREE_NAMES.length];
    let source: Object3D | undefined = nodes[treeName];

    // Method 2: Fallback to traversing scene children
    if (!source) {
      const allChildren: Object3D[] = [];
      gltf.scene.traverse((child: Object3D) => {
        if ((child as Mesh).isMesh) {
          allChildren.push(child);
        }
      });
      source = allChildren[treeIndex % Math.max(allChildren.length, 1)];
    }

    if (!source) return null;

    const clone = source.clone(true);
    // Reset transforms baked in from the FBX export
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    return clone;
  }, [gltf, treeIndex]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z =
        Math.sin(t * 0.6 + position[0] * 2) * 0.02;
      groupRef.current.rotation.x =
        Math.sin(t * 0.4 + position[2]) * 0.015;
    }
  });

  if (!treeClone) return null;

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      <primitive object={treeClone} />
    </group>
  );
}

/* ─── Bench Press (315 lbs = 3 plates each side) ─── */
function BenchPress({ position }: { position: [number, number, number] }) {
  // 3 plates per side (45 lbs each) + 45 lb bar = 315 lbs
  const platePositions = [
    // Left side: 3 plates
    -0.48, -0.54, -0.60,
    // Right side: 3 plates
    0.48, 0.54, 0.60,
  ];

  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Bench seat */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 1.4]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
      {/* Support legs */}
      {[[-0.18, -0.5], [0.18, -0.5], [-0.18, 0.5], [0.18, 0.5]].map((p, i) => (
        <mesh key={i} position={[p[0], 0.15, p[1]]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Vertical uprights */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.7, -0.55]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Barbell */}
      <mesh position={[0, 1.0, -0.55]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 1.4, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>
      {/* 3 plates each side (45 lb plates) */}
      {platePositions.map((x, i) => (
        <mesh key={i} position={[x, 1.0, -0.55]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Collar clips */}
      {[-0.44, 0.44].map((x, i) => (
        <mesh key={`clip-${i}`} position={[x, 1.0, -0.55]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
          <meshStandardMaterial color="#E8735A" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Matcha Cup ─── */
function MatchaCup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Cup body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.16, 12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.6} />
      </mesh>
      {/* Matcha liquid */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.02, 12]} />
        <meshStandardMaterial color="#7AB648" roughness={0.3} />
      </mesh>
      {/* Lid */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.082, 0.02, 12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Beach Ball ─── */
function BeachBall({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      {/* Colored stripes (overlapping spheres with slight offsets to create stripe effect) */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.182, 16, 16, 0, Math.PI / 3]} />
        <meshStandardMaterial color="#E8735A" roughness={0.5} />
      </mesh>
      <mesh rotation={[0, (Math.PI * 2) / 3, 0]}>
        <sphereGeometry args={[0.182, 16, 16, 0, Math.PI / 3]} />
        <meshStandardMaterial color="#2A9D8F" roughness={0.5} />
      </mesh>
      <mesh rotation={[0, (Math.PI * 4) / 3, 0]}>
        <sphereGeometry args={[0.182, 16, 16, 0, Math.PI / 3]} />
        <meshStandardMaterial color="#F4A942" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Basketball ─── */
function Basketball({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#E87830" roughness={0.7} metalness={0.05} />
    </mesh>
  );
}

/* ─── Football ─── */
function Football({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.3, 0.5, Math.PI / 4]}>
      <mesh castShadow>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      {/* Elongate with scale to make it football-shaped */}
      <mesh scale={[0.6, 0.6, 1.4]} castShadow>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      {/* Laces */}
      <mesh position={[0, 0.09, 0]} scale={[0.3, 0.02, 0.8]}>
        <boxGeometry args={[0.1, 0.1, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Lighthouse ─── */
function Lighthouse({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.rotation.y = clock.getElapsedTime() * 1.5;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.25, 0.35, 0.3, 12]} />
        <meshStandardMaterial color="#8B8B8B" roughness={0.7} />
      </mesh>
      {/* Tower body - white with red stripe */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.25, 1.3, 12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.5} />
      </mesh>
      {/* Red stripe */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.21, 0.22, 0.25, 12]} />
        <meshStandardMaterial color="#E8735A" roughness={0.5} />
      </mesh>
      {/* Gallery/balcony */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.2, 0.08, 12]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Railing */}
      <mesh position={[0, 1.56, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.06, 12, 1, true]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Lantern room */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, 0.3, 8]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.4} transparent opacity={0.9} />
      </mesh>
      {/* Light beacon */}
      <mesh ref={lightRef} position={[0, 1.7, 0]}>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshStandardMaterial color="#FFDD44" emissive="#FFDD44" emissiveIntensity={2} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <coneGeometry args={[0.16, 0.2, 8]} />
        <meshStandardMaterial color="#E8735A" roughness={0.5} />
      </mesh>
      {/* Point light for glow effect */}
      <pointLight position={[0, 1.7, 0]} color="#FFDD44" intensity={0.5} distance={5} />
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
      <mesh castShadow><boxGeometry args={[1.0, 0.3, 3.0]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0.1} /></mesh>
      <mesh position={[0, -0.15, 0]}><boxGeometry args={[0.85, 0.1, 2.8]} />
        <meshStandardMaterial color="#1A2A4A" roughness={0.4} /></mesh>
      <mesh position={[0, 0.02, 1.5]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.75, 0.2, 0.7]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0.1} /></mesh>
      <mesh position={[0, 0.35, 0.4]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.8, 0.35, 0.05]} />
        <meshStandardMaterial color="#88CCEE" transparent opacity={0.5} metalness={0.9} roughness={0.05} /></mesh>
      <mesh position={[0, 0.22, 0.25]}><boxGeometry args={[0.75, 0.08, 0.35]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} /></mesh>
      {[-0.22, 0.22].map((x, i) => (
        <group key={i} position={[x, 0.22, -0.25]}>
          <mesh><boxGeometry args={[0.28, 0.08, 0.3]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.4} /></mesh>
          <mesh position={[0, 0.15, -0.12]}><boxGeometry args={[0.25, 0.25, 0.07]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.4} /></mesh>
        </group>
      ))}
      <group position={[0, -0.05, -1.55]}>
        <mesh castShadow><boxGeometry args={[0.18, 0.4, 0.22]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} /></mesh>
        <mesh position={[0, -0.3, 0]}><cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} /></mesh>
      </group>
      {[0.51, -0.51].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]}><boxGeometry args={[0.012, 0.1, 2.5]} />
          <meshStandardMaterial color="#E8735A" roughness={0.3} /></mesh>
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

/* ─── Island Base (reusable) ─── */
function IslandBase({
  scale,
  sandColor = "#D4B06A",
}: {
  scale: [number, number, number];
  sandColor?: string;
}) {
  return (
    <>
      <mesh scale={scale} receiveShadow>
        <sphereGeometry args={[1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={sandColor} roughness={1} metalness={0} />
      </mesh>
      {/* Wet sand */}
      <mesh position={[0, -0.1, 0]} scale={[scale[0] * 1.1, scale[1] * 0.28, scale[2] * 1.1]} receiveShadow>
        <sphereGeometry args={[1, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B8944A" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Foam */}
      <mesh position={[0, -0.2, 0]} scale={[scale[0] * 1.2, scale[1] * 0.11, scale[2] * 1.2]}>
        <sphereGeometry args={[1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3A9B8F" transparent opacity={0.25} roughness={0.2} />
      </mesh>
    </>
  );
}

/* ─── Main Island ─── */
export function Island() {
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
      <IslandBase scale={[7, 1.8, 6]} />

      {/* GLB Palm trees using different variants */}
      <PalmTreeModel position={[0, 1.6, 0]} scale={0.018} rotation={0} treeIndex={0} />
      <PalmTreeModel position={[-2.5, 1.45, 1.2]} scale={0.014} rotation={1.2} treeIndex={1} />
      <PalmTreeModel position={[2.8, 1.4, -1.0]} scale={0.016} rotation={2.5} treeIndex={2} />
      <PalmTreeModel position={[-1.0, 1.5, -1.8]} scale={0.012} rotation={4.0} treeIndex={3} />
      <PalmTreeModel position={[1.5, 1.5, 2.0]} scale={0.013} rotation={5.5} treeIndex={4} />

      {/* Bench press */}
      <BenchPress position={[-1.2, 1.55, -0.5]} />

      {/* Matcha next to benchpress */}
      <MatchaCup position={[-0.5, 1.65, -0.8]} />

      {/* Basketball near bench */}
      <Basketball position={[1.0, 1.7, -1.2]} />

      {/* Football */}
      <Football position={[2.0, 1.65, 0.5]} />

      {/* Rocks */}
      <Rock position={[4.5, 0.3, 2.2]} scale={1.1} />
      <Rock position={[-4.8, 0.25, -1.2]} scale={1.5} />
      <Rock position={[3.5, 0.2, -2.8]} scale={0.8} />

      {/* Grass */}
      {grassTufts.map((t, i) => (
        <mesh key={i} position={[t.x, t.y, t.z]} rotation={[0, t.rot, 0]}>
          <coneGeometry args={[0.05, 0.4, 4]} />
          <meshStandardMaterial color="#5A7E23" roughness={0.9} />
        </mesh>
      ))}

      {/* Beach towel */}
      <mesh position={[-0.5, 1.5, 0.5]} rotation={[-0.1, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.01, 0.35]} />
        <meshStandardMaterial color="#FF6B8A" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Small Island (with lighthouse) ─── */
export function SmallIsland() {
  const position: [number, number, number] = [-15, -0.5, -25];

  return (
    <group position={position}>
      <IslandBase scale={[4, 1.2, 3.5]} />

      {/* Palm tree */}
      <PalmTreeModel position={[-1.2, 1.0, 0.5]} scale={0.012} rotation={2.0} treeIndex={2} />

      {/* Lighthouse */}
      <Lighthouse position={[0.5, 1.0, -0.3]} />

      {/* Rocks */}
      <Rock position={[2.5, 0.2, 1.0]} scale={0.7} />
      <Rock position={[-2.2, 0.15, -1.0]} scale={0.9} />
    </group>
  );
}

/* ─── Tiny Island (with beach ball) ─── */
export function TinyIsland() {
  const position: [number, number, number] = [25, -0.5, -12];

  return (
    <group position={position}>
      <IslandBase scale={[2.5, 0.9, 2]} sandColor="#D9BD7A" />

      {/* Palm tree */}
      <PalmTreeModel position={[0, 0.8, 0]} scale={0.010} rotation={1.0} treeIndex={4} />

      {/* Beach ball */}
      <BeachBall position={[-0.8, 0.9, 0.4]} />

      {/* Rock */}
      <Rock position={[1.2, 0.1, -0.5]} scale={0.6} />
    </group>
  );
}

/* ─── Speed Boat ─── */
export function Boat() {
  return <SpeedBoat position={[6, -0.35, -12]} />;
}

useGLTF.preload("/models/palm-trees.glb");
