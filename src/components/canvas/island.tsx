"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

/** Procedural palm tree: curved trunk + leaf fronds */
function PalmTree({
  position,
  height = 3,
  rotation = 0,
  lean = 0.15,
}: {
  position: [number, number, number];
  height?: number;
  rotation?: number;
  lean?: number;
}) {
  const groupRef = useRef<Group>(null);

  const fronds = useMemo(() => {
    const count = 7;
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const droop = 0.4 + Math.random() * 0.3;
      const length = 1.2 + Math.random() * 0.6;
      return { angle, droop, length };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z =
        lean + Math.sin(t * 0.5 + position[0] * 2) * 0.04;
      groupRef.current.rotation.x =
        Math.sin(t * 0.3 + position[2]) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotation, 0]}
    >
      {/* Trunk: slightly curved using multiple segments */}
      {Array.from({ length: 5 }).map((_, i) => {
        const segY = (i / 5) * height;
        const segLean = (i / 5) * lean * 0.5;
        const radius = 0.08 - i * 0.01;
        return (
          <mesh
            key={`trunk-${i}`}
            position={[segLean, segY + height * 0.1, 0]}
            castShadow
          >
            <cylinderGeometry args={[Math.max(0.03, radius - 0.01), radius, height / 5, 8]} />
            <meshStandardMaterial color="#8B6E4E" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Coconut cluster at top */}
      <group position={[lean * 0.5, height, 0]}>
        {[[-0.06, -0.05, 0], [0.05, -0.06, 0.04], [0, -0.04, -0.05]].map(
          (p, i) => (
            <mesh key={`coconut-${i}`} position={[p[0], p[1], p[2]]} castShadow>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#5C3A1E" roughness={0.8} />
            </mesh>
          ),
        )}

        {/* Leaf fronds */}
        {fronds.map((frond, i) => (
          <group key={`frond-${i}`} rotation={[frond.droop, frond.angle, 0]}>
            {/* Stem */}
            <mesh position={[0, 0, frond.length * 0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.008, 0.02, frond.length, 4]} />
              <meshStandardMaterial color="#3D6B1E" roughness={0.8} />
            </mesh>
            {/* Leaf blade */}
            <mesh position={[0, 0, frond.length * 0.55]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.4, frond.length * 0.8, 0.01]} />
              <meshStandardMaterial
                color="#5A8E28"
                roughness={0.7}
                side={2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ─── Bench Press (315 lbs = 3 plates each side) ─── */
function BenchPress({ position }: { position: [number, number, number] }) {
  const platePositions = [-0.48, -0.54, -0.60, 0.48, 0.54, 0.60];

  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 1.4]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
      {[[-0.18, -0.5], [0.18, -0.5], [-0.18, 0.5], [0.18, 0.5]].map(
        (p, i) => (
          <mesh key={i} position={[p[0], 0.15, p[1]]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
            <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
          </mesh>
        ),
      )}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.7, -0.55]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh
        position={[0, 1.0, -0.55]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.018, 0.018, 1.4, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>
      {platePositions.map((x, i) => (
        <mesh
          key={i}
          position={[x, 1.0, -0.55]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {[-0.44, 0.44].map((x, i) => (
        <mesh
          key={`clip-${i}`}
          position={[x, 1.0, -0.55]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
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
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.16, 12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.02, 12]} />
        <meshStandardMaterial color="#7AB648" roughness={0.3} />
      </mesh>
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
      <mesh>
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
      <mesh scale={[0.6, 0.6, 1.4]} castShadow>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.09, 0]} scale={[0.3, 0.02, 0.8]}>
        <boxGeometry args={[0.1, 0.1, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Lighthouse ─── */
function Lighthouse({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const lightRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.rotation.y = clock.getElapsedTime() * 1.5;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Stone foundation connecting to island */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.9, 0.6, 12]} />
        <meshStandardMaterial color="#8B7D6B" roughness={0.9} />
      </mesh>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.5, 12]} />
        <meshStandardMaterial color="#8B8B8B" roughness={0.7} />
      </mesh>
      {/* Tower body */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.45, 3.2, 12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.5} />
      </mesh>
      {/* Red stripe lower */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.42, 0.5, 12]} />
        <meshStandardMaterial color="#E8735A" roughness={0.5} />
      </mesh>
      {/* Red stripe upper */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.34, 0.4, 12]} />
        <meshStandardMaterial color="#E8735A" roughness={0.5} />
      </mesh>
      {/* Window (small dark inset) */}
      <mesh position={[0, 1.6, 0.36]} castShadow>
        <boxGeometry args={[0.12, 0.2, 0.04]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.3, 0.33]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.04]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.3} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.4, 0.46]} castShadow>
        <boxGeometry args={[0.2, 0.4, 0.04]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.8} />
      </mesh>
      {/* Gallery/balcony */}
      <mesh position={[0, 3.7, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.38, 0.12, 12]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Railing */}
      <mesh position={[0, 3.82, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.12, 12, 1, true]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Railing posts */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.5,
              3.88,
              Math.sin(angle) * 0.5,
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.2, 4]} />
            <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
          </mesh>
        );
      })}
      {/* Lantern room */}
      <mesh position={[0, 4.15, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.35, 0.6, 8]} />
        <meshStandardMaterial
          color="#F5F0E6"
          roughness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Light beacon */}
      <mesh ref={lightRef} position={[0, 4.15, 0]}>
        <boxGeometry args={[0.15, 0.32, 0.15]} />
        <meshStandardMaterial
          color="#FFDD44"
          emissive="#FFDD44"
          emissiveIntensity={8}
        />
      </mesh>
      {/* Beacon glow sphere */}
      <mesh position={[0, 4.15, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#FFDD44"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 4.65, 0]} castShadow>
        <coneGeometry args={[0.32, 0.45, 8]} />
        <meshStandardMaterial color="#E8735A" roughness={0.5} />
      </mesh>
      {/* Roof finial */}
      <mesh position={[0, 4.95, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>
      {/* Point light for glow — brighter, wider range */}
      <pointLight
        position={[0, 4.15, 0]}
        color="#FFDD44"
        intensity={5}
        distance={40}
      />
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
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.3, 3.0]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.85, 0.1, 2.8]} />
        <meshStandardMaterial color="#1A2A4A" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 1.5]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.75, 0.2, 0.7]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.35, 0.4]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.8, 0.35, 0.05]} />
        <meshStandardMaterial
          color="#88CCEE"
          transparent
          opacity={0.5}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.22, 0.25]}>
        <boxGeometry args={[0.75, 0.08, 0.35]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} />
      </mesh>
      {[-0.22, 0.22].map((x, i) => (
        <group key={i} position={[x, 0.22, -0.25]}>
          <mesh>
            <boxGeometry args={[0.28, 0.08, 0.3]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.15, -0.12]}>
            <boxGeometry args={[0.25, 0.25, 0.07]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.4} />
          </mesh>
        </group>
      ))}
      <group position={[0, -0.05, -1.55]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.4, 0.22]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
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
function Rock({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.35, 1]} />
      <meshStandardMaterial color="#6A6A5E" roughness={1} metalness={0.1} />
    </mesh>
  );
}

/* ─── Grass Cluster ─── */
function GrassCluster({
  position,
  count = 5,
}: {
  position: [number, number, number];
  count?: number;
}) {
  const blades = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4,
        h: 0.2 + Math.random() * 0.3,
        lean: (Math.random() - 0.5) * 0.3,
        rot: Math.random() * Math.PI * 2,
      })),
    [count],
  );

  return (
    <group position={position}>
      {blades.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, b.h / 2, b.z]}
          rotation={[b.lean, b.rot, 0]}
        >
          <coneGeometry args={[0.03, b.h, 4]} />
          <meshStandardMaterial color="#5A7E23" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Wooden Dock ─── */
function Dock({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.3, 0]}>
      {/* Deck planks */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 0.35 - 0.9]} castShadow>
          <boxGeometry args={[1.2, 0.06, 0.3]} />
          <meshStandardMaterial color="#8B6E4E" roughness={0.85} />
        </mesh>
      ))}
      {/* Support posts */}
      {[-0.5, 0.5].map((x, xi) =>
        [0, 1].map((zi) => (
          <mesh key={`${xi}-${zi}`} position={[x, -0.5, zi * 1.2 - 0.6]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 6]} />
            <meshStandardMaterial color="#6B5038" roughness={0.9} />
          </mesh>
        )),
      )}
      {/* Rope bollard */}
      <mesh position={[0.4, 0.12, 0.8]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.2, 6]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
    </group>
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
      {/* Main sand dome */}
      <mesh scale={scale} receiveShadow>
        <sphereGeometry args={[1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={sandColor} roughness={1} metalness={0} />
      </mesh>
      {/* Darker sand layer beneath for depth */}
      <mesh
        position={[0, -0.05, 0]}
        scale={[scale[0] * 1.05, scale[1] * 0.5, scale[2] * 1.05]}
        receiveShadow
      >
        <sphereGeometry args={[1, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C4A055" roughness={0.8} metalness={0} />
      </mesh>
      {/* Wet sand ring */}
      <mesh
        position={[0, -0.1, 0]}
        scale={[scale[0] * 1.12, scale[1] * 0.28, scale[2] * 1.12]}
        receiveShadow
      >
        <sphereGeometry args={[1, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B8944A" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Foam ring */}
      <mesh
        position={[0, -0.2, 0]}
        scale={[scale[0] * 1.22, scale[1] * 0.11, scale[2] * 1.22]}
      >
        <sphereGeometry args={[1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#3A9B8F"
          transparent
          opacity={0.25}
          roughness={0.2}
        />
      </mesh>
      {/* Underwater shelf */}
      <mesh
        position={[0, -0.4, 0]}
        scale={[scale[0] * 1.35, scale[1] * 0.06, scale[2] * 1.35]}
      >
        <sphereGeometry args={[1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#2A6B5F"
          transparent
          opacity={0.15}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}

/* ─── Main Island ─── */
export function Island() {
  const islandPosition: [number, number, number] = [10, -0.5, -15];

  const grassPositions = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const r = 1.5 + Math.random() * 4;
        return {
          x: Math.cos(angle) * r,
          z: Math.sin(angle) * r,
          y: 0.8 + Math.random() * 1.2,
        };
      }),
    [],
  );

  return (
    <group position={islandPosition}>
      <IslandBase scale={[9, 2.2, 8]} />

      {/* Palm trees */}
      <PalmTree position={[0, 2.0, 0]} height={3.5} rotation={0} />
      <PalmTree position={[-3.0, 1.8, 1.5]} height={3} rotation={1.2} lean={0.2} />
      <PalmTree position={[3.5, 1.8, -1.2]} height={3.2} rotation={2.5} />
      <PalmTree position={[-1.2, 1.9, -2.5]} height={2.5} rotation={4.0} lean={0.1} />
      <PalmTree position={[1.8, 1.9, 2.5]} height={2.8} rotation={5.5} lean={0.18} />
      {/* Smaller background trees */}
      <PalmTree position={[5.0, 1.2, 0.5]} height={2} rotation={0.8} />
      <PalmTree position={[-4.5, 1.3, -1.0]} height={2.2} rotation={3.5} lean={0.12} />

      {/* Bench press */}
      <BenchPress position={[-1.2, 1.85, -0.5]} />
      <MatchaCup position={[-0.5, 1.95, -0.8]} />
      <Basketball position={[1.0, 2.0, -1.2]} />
      <Football position={[2.0, 1.95, 0.5]} />

      {/* Dock extending into water */}
      <Dock position={[5.5, 0.0, 3.0]} />

      {/* Rocks — scattered along shore */}
      <Rock position={[5.5, 0.3, -2.0]} scale={1.5} />
      <Rock position={[-6.0, 0.25, -1.5]} scale={2.0} />
      <Rock position={[4.5, 0.2, -3.5]} scale={1.2} />
      <Rock position={[-5.5, 0.4, 2.0]} scale={0.9} />
      <Rock position={[2.0, 0.15, 4.5]} scale={0.7} />

      {/* Grass clusters */}
      {grassPositions.map((g, i) => (
        <GrassCluster
          key={i}
          position={[g.x, g.y, g.z]}
          count={3 + Math.floor(Math.random() * 4)}
        />
      ))}

      {/* Beach towel */}
      <mesh position={[-0.5, 1.8, 0.5]} rotation={[-0.1, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.01, 0.45]} />
        <meshStandardMaterial color="#FF6B8A" roughness={0.9} />
      </mesh>

      {/* Umbrella */}
      <group position={[0.8, 1.85, 1.0]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <coneGeometry args={[0.8, 0.3, 8]} />
          <meshStandardMaterial color="#E8735A" roughness={0.6} />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.03, 2.4, 6]} />
          <meshStandardMaterial color="#8B6E4E" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Small Island (with lighthouse) ─── */
export function SmallIsland() {
  const position: [number, number, number] = [-10, -0.5, -18];

  return (
    <group position={position}>
      <IslandBase scale={[6, 1.8, 5]} />

      {/* Palm trees */}
      <PalmTree position={[-2.5, 1.5, 1.2]} height={2.8} rotation={2.0} />
      <PalmTree position={[3.0, 1.3, 1.8]} height={2.2} rotation={0.8} lean={0.2} />
      <PalmTree position={[-1.5, 1.4, -2.0]} height={2} rotation={4.5} />

      {/* Lighthouse — centered and prominent */}
      <Lighthouse position={[0.5, 1.4, -0.3]} scale={1.8} />

      {/* Stone path to lighthouse */}
      {[0.3, 0.7, 1.1, 1.5, 1.9].map((z, i) => (
        <mesh
          key={i}
          position={[0.5 + Math.sin(i) * 0.15, 1.3, z]}
          rotation={[-0.2, i * 0.5, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[0.15, 0.18, 0.04, 6]} />
          <meshStandardMaterial color="#8B8070" roughness={0.95} />
        </mesh>
      ))}

      {/* Rocks along shore */}
      <Rock position={[3.8, 0.2, 1.5]} scale={1.2} />
      <Rock position={[-3.8, 0.15, -1.5]} scale={1.5} />
      <Rock position={[2.0, 0.3, -2.5]} scale={0.8} />

      {/* Grass */}
      <GrassCluster position={[-1.0, 1.4, 0.5]} count={6} />
      <GrassCluster position={[2.0, 1.2, 0.8]} count={4} />
      <GrassCluster position={[-2.0, 1.3, -0.8]} count={5} />
      <GrassCluster position={[1.0, 1.3, 2.0]} count={3} />
    </group>
  );
}

/* ─── Tiny Island (with beach ball) ─── */
export function TinyIsland() {
  const position: [number, number, number] = [20, -0.5, -10];

  return (
    <group position={position}>
      <IslandBase scale={[4, 1.2, 3.5]} sandColor="#D9BD7A" />

      {/* Palm trees */}
      <PalmTree position={[0, 1.0, 0]} height={2.5} rotation={1.0} />
      <PalmTree position={[-1.5, 0.9, -0.5]} height={1.8} rotation={3.2} lean={0.15} />

      {/* Beach ball */}
      <BeachBall position={[-1.2, 1.1, 0.8]} />

      {/* Rocks */}
      <Rock position={[2.0, 0.1, -0.8]} scale={1.0} />
      <Rock position={[-2.2, 0.15, 0.3]} scale={0.6} />

      {/* Grass */}
      <GrassCluster position={[0.8, 0.9, 0.5]} count={4} />
      <GrassCluster position={[-0.5, 0.85, -0.8]} count={3} />
    </group>
  );
}

/* ─── Speed Boat ─── */
export function Boat() {
  return <SpeedBoat position={[6, -0.35, -12]} />;
}

