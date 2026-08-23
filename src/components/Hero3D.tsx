"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The Regal emblem: a brushed-silver 3D "R" crowned in gold, slowly rotating.
 * Everything is generated from geometry — no external models, fonts or HDRIs —
 * so it loads instantly and works offline.
 */
function RegalEmblem() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  // Extruded, slightly bevelled "R".
  const rGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 14);
    shape.lineTo(9, 14);
    shape.lineTo(9, 7);
    shape.lineTo(6, 7);
    shape.lineTo(9, 0);
    shape.lineTo(6, 0);
    shape.lineTo(3, 5);
    shape.lineTo(3, 0);
    shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(3.5, 9.7);
    hole.lineTo(6.4, 9.7);
    hole.lineTo(6.4, 12.3);
    hole.lineTo(3.5, 12.3);
    hole.closePath();
    shape.holes.push(hole);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 3.2,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.4,
      bevelSegments: 4,
      curveSegments: 6,
    });
    geom.center();
    return geom;
  }, []);

  // Extruded crown silhouette.
  const crownGeom = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(6, 30);
    s.lineTo(19, 14);
    s.lineTo(38, 38);
    s.lineTo(57, 14);
    s.lineTo(70, 30);
    s.lineTo(76, 0);
    s.closePath();
    const geom = new THREE.ExtrudeGeometry(s, {
      depth: 4,
      bevelEnabled: true,
      bevelThickness: 0.6,
      bevelSize: 0.5,
      bevelSegments: 3,
    });
    geom.center();
    return geom;
  }, []);

  const jewels: [number, number][] = [
    [6, 30],
    [38, 38],
    [70, 30],
  ];

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.6}>
        {/* R */}
        <mesh geometry={rGeom} scale={0.17}>
          <meshStandardMaterial
            color="#d7dbe0"
            metalness={1}
            roughness={0.22}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Crown */}
        <mesh geometry={crownGeom} scale={0.05} position={[0, 1.9, 0]}>
          <meshStandardMaterial
            color="#C9A24B"
            metalness={1}
            roughness={0.28}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Jewels on the crown tips */}
        {jewels.map(([x, y], i) => (
          <mesh
            key={i}
            position={[(x - 38) * 0.05, (y - 19) * 0.05 + 1.9, 0]}
            scale={0.1}
          >
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial
              color="#E4C77E"
              metalness={1}
              roughness={0.15}
              envMapIntensity={1.6}
            />
          </mesh>
        ))}

        {/* Halo ring for depth */}
        <mesh rotation={[Math.PI / 2.3, 0, 0]} position={[0, -0.2, -1.2]}>
          <torusGeometry args={[2.7, 0.028, 16, 90]} />
          <meshStandardMaterial
            color="#C9A24B"
            metalness={1}
            roughness={0.3}
            emissive="#332610"
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 42 }}
    >
      <ambientLight intensity={0.35} />
      <spotLight
        position={[6, 9, 7]}
        angle={0.4}
        penumbra={1}
        intensity={45}
        color="#ffffff"
      />
      <spotLight
        position={[-7, -2, 4]}
        angle={0.5}
        penumbra={1}
        intensity={22}
        color="#E4C77E"
      />

      <RegalEmblem />

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.45}
        blur={3}
        scale={12}
        far={5}
        color="#000000"
      />

      <Environment resolution={256}>
        <Lightformer
          intensity={2.2}
          position={[0, 4, -6]}
          scale={[12, 12, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.4}
          position={[-6, 1, 3]}
          scale={[6, 6, 1]}
          color="#E4C77E"
        />
        <Lightformer
          intensity={1.1}
          position={[6, -2, 3]}
          scale={[6, 6, 1]}
          color="#C7CBD1"
        />
      </Environment>
    </Canvas>
  );
}
