'use client';

import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { Horse3D } from './Horse3D';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';
import { Play, Pause, RotateCw, Sparkles } from 'lucide-react';
import { AnimationState } from '@/types/horse';

function Dais() {
  return (
    <group position={[0, -1.06, 0]}>
      {/* Outer gold rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 2.84, 64]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Inner pristine alabaster dais */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.8, 64]} />
        <meshStandardMaterial color="#f0eae0" roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  );
}

export function InteractiveHorseShowcase() {
  const activeHorse = useHorseStore((state) => state.activeHorse);
  const horses = useHorseStore((state) => state.horses);
  const activeHorseId = useHorseStore((state) => state.activeHorseId);
  const setActiveHorse = useHorseStore((state) => state.setActiveHorse);
  const currentAnimation = useHorseStore((state) => state.currentAnimation);
  const setAnimation = useHorseStore((state) => state.setAnimation);
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleSelectStallion = (id: string) => {
    soundFx.playChime();
    setActiveHorse(id);
  };

  const handleAnimation = (anim: AnimationState) => {
    soundFx.playClick();
    setAnimation(anim);
  };

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#f9f7f4] via-[#f2ece2] to-[#e8dec8] border border-amber-900/10 shadow-xl flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar inside 3D Container */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 font-bold">
              3D Stallion Showroom
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 font-medium">
              360° Touch View
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2e261f] mt-0.5">
            {activeHorse.name} ({activeHorse.arabicName})
          </h3>
          <span className="text-xs text-stone-600 font-light block">
            {activeHorse.strain} • {activeHorse.title}
          </span>
        </div>

        {/* Stallion Switcher Tabs */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/15 shadow-sm">
          {horses.map((horse) => {
            const isSelected = horse.id === activeHorseId;
            return (
              <button
                key={horse.id}
                onClick={() => handleSelectStallion(horse.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#2e261f] text-white shadow-sm'
                    : 'text-[#6e5843] hover:text-[#2e261f]'
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: horse.coat.color }}
                />
                <span>{horse.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D WebGL Canvas Layer (Clean, 100% unobstructed, No Pointers) */}
      <div className="absolute inset-0 z-0 touch-none">
        <Canvas
          shadows
          camera={{ position: [4.8, 1.8, 6.4], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full touch-none"
        >
          <ambientLight intensity={0.8} color="#fff8f0" />
          <directionalLight
            position={[10, 16, 8]}
            intensity={2.6}
            color="#fffdf7"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-8, 10, -6]} intensity={1.6} color="#e5c378" />
          <Environment preset="city" environmentIntensity={0.65} />

          <ContactShadows
            position={[0, -1.06, 0]}
            opacity={0.6}
            scale={10}
            blur={2.2}
            far={4.0}
            color="#3a2e24"
          />

          <Dais />
          <Horse3D />

          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            minDistance={3.5}
            maxDistance={8.5}
            minPolarAngle={Math.PI / 4.5}
            maxPolarAngle={Math.PI / 2 - 0.05}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
          />
        </Canvas>
      </div>

      {/* Bottom Floating Control Dock */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none mt-auto">
        {/* Gaits Pill: [Idle] [Trot] [Gallop] */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-white/85 backdrop-blur-md border border-amber-900/15 shadow-sm">
          <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 px-2 font-medium">
            Gait:
          </span>
          {(['idle', 'trot', 'gallop'] as AnimationState[]).map((action) => {
            const isActive = currentAnimation === action;
            return (
              <button
                key={action}
                onClick={() => handleAnimation(action)}
                className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-900 border border-amber-500/60 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 border border-transparent'
                }`}
              >
                {action === 'idle' ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                <span>{action}</span>
              </button>
            );
          })}
        </div>

        {/* Orbit Hint & Private Viewing CTA */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-stone-500 bg-white/70 px-3 py-1.5 rounded-full border border-stone-200">
            <RotateCw className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Drag to rotate 360°</span>
          </div>

          <button
            onClick={() => {
              soundFx.playChime();
              openBookingModal();
            }}
            className="px-5 py-2 rounded-full bg-[#2e261f] hover:bg-[#1a1511] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Private Treaty</span>
          </button>
        </div>
      </div>
    </div>
  );
}
