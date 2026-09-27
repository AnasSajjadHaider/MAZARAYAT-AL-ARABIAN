'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Activity,
  Award,
  Shield,
  Play,
  Pause,
  X,
  Sliders,
  ChevronRight,
} from 'lucide-react';
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

  // Specifications drawer open/close
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAnimationChange = (anim: AnimationState) => {
    soundFx.playClick();
    setAnimation(anim);
  };

  const handleCameraChange = (preset: CameraViewPreset) => {
    soundFx.playClick();
    setCameraPreset(preset);
  };

  const toggleDrawer = () => {
    soundFx.playClick();
    setIsDrawerOpen((prev) => !prev);
  };

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* MINIMAL BOTTOM FLOATING DOCK (Ultra-Clean, 0% Newspaper Clutter)         */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-2xl pointer-events-none">
        <div className="pointer-events-auto rounded-full bg-black/75 backdrop-blur-2xl border border-white/10 px-4 py-2.5 sm:px-6 sm:py-3 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 text-white">
          {/* Active Stallion Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-3 h-3 rounded-full border border-white/20 shrink-0"
              style={{ backgroundColor: activeHorse.coat.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm tracking-wide text-white">
                  {activeHorse.name}
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 block font-mono">
                {activeHorse.strain.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Gaits Controller: [Idle] [Trot] [Gallop] */}
          <div className="flex items-center gap-1 bg-zinc-900/90 rounded-full p-1 border border-zinc-800 shrink-0">
            {(['idle', 'trot', 'gallop'] as AnimationState[]).map((action) => {
              const isActive = currentAnimation === action;
              return (
                <button
                  key={action}
                  onClick={() => handleAnimationChange(action)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-500/25 border border-amber-400/80 text-amber-200 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                      : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  {action === 'idle' ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                  <span>{action}</span>
                </button>
              );
            })}
          </div>

          {/* Toggle Specifications Button */}
          <button
            onClick={toggleDrawer}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider flex items-center gap-1.5 transition-all shrink-0 border ${
              isDrawerOpen
                ? 'bg-amber-400 text-black border-amber-400'
                : 'bg-white/5 border-white/10 hover:border-amber-400/50 text-zinc-300 hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span className="hidden sm:inline">Specifications</span>
            <span className="sm:hidden">Specs</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SLIDE-OUT SPECIFICATIONS DRAWER (Only visible when requested)            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md pointer-events-none p-4 sm:p-6 flex flex-col justify-end sm:justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto w-full rounded-3xl bg-[#0c0c0e]/95 backdrop-blur-2xl border border-amber-500/30 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-white relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] tracking-[0.25em] font-serif uppercase text-amber-400">
                    Lineage & Telemetry
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                    {activeHorse.name}
                  </h3>
                </div>
                <button
                  onClick={toggleDrawer}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lineage */}
              <p className="text-xs text-zinc-400 font-light mt-3 leading-relaxed">
                {activeHorse.lineage}
              </p>

              {/* Telemetry Stats Bars */}
              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Speed & Burst
                    </span>
                    <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.speed}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full"
                      style={{ width: `${activeHorse.stats.speed}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-amber-400" /> Stamina
                    </span>
                    <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.stamina}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full"
                      style={{ width: `${activeHorse.stats.stamina}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" /> Bloodline Purity
                    </span>
                    <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.purity}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-white rounded-full"
                      style={{ width: `${activeHorse.stats.purity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-400" /> Nobility
                    </span>
                    <span className="font-mono text-amber-300 font-semibold">{activeHorse.stats.temperament}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full"
                      style={{ width: `${activeHorse.stats.temperament}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Camera Presets */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-mono">
                  Perspective
                </span>
                <div className="flex gap-1.5">
                  {(['full', 'head', 'motion'] as CameraViewPreset[]).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleCameraChange(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono ${
                        cameraPreset === preset
                          ? 'bg-amber-400/20 border border-amber-400/80 text-amber-300'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stud Fee & Booking Action */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                    Stud Standing
                  </span>
                  <span className="text-xs font-semibold text-amber-300">
                    {activeHorse.studFee}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    handleBooking();
                  }}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                  <span>Book Viewing</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
