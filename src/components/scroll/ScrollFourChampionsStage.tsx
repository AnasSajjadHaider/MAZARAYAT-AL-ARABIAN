'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Eye, Calendar } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function ScrollFourChampionsStage() {
  const horses = useHorseStore((state) => state.horses);
  const activeHorseId = useHorseStore((state) => state.activeHorseId);
  const activeHorse = useHorseStore((state) => state.activeHorse);
  const setActiveHorse = useHorseStore((state) => state.setActiveHorse);
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleSelectStallion = (id: string) => {
    soundFx.playChime();
    setActiveHorse(id);
  };

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between py-24 px-4 sm:px-8 lg:px-16 pointer-events-none">
      {/* Top Header */}
      <div className="max-w-xl pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/15 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Stage 03 • Living Legends</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2e261f] tracking-tight">
          The Four Crown Stallions
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#685340] font-light max-w-md leading-relaxed">
          Switch stallions below to witness instant 3D coat color & specular transformations, paired with our authentic farm photographs.
        </p>

        {/* 4 Stallion Selector Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/85 backdrop-blur-md border border-amber-900/15 shadow-sm inline-flex">
          {horses.map((horse) => {
            const isSelected = horse.id === activeHorseId;
            return (
              <button
                key={horse.id}
                onClick={() => handleSelectStallion(horse.id)}
                className={`px-4 py-2 rounded-full text-xs font-serif font-semibold tracking-wider transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#2e261f] text-white shadow-md scale-105'
                    : 'text-[#5e4c3d] hover:text-black hover:bg-amber-100/50'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-black/20 shrink-0 shadow-sm"
                  style={{ backgroundColor: horse.coat.color }}
                />
                <span>{horse.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({horse.arabicName})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stallion Detail Card (Floating on Left Column) */}
      <div className="max-w-sm sm:max-w-md pointer-events-auto my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHorse.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-900/15 shadow-2xl flex flex-col gap-4"
          >
            {/* Real Farm Photo Arched Thumbnail */}
            <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-black/10">
              <img
                src={activeHorse.image}
                alt={activeHorse.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-serif text-amber-300 font-bold border border-amber-400/30">
                {activeHorse.arabicName}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                  {activeHorse.strain}
                </span>
                <span className="text-amber-300 font-bold">{activeHorse.age}</span>
              </div>
            </div>

            {/* Details & CTA */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">
                  {activeHorse.coat.name}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  WAHO Purebred
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-[#2e261f] mt-1">
                {activeHorse.name} • {activeHorse.title}
              </h3>

              <p className="text-xs text-[#6e5843] font-light mt-1.5 leading-relaxed">
                {activeHorse.description}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Stud Treaty</span>
                  <span className="font-serif font-bold text-base text-[#2e261f]">
                    {activeHorse.studFee}
                  </span>
                </div>

                <button
                  onClick={handleBooking}
                  className="px-4 py-2 rounded-full bg-[#2e261f] hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inquire Treaty</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-stone-500 pt-6 border-t border-amber-900/10 pointer-events-auto">
        <span>3D PBR Coat reflects active stallion's real coloration</span>
        <span>Scroll for Arena Cinema & Motion Reels ↓</span>
      </div>
    </section>
  );
}
