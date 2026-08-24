"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const WALL = { color: "#2b2f3a", roughness: 0.6, metalness: 0.35 };
const DARK = { color: "#191b22", roughness: 0.7, metalness: 0.3 };

function LitPanel({
  position,
  args,
  rotY = 0,
}: {
  position: [number, number, number];
  args: [number, number];
  rotY?: number;
}) {
  return (
    <mesh position={position} rotation={[0, rotY, 0]}>
      <planeGeometry args={args} />
      <meshStandardMaterial
        color="#ffd98a"
        emissive="#ffcf78"
        emissiveIntensity={4.6}
        toneMapped={false}
      />
    </mesh>
  );
}

function Villa() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // gentle front-facing sway + subtle cursor parallax
    const baseY = -0.55 + Math.sin(t * 0.25) * 0.35 + state.pointer.x * 0.25;
    g.rotation.y += (baseY - g.rotation.y) * 0.06;
    const targetX = -0.02 + state.pointer.y * 0.08;
    g.rotation.x += (targetX - g.rotation.x) * 0.05;
    g.position.y = -1.1 + Math.sin(t * 0.6) * 0.04;
  });

  return (
    <group ref={group} position={[0, -1.1, 0]} rotation={[0, -0.55, 0]}>
      {/* podium */}
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <boxGeometry args={[6.6, 0.36, 4.6]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[6.7, 0.04, 4.7]} />
        <meshStandardMaterial color="#C9A24B" metalness={1} roughness={0.35} />
      </mesh>

      {/* main block */}
      <mesh position={[-0.7, 1.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 2.1, 3]} />
        <meshStandardMaterial {...WALL} />
      </mesh>
      {/* main roof overhang */}
      <mesh position={[-0.7, 2.58, 0]} castShadow>
        <boxGeometry args={[4.2, 0.13, 3.4]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      {/* warm strip light under roof */}
      <mesh position={[-0.7, 2.48, 1.51]}>
        <boxGeometry args={[3.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#ffcf78" emissive="#ffcf78" emissiveIntensity={3.2} toneMapped={false} />
      </mesh>

      {/* cantilevered upper block */}
      <mesh position={[0.95, 3.0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 1.55, 3.1]} />
        <meshStandardMaterial {...WALL} />
      </mesh>
      <mesh position={[0.95, 3.82, 0.25]} castShadow>
        <boxGeometry args={[3.3, 0.13, 3.5]} />
        <meshStandardMaterial {...DARK} />
      </mesh>

      {/* gold vertical fins on the main facade */}
      {[-2.3, -2.0, -1.7, -1.4].map((x, i) => (
        <mesh key={i} position={[x, 1.35, 1.52]}>
          <boxGeometry args={[0.05, 1.8, 0.05]} />
          <meshStandardMaterial color="#C9A24B" metalness={1} roughness={0.3} />
        </mesh>
      ))}

      {/* front windows — main block (grid) */}
      <LitPanel position={[0.15, 1.55, 1.515]} args={[0.75, 1.15]} />
      <LitPanel position={[1.05, 1.55, 1.515]} args={[0.75, 1.15]} />
      <LitPanel position={[0.15, 0.7, 1.515]} args={[0.75, 0.5]} />
      <LitPanel position={[1.05, 0.7, 1.515]} args={[0.75, 0.5]} />
      {/* upper block front — long window band */}
      <LitPanel position={[0.95, 3.05, 1.81]} args={[2.3, 1.0]} />
      {/* right-side windows */}
      <LitPanel position={[2.42, 3.05, 0.25]} args={[2.4, 1.0]} rotY={Math.PI / 2} />
      <LitPanel position={[1.22, 1.5, 0]} args={[2.4, 1.1]} rotY={Math.PI / 2} />
    </group>
  );
}

export default function HouseScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [8.5, 4.2, 9], fov: 32 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[7, 9, 5]} intensity={2.0} color="#fff4e0" />
      <directionalLight position={[-6, 3, -3]} intensity={0.7} color="#aebfe8" />

      <Villa />

      <ContactShadows position={[0, -0.95, 0]} opacity={0.55} blur={2.4} scale={18} far={7} color="#000000" />

      <Environment resolution={128}>
        <Lightformer intensity={1.5} position={[0, 5, -6]} scale={[14, 8, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[-6, 2, 4]} scale={[6, 6, 1]} color="#E4C77E" />
        <Lightformer intensity={0.8} position={[6, 0, 3]} scale={[6, 6, 1]} color="#9fb2d9" />
      </Environment>
    </Canvas>
  );
}
