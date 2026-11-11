"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// 3D Procedural Hardbound Book Component
function Book({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef({ x: rotation[0], y: rotation[1], z: rotation[2] });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Gentle hovering tilt towards pointer
    const pointerX = state.pointer.x * 0.3;
    const pointerY = state.pointer.y * 0.3;

    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      targetRotation.current.x + pointerY + (hovered ? 0.2 : 0),
      4,
      delta
    );
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      targetRotation.current.y + pointerX + (hovered ? 0.4 : 0),
      4,
      delta
    );
  });

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "auto";
      }}
    >
      {/* Front & Back Cover (Rich Royal Purple) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 2.3, 0.34]} />
        <meshStandardMaterial
          color={hovered ? "#7C3AED" : "#581C87"}
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Pages Block (Soft White / Cream) */}
      <mesh position={[0.06, 0, 0]}>
        <boxGeometry args={[1.56, 2.16, 0.26]} />
        <meshStandardMaterial color="#FAF5FF" roughness={0.8} />
      </mesh>

      {/* Book Spine (Accent Deep Purple) */}
      <mesh position={[-0.82, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 2.3, 16]} />
        <meshStandardMaterial color="#3B0764" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Gold Foil Spine Bands */}
      <mesh position={[-0.83, 0.6, 0]}>
        <cylinderGeometry args={[0.175, 0.175, 0.06, 16]} />
        <meshStandardMaterial color="#DDD6FE" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.83, -0.6, 0]}>
        <cylinderGeometry args={[0.175, 0.175, 0.06, 16]} />
        <meshStandardMaterial color="#DDD6FE" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Bookmark Ribbon */}
      <mesh position={[0.2, -1.2, 0.1]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.08, 0.4, 0.02]} />
        <meshStandardMaterial color="#A78BFA" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 3D Procedural Fountain Pen Component
function FountainPen({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const penRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!penRef.current) return;
    penRef.current.rotation.z += (hovered ? 2.5 : 0.8) * delta;
  });

  return (
    <group
      ref={penRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "auto";
      }}
    >
      {/* Upper Barrel */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.1, 24]} />
        <meshStandardMaterial color="#6D28D9" metalness={0.4} roughness={0.2} />
      </mesh>

      {/* Metallic Center Ring */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.08, 24]} />
        <meshStandardMaterial color="#DDD6FE" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Grip Section */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.065, 0.6, 24]} />
        <meshStandardMaterial color="#2E1065" roughness={0.3} />
      </mesh>

      {/* Chrome Nib Base */}
      <mesh position={[0, -0.66, 0]}>
        <coneGeometry args={[0.065, 0.22, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Golden Nib Tip */}
      <mesh position={[0, -0.78, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.035, 0.12, 16]} />
        <meshStandardMaterial color="#C4B5FD" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Pen Clip */}
      <mesh position={[0.09, 0.85, 0]}>
        <boxGeometry args={[0.02, 0.45, 0.03]} />
        <meshStandardMaterial color="#DDD6FE" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 3D Procedural Stationery Ruler Component
function FloatingRuler({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += (hovered ? 1.4 : 0.3) * delta;
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "auto";
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[0.26, 1.8, 0.04]} />
        <meshStandardMaterial
          color={hovered ? "#DDD6FE" : "#C4B5FD"}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {[-0.7, -0.5, -0.3, -0.1, 0.1, 0.3, 0.5, 0.7].map((y, i) => (
        <mesh key={i} position={[0.07, y, 0.022]}>
          <boxGeometry args={[0.09, 0.02, 0.005]} />
          <meshStandardMaterial color="#4C1D95" />
        </mesh>
      ))}
    </group>
  );
}

// 3D Floating Geometry / Stationery Sphere
function FloatingGlobe({
  position = [0, 0, 0],
  color = "#8B5CF6",
  size = 0.4,
}: {
  position?: [number, number, number];
  color?: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.002;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.15}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// 3D Interactive Scene Container (Full Background)
export function HeroScene3D() {
  return (
    <div className="relative h-full w-full select-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full pointer-events-auto"
      >
        {/* Lights */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} castShadow />
        <pointLight position={[-4, 3, 2]} intensity={1.5} color="#A78BFA" />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#6D28D9" />

        {/* Ambient Purple Sparkles across the hero background */}
        <Sparkles count={55} scale={12} size={3.2} speed={0.4} color="#DDD6FE" opacity={0.7} />

        {/* Main Floating Hardbound Book (Positioned on the right side of the hero) */}
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
          <Book position={[1.5, 0.1, 0.2]} rotation={[0.2, -0.35, 0.1]} scale={1.2} />
        </Float>

        {/* Floating Secondary Book / Notebook */}
        <Float speed={1.7} rotationIntensity={0.8} floatIntensity={0.7} floatingRange={[-0.2, 0.2]}>
          <Book position={[2.7, -0.7, -0.6]} rotation={[-0.25, 0.5, -0.15]} scale={0.95} />
        </Float>

        {/* Interactive Floating Pen */}
        <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.1} floatingRange={[-0.25, 0.25]}>
          <FountainPen position={[0.6, 0.9, 0.6]} rotation={[0.4, 0.2, -0.65]} scale={1.15} />
        </Float>

        {/* Floating Stationery Ruler */}
        <Float speed={1.5} rotationIntensity={0.9} floatIntensity={0.6}>
          <FloatingRuler position={[2.1, 1.2, -0.4]} rotation={[0.1, 0.2, 0.6]} scale={0.9} />
        </Float>

        {/* Floating Glowing Decorative Orbs across the background */}
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1.2}>
          <FloatingGlobe position={[2.2, 1.5, -0.5]} color="#C4B5FD" size={0.32} />
          <FloatingGlobe position={[-2.4, 1.4, -1]} color="#7C3AED" size={0.3} />
          <FloatingGlobe position={[-1.8, -1.0, -0.5]} color="#A78BFA" size={0.22} />
          <FloatingGlobe position={[3.1, -1.3, -0.8]} color="#DDD6FE" size={0.25} />
          <FloatingGlobe position={[-0.5, 2.0, -1.2]} color="#EDE9FE" size={0.2} />
        </Float>

        {/* Soft Grounded Purple Shadow */}
        <ContactShadows
          position={[1.5, -2.1, 0]}
          opacity={0.35}
          scale={9}
          blur={2.4}
          far={4.5}
          color="#1B0A33"
        />
      </Canvas>

      {/* Interactive Helper Overlay Badge */}
      <div className="pointer-events-none absolute bottom-4 right-6 flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-950/70 px-4 py-2 text-xs font-bold text-purple-200 backdrop-blur-md shadow-lg">
        <span className="size-2 animate-pulse rounded-full bg-purple-400" />
        <span>Interactive 3D &bull; Hover to explore</span>
      </div>
    </div>
  );
}

export default HeroScene3D;
