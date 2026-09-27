'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Horse3D } from './Horse3D';
import { useHorseStore } from '@/store/useHorseStore';

// Circular luxury desert podium with subtle gold trim ring
function LuxuryPodium() {
  return (
    <group position={[0, -1.06, 0]}>
      {/* Outer subtle gold ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2.8, 2.84, 64]} />
        <meshStandardMaterial color="#d4af37" emissive="#78590d" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Inner faint circular dais */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.8, 64]} />
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
  const { size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    // Generous breathing distance so the horse is completely uncrowded
    const distFactor = isMobile ? 1.35 : 1.0;
    const yOffset = isMobile ? 0.2 : 0;

    if (cameraPreset === 'head') {
      controls.object.position.set(1.8 * distFactor, 1.4, 2.4 * distFactor);
      controls.target.set(0, 0.4 + yOffset, 0.4);
    } else if (cameraPreset === 'motion') {
      controls.object.position.set(5.2 * distFactor, 1.8, 4.2 * distFactor);
      controls.target.set(0, 0 + yOffset, 0);
    } else {
      // Full view (pulled back generously for luxury breathing space)
      controls.object.position.set(4.8 * distFactor, 1.8, 6.5 * distFactor);
      controls.target.set(0, 0 + yOffset, 0);
    }
    controls.update();
  }, [cameraPreset, isMobile]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3.5}
      maxDistance={14.0}
      minPolarAngle={Math.PI / 4.5}
      maxPolarAngle={Math.PI / 2 - 0.04}
      autoRotate={false}
      autoRotateSpeed={0.5}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
}

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070709] z-20 pointer-events-none">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-amber-500/30 border-t-amber-400 animate-spin" />
      </div>
      <p className="mt-3 text-[10px] font-light text-amber-200/60 tracking-[0.25em] uppercase">
        Loading Arabian Viewport...
      </p>
    </div>
  );
}

export default function HorseViewport() {
  return (
    <div className="relative w-full h-full select-none touch-none">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          shadows
          camera={{ position: [4.8, 1.8, 6.5], fov: 40 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          className="w-full h-full touch-none"
        >
          {/* Subtle warm desert night atmosphere */}
          <color attach="background" args={['#070709']} />
          <fog attach="fog" args={['#070709', 12, 28]} />

          {/* Cinematic Studio & Desert Sunset Lighting */}
          <ambientLight intensity={0.55} />
          
          {/* Key light: Sculpting muscular anatomy */}
          <directionalLight
            position={[8, 14, 8]}
            intensity={2.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.5}
            shadow-camera-far={30}
            shadow-bias={-0.0001}
          />

          {/* Champagne gold rim light */}
          <directionalLight
            position={[-8, 10, -6]}
            intensity={2.0}
            color="#e5c378"
          />

          {/* Soft fill light from front */}
          <directionalLight
            position={[0, 4, 10]}
            intensity={0.7}
            color="#9bb3c8"
          />

          {/* Drei Environment for realistic reflections */}
          <Environment preset="city" environmentIntensity={0.6} />

          {/* Ground Contact Shadows */}
          <ContactShadows
            position={[0, -1.06, 0]}
            opacity={0.7}
            scale={12}
            blur={2.2}
            far={4.5}
            color="#000000"
          />

          <LuxuryPodium />
          <Horse3D />
          <CameraRig />
        </Canvas>
      </Suspense>
    </div>
  );
}
