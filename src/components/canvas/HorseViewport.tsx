'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Horse3D } from './Horse3D';
import { useHorseStore } from '@/store/useHorseStore';

// Circular luxury desert podium with subtle gold trim ring
function LuxuryPodium() {
  return (
    <group position={[0, -1.22, 0]}>
      {/* Outer subtle gold ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[3.2, 3.24, 64]} />
        <meshStandardMaterial color="#d4af37" emissive="#78590d" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Inner faint circular dais */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial
          color="#0c0c0e"
          roughness={0.85}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraPreset = useHorseStore((state) => state.cameraPreset);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    if (cameraPreset === 'head') {
      controls.object.position.set(2.2, 1.4, 2.8);
      controls.target.set(0, 0.4, 0.5);
    } else if (cameraPreset === 'motion') {
      controls.object.position.set(5.2, 1.8, 3.8);
      controls.target.set(0, -0.2, 0);
    } else {
      // Full view
      controls.object.position.set(4.5, 1.8, 5.8);
      controls.target.set(0, -0.1, 0);
    }
    controls.update();
  }, [cameraPreset]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3.2}
      maxDistance={8.5}
      minPolarAngle={Math.PI / 4.5}
      maxPolarAngle={Math.PI / 2 - 0.04}
      autoRotate={false}
      autoRotateSpeed={0.5}
    />
  );
}

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070709] z-20 pointer-events-none">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border border-amber-500/30 border-t-amber-400 animate-spin" />
        <div className="absolute text-amber-400 font-serif text-xs tracking-widest uppercase">
          مزارع
        </div>
      </div>
      <p className="mt-4 text-xs font-light text-amber-200/70 tracking-[0.3em] uppercase">
        Summoning Royal Bloodline...
      </p>
    </div>
  );
}

export default function HorseViewport() {
  return (
    <div className="relative w-full h-full select-none">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          shadows
          camera={{ position: [4.5, 1.8, 5.8], fov: 42 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          className="w-full h-full touch-none"
        >
          {/* Subtle warm desert night atmosphere */}
          <color attach="background" args={['#070709']} />
          <fog attach="fog" args={['#070709', 10, 24]} />

          {/* Cinematic Studio & Desert Sunset Lighting */}
          <ambientLight intensity={0.45} />
          
          {/* Key light: Sculpting muscular anatomy */}
          <directionalLight
            position={[8, 14, 8]}
            intensity={2.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={30}
            shadow-bias={-0.0001}
          />

          {/* Champagne gold rim light */}
          <directionalLight
            position={[-8, 10, -6]}
            intensity={1.8}
            color="#e5c378"
          />

          {/* Soft fill light from front */}
          <directionalLight
            position={[0, 4, 10]}
            intensity={0.6}
            color="#9bb3c8"
          />

          {/* Drei Environment for realistic reflections on shiny coat */}
          <Environment preset="city" environmentIntensity={0.6} />

          {/* Ground Contact Shadows */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.7}
            scale={14}
            blur={2.2}
            far={4.5}
            color="#000000"
          />

          <LuxuryPodium />

          <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.08}>
            <Horse3D />
          </Float>

          <CameraRig />
        </Canvas>
      </Suspense>
    </div>
  );
}
