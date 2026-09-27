'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function HorseSelector() {
  const horses = useHorseStore((state) => state.horses);
  const activeHorseId = useHorseStore((state) => state.activeHorseId);
  const setActiveHorse = useHorseStore((state) => state.setActiveHorse);

  const handleSelect = (id: string) => {
    soundFx.playChime();
    setActiveHorse(id);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW: Floating Left Dock                                      */}
      {/* ========================================================================= */}
      <div className="hidden md:block fixed bottom-8 left-6 lg:left-10 z-30 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-amber-300/80 font-serif">
            Select Stallion • نخبة الخيول
          </span>

          <div className="flex flex-col gap-2">
            {horses.map((horse) => {
              const isSelected = horse.id === activeHorseId;
              return (
                <motion.button
                  key={horse.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(horse.id)}
                  className={`relative px-4 py-2.5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 backdrop-blur-xl ${
                    isSelected
                      ? 'bg-black/80 border-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.3)]'
                      : 'bg-black/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {/* Coat preview dot */}
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-inner"
                    style={{ backgroundColor: horse.coat.color }}
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-serif font-semibold tracking-wide ${
                          isSelected ? 'text-white' : 'text-zinc-300'
                        }`}
                      >
                        {horse.name}
                      </span>
                      <span className="text-[10px] text-amber-400/80 font-serif">
                        {horse.arabicName}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                      {horse.strain.split(' ')[0]}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="active-indicator-desktop"
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-amber-400 rounded-r-full shadow-[0_0_8px_#d4af37]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: Horizontal Top Carousel Under Navbar                     */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed top-16 left-0 w-full z-30 px-3 py-1 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {horses.map((horse) => {
            const isSelected = horse.id === activeHorseId;
            return (
              <button
                key={horse.id}
                onClick={() => handleSelect(horse.id)}
                className={`relative shrink-0 px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 backdrop-blur-xl transition-all ${
                  isSelected
                    ? 'bg-black/90 border-amber-400 text-white shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-black/50 border-zinc-800 text-zinc-400'
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: horse.coat.color }}
                />
                <span className="font-serif font-medium text-[11px] whitespace-nowrap">
                  {horse.name}
                </span>
                <span className="text-[9px] text-amber-400/80 font-serif">
                  {horse.arabicName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
