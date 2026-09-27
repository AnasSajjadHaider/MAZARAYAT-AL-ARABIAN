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
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Camera,
  Sliders,
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

  // Mobile drawer expanded / collapsed state
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const handleAnimationChange = (anim: AnimationState) => {
    soundFx.playClick();
    setAnimation(anim);
  };

  const handleCameraChange = (preset: CameraViewPreset) => {
    soundFx.playClick();
    setCameraPreset(preset);
  };

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW (Visible on md and above)                                */}
      {/* ========================================================================= */}
      <div className="hidden md:block fixed right-6 lg:right-10 bottom-8 z-30 w-full max-w-[380px] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHorse.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto rounded-3xl bg-black/80 backdrop-blur-2xl border border-amber-500/25 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white relative overflow-hidden"
          >
            {/* Subtle gold radial ambient corner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Info */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-amber-400 font-serif">
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
            <div className="mt-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300">
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
                      {action === 'idle' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
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
                onClick={handleBooking}
                className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-500 text-amber-300 text-xs font-medium flex items-center gap-1 hover:bg-amber-500/20 transition-all"
              >
                <span>Private Viewing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: BOTTOM SHEET & QUICK DOCK (Visible on < md)               */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-30 pointer-events-none">
        {/* Collapsed Mini HUD Dock */}
        {!isMobileExpanded && (
          <div className="p-3 pointer-events-auto bg-gradient-to-t from-black via-black/90 to-transparent">
            <div className="rounded-2xl bg-black/85 backdrop-blur-xl border border-amber-500/30 p-3.5 shadow-2xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-bold text-white">
                    {activeHorse.name}
                  </span>
                  <span className="text-[10px] text-amber-400 font-serif">
                    {activeHorse.arabicName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase font-mono text-zinc-400">
                    {activeHorse.strain.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-amber-300 font-medium">
                    • {activeHorse.stats.speed}% Speed
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Quick Gait Cycle Button */}
                <div className="flex bg-zinc-900/90 rounded-xl p-0.5 border border-zinc-800">
                  {(['idle', 'trot', 'gallop'] as AnimationState[]).map((action) => (
                    <button
                      key={action}
                      onClick={() => handleAnimationChange(action)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium uppercase ${
                        currentAnimation === action
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                          : 'text-zinc-500'
                      }`}
                    >
                      {action.slice(0, 1).toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Expand Sheet Button */}
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setIsMobileExpanded(true);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1 text-[11px] font-medium"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Stats</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Full Mobile Drawer */}
        <AnimatePresence>
          {isMobileExpanded && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="pointer-events-auto rounded-t-3xl bg-[#0c0c0e]/95 backdrop-blur-2xl border-t border-x border-amber-500/30 p-5 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] max-h-[82vh] overflow-y-auto"
            >
              {/* Swipe / Drag Handle Indicator */}
              <div
                onClick={() => setIsMobileExpanded(false)}
                className="w-full flex flex-col items-center justify-center cursor-pointer mb-3"
              >
                <div className="w-12 h-1.5 rounded-full bg-zinc-700 hover:bg-amber-400 transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1 flex items-center gap-1">
                  Tap to minimize <ChevronDown className="w-3 h-3" />
                </span>
              </div>

              {/* Title Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-amber-400">
                    {activeHorse.strain}
                  </span>
                  <h2 className="text-xl font-serif font-bold text-white">
                    {activeHorse.name} ({activeHorse.arabicName})
                  </h2>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">
                    {activeHorse.title}
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileExpanded(false)}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Lineage */}
              <div className="my-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px]">
                <span className="text-amber-300 font-medium block mb-0.5">Pedigree Lineage</span>
                <span className="text-zinc-400 leading-tight">{activeHorse.lineage}</span>
              </div>

              {/* Stats Bars */}
              <div className="space-y-2.5 my-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Speed & Burst
                    </span>
                    <span className="font-mono text-amber-300">{activeHorse.stats.speed}%</span>
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
                    <span className="font-mono text-amber-300">{activeHorse.stats.stamina}%</span>
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
                    <span className="font-mono text-amber-300">{activeHorse.stats.purity}%</span>
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
                      <Shield className="w-3.5 h-3.5 text-amber-400" /> Temperament
                    </span>
                    <span className="font-mono text-amber-300">{activeHorse.stats.temperament}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full"
                      style={{ width: `${activeHorse.stats.temperament}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Motion Gaits */}
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium block mb-1.5">
                  Motion Gaits
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['idle', 'trot', 'gallop'] as AnimationState[]).map((action) => {
                    const isActive = currentAnimation === action;
                    return (
                      <button
                        key={action}
                        onClick={() => handleAnimationChange(action)}
                        className={`py-2 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 border ${
                          isActive
                            ? 'bg-amber-500/25 border-amber-400 text-amber-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {action === 'idle' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>{action}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Camera Angles */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Camera
                </span>
                <div className="flex gap-1.5">
                  {(['full', 'head', 'motion'] as CameraViewPreset[]).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleCameraChange(preset)}
                      className={`px-3 py-1 rounded-lg text-[10px] uppercase font-mono ${
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

              {/* Mobile Bottom Booking CTA */}
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
                    setIsMobileExpanded(false);
                    handleBooking();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-1.5"
                >
                  <span>Book Private Viewing</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
