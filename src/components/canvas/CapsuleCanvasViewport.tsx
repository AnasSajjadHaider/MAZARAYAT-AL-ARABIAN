'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { CapsuleScrollHorse } from './CapsuleScrollHorse';

function RoyalGroundDais() {
  return (
    <group position={[0, -0.73, 0]}>
      {/* Subtle Golden Orbital Halo Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.45, 64]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function CapsuleCanvasViewport() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0.1, 5.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        {/* Warm Majestic Royal Lighting */}
        <ambientLight intensity={0.9} color="#fffcf7" />
        <directionalLight
          position={[8, 14, 6]}
          intensity={2.8}
          color="#fffdf5"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-8, 8, -6]} intensity={1.8} color="#e5c378" />
        <directionalLight position={[0, -4, 4]} intensity={0.5} color="#ffffff" />

        {/* Ambient Environment Reflections */}
        <Environment preset="city" environmentIntensity={0.65} />

        {/* Soft Ground Contact Shadow */}
        <ContactShadows
          position={[0, -0.72, 0]}
          opacity={0.55}
          scale={9}
          blur={2.4}
          far={3.8}
          color="#2e2218"
        />

        <RoyalGroundDais />
        <CapsuleScrollHorse />
      </Canvas>
    </div>
  );
}
