"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

/* ─── Palm Tree with curved trunk and fan fronds ─── */
function PalmTree({
  position,
  scale = 1,
  lean = 0,
}: {
  position: [number, number, number];
  scale?: number;
  lean?: number;
}) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.z =
        lean + Math.sin(t * 0.8 + position[0]) * 0.025;
      groupRef.current.rotation.x = Math.sin(t * 0.6 + position[2]) * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk: 3 tapered segments for a curved look */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.2, 8]} />
        <meshStandardMaterial color="#8B7D3C" roughness={0.95} />
      </mesh>
      <mesh position={[0.05, 1.5, 0]} rotation={[0, 0, 0.08]} castShadow>
        <cylinderGeometry args={[0.1, 0.13, 1.2, 8]} />
        <meshStandardMaterial color="#9B8D4C" roughness={0.95} />
      </mesh>
      <mesh position={[0.12, 2.4, 0]} rotation={[0, 0, 0.12]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 1.0, 8]} />
        <meshStandardMaterial color="#A89A5C" roughness={0.9} />
      </mesh>

      {/* Fronds: elongated flat leaves radiating outward */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        const droopAngle = -0.5 - Math.random() * 0.4;
        return (
          <group
            key={i}
            position={[0.15, 2.9, 0]}
            rotation={[droopAngle, angle, 0]}
          >
            {/* Leaf stem */}
            <mesh position={[0, 0, -0.5]} castShadow>
              <boxGeometry args={[0.02, 0.02, 1.0]} />
              <meshStandardMaterial color="#2D6B1E" roughness={0.8} />
            </mesh>
            {/* Leaf blades */}
            {Array.from({ length: 4 }).map((__, j) => (
              <mesh
                key={j}
                position={[
                  (j % 2 === 0 ? 0.08 : -0.08),
                  0,
                  -0.25 - j * 0.2,
                ]}
                rotation={[0, 0, j % 2 === 0 ? 0.3 : -0.3]}
              >
                <boxGeometry args={[0.12, 0.005, 0.15]} />
                <meshStandardMaterial
                  color={j % 2 === 0 ? "#2D8B1E" : "#3A9B28"}
                  roughness={0.85}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Coconut cluster */}
      {[
        [0.1, 2.7, 0.08],
        [-0.08, 2.75, -0.05],
        [0.02, 2.65, 0.12],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#5C4033" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Bench Press ─── */
function BenchPress({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Bench pad */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.4, 0.08, 1.2]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
      </mesh>

      {/* Bench legs (4) */}
      {[
        [-0.15, 0.15, -0.4],
        [0.15, 0.15, -0.4],
        [-0.15, 0.15, 0.4],
        [0.15, 0.15, 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Rack uprights */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.65, -0.45]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 6]} />
          <meshStandardMaterial color="#555" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Barbell */}
      <mesh position={[0, 0.92, -0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.15} />
      </mesh>

      {/* Weight plates (left) */}
      {[-0.42, -0.48].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.92, -0.45]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.08 - i * 0.01, 0.08 - i * 0.01, 0.03, 16]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* Weight plates (right) */}
      {[0.42, 0.48].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.92, -0.45]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.08 - i * 0.01, 0.08 - i * 0.01, 0.03, 16]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* Small dumbbell nearby */}
      <group position={[0.6, 0.08, 0.2]} rotation={[0, 0.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.25, 6]} />
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.15} />
        </mesh>
        {[-0.12, 0.12].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 8]} />
            <meshStandardMaterial color="#333" metalness={0.7} roughness={0.4} />
          </mesh>
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
      // Gentle bobbing on the water
      boatRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
      boatRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
      boatRef.current.rotation.x = Math.sin(t * 0.6 + 1) * 0.015;
    }
  });

  return (
    <group ref={boatRef} position={position} rotation={[0, -0.6, 0]}>
      {/* Hull - tapered shape */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.25, 2.5]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Hull bottom (darker) */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.7, 0.08, 2.3]} />
        <meshStandardMaterial color="#1A2A4A" roughness={0.4} />
      </mesh>

      {/* Bow (pointed front) */}
      <mesh position={[0, 0.02, 1.3]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.28, 0.3]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.65, 0.3, 0.04]} />
        <meshStandardMaterial
          color="#88CCEE"
          transparent
          opacity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Dashboard */}
      <mesh position={[0, 0.18, 0.2]}>
        <boxGeometry args={[0.6, 0.06, 0.3]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} />
      </mesh>

      {/* Steering wheel */}
      <mesh position={[0.15, 0.28, 0.15]} rotation={[-0.5, 0, 0]}>
        <torusGeometry args={[0.06, 0.008, 8, 16]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Seats (2) */}
      {[-0.18, 0.18].map((x, i) => (
        <group key={i} position={[x, 0.18, -0.2]}>
          {/* Seat base */}
          <mesh>
            <boxGeometry args={[0.22, 0.06, 0.25]} />
            <meshStandardMaterial color="#F5F5F5" roughness={0.4} />
          </mesh>
          {/* Seat back */}
          <mesh position={[0, 0.12, -0.1]}>
            <boxGeometry args={[0.2, 0.2, 0.06]} />
            <meshStandardMaterial color="#F5F5F5" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Outboard motor */}
      <group position={[0, -0.05, -1.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.35, 0.2]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Motor shaft */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Propeller housing */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.12]} />
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Racing stripe */}
      <mesh position={[0.41, 0.05, 0]}>
        <boxGeometry args={[0.01, 0.08, 2.0]} />
        <meshStandardMaterial color="#E8735A" roughness={0.3} />
      </mesh>
      <mesh position={[-0.41, 0.05, 0]}>
        <boxGeometry args={[0.01, 0.08, 2.0]} />
        <meshStandardMaterial color="#E8735A" roughness={0.3} />
      </mesh>
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
      <dodecahedronGeometry args={[0.3, 1]} />
      <meshStandardMaterial color="#7A7A6E" roughness={1} metalness={0.1} />
    </mesh>
  );
}

/* ─── Tropical flowers ─── */
function Flower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Stem */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.24, 4]} />
        <meshStandardMaterial color="#3A6B28" roughness={0.8} />
      </mesh>
      {/* Petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.04, 0.25, Math.sin(a) * 0.04]}
            rotation={[0.3, a, 0]}
          >
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#FF6B8A" : "#FF9F5A"}
              roughness={0.6}
            />
          </mesh>
        );
      })}
      {/* Center */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Main Island ─── */
export function Island() {
  const islandRef = useRef<Mesh>(null);
  const islandPosition: [number, number, number] = [18, -0.6, -22];

  const grassTufts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 1.5 + Math.random() * 2;
        return {
          x: Math.cos(angle) * r,
          z: Math.sin(angle) * r,
          y: 0.4 + Math.random() * 0.3,
          rotation: angle + Math.random(),
        };
      }),
    []
  );

  return (
    <group position={islandPosition}>
      {/* Main island terrain: organic shape */}
      <mesh
        ref={islandRef}
        position={[0, 0, 0]}
        scale={[5.5, 1.5, 4.5]}
        receiveShadow
      >
        <sphereGeometry args={[1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4B06A" roughness={1} metalness={0} />
      </mesh>

      {/* Wet sand ring (darker ring where water meets land) */}
      <mesh position={[0, -0.1, 0]} scale={[6.2, 0.4, 5.0]} receiveShadow>
        <sphereGeometry args={[1, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B8944A" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Shallow water rim for foam effect */}
      <mesh position={[0, -0.2, 0]} scale={[7, 0.15, 5.5]} receiveShadow>
        <sphereGeometry args={[1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#5ABCB9"
          transparent
          opacity={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Palm trees - varied sizes and leans */}
      <PalmTree position={[0.5, 1.35, 0]} scale={1.3} lean={0.05} />
      <PalmTree position={[-2.0, 1.2, 1.0]} scale={1.0} lean={-0.12} />
      <PalmTree position={[2.2, 1.15, -0.8]} scale={1.1} lean={0.18} />
      <PalmTree position={[-0.5, 1.25, -1.5]} scale={0.85} lean={-0.06} />
      <PalmTree position={[1.0, 1.1, 1.8]} scale={0.7} lean={0.1} />

      {/* Bench press on the island */}
      <BenchPress position={[-1.0, 1.25, -0.3]} />

      {/* Scattered rocks */}
      <Rock position={[3.5, 0.25, 1.8]} scale={0.9} />
      <Rock position={[-3.8, 0.2, -1.0]} scale={1.3} />
      <Rock position={[2.8, 0.15, -2.2]} scale={0.7} />
      <Rock position={[-2.5, 0.3, 2.0]} scale={0.5} />

      {/* Tropical flowers */}
      <Flower position={[1.5, 1.2, 1.0]} />
      <Flower position={[-0.8, 1.15, 1.5]} />
      <Flower position={[2.5, 0.8, -0.3]} />

      {/* Beach grass tufts */}
      {grassTufts.map((tuft, i) => (
        <mesh
          key={i}
          position={[tuft.x, tuft.y, tuft.z]}
          rotation={[0, tuft.rotation, 0]}
        >
          <coneGeometry args={[0.04, 0.35, 4]} />
          <meshStandardMaterial color="#6B8E23" roughness={0.9} />
        </mesh>
      ))}

      {/* Small beach towel near the bench press */}
      <mesh
        position={[-0.3, 1.22, 0.4]}
        rotation={[-0.1, 0.5, 0]}
        receiveShadow
      >
        <boxGeometry args={[0.5, 0.01, 0.3]} />
        <meshStandardMaterial color="#FF6B8A" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Speed Boat (separate, floats on water near island) ─── */
export function Boat() {
  return <SpeedBoat position={[12, -0.3, -16]} />;
}
