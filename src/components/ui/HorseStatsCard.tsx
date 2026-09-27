'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Award, Shield, Eye, Play, Pause, ChevronRight } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';
import { AnimationState, CameraViewPreset } from '@/types/horse';

export function HorseStatsCard() {
  const activeHorse = useHorseStore((state) => state.activeHorse);
  const currentAnimation = useHorseStore((state) => state.currentAnimation);
  const setAnimation = useHorseStore((state) => state.setAnimation);
  const cameraPreset = useHorseStore((state) => state.cameraPreset);
  const setCameraPreset = useHorseStore((state) => state.setCameraPreset);
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleAnimationChange = (anim: AnimationState) => {
    soundFx.playClick();
    setAnimation(anim);
  };

  const handleCameraChange = (preset: CameraViewPreset) => {
    soundFx.playClick();
    setCameraPreset(preset);
  };

  return (
    <div className="fixed right-4 md:right-8 bottom-6 md:bottom-8 z-30 w-full max-w-[360px] sm:max-w-[400px] pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHorse.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto rounded-3xl bg-black/75 backdrop-blur-2xl border border-amber-500/25 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white relative overflow-hidden"
        >
          {/* Subtle gold radial ambient corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Info */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-amber-400/90 font-serif">
                {activeHorse.strain}
              </span>
              <span className="text-sm font-serif text-amber-300/80">
                {activeHorse.arabicName}
              </span>
            </div>

            <h1 className="text-2xl font-serif font-bold text-white mt-1 tracking-wide">
              {activeHorse.name}
            </h1>
            <p className="text-xs text-zinc-400 font-light mt-0.5 line-clamp-1">
              {activeHorse.title}
            </p>
          </div>

          {/* Lineage & Key Pedigree Badge */}
          <div className="mt-3.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium mb-0.5">
              <Award className="w-3.5 h-3.5" />
              <span>Royal Lineage</span>
            </div>
            <p className="text-zinc-400 font-light text-[10.5px] leading-relaxed">
              {activeHorse.lineage}
            </p>
          </div>

          {/* Animated Telemetry Stats */}
          <div className="mt-4 space-y-2.5">
            {/* Speed Bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Speed & Burst
                </span>
                <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.speed}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800/90 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeHorse.stats.speed}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              </div>
            </div>

            {/* Stamina Bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  Stamina & Lung Capacity
                </span>
                <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.stamina}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800/90 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeHorse.stats.stamina}%` }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              </div>
            </div>

            {/* Bloodline Purity Bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Bloodline Purity
                </span>
                <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.purity}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800/90 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeHorse.stats.purity}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-white rounded-full shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                />
              </div>
            </div>

            {/* Temperament Bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Temperament & Nobility
                </span>
                <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.temperament}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800/90 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeHorse.stats.temperament}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Action Gaits Controls: Idle | Trot | Gallop */}
          <div className="mt-4 pt-3.5 border-t border-zinc-800/80">
            <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-medium block mb-2">
              Motion Gaits
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['idle', 'trot', 'gallop'] as AnimationState[]).map((action) => {
                const isActive = currentAnimation === action;
                return (
                  <button
                    key={action}
                    onClick={() => handleAnimationChange(action)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {action === 'idle' ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    <span>{action}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Camera View Presets */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-medium">
              Camera View
            </span>
            <div className="flex gap-1.5">
              {(['full', 'head', 'motion'] as CameraViewPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleCameraChange(preset)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all border ${
                    cameraPreset === preset
                      ? 'bg-amber-400/20 border-amber-400/80 text-amber-300'
                      : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Stud Reserve & Schedule CTA */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
                Stud Standing
              </span>
              <span className="text-xs font-semibold text-amber-300">
                {activeHorse.studFee}
              </span>
            </div>
            <button
              onClick={() => {
                soundFx.playChime();
                openBookingModal();
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-500 text-amber-300 text-xs font-medium flex items-center gap-1 hover:bg-amber-500/20 transition-all"
            >
              <span>Private Viewing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
