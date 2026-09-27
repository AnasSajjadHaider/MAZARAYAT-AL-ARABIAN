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
    <div className="fixed bottom-6 left-4 md:left-12 z-30 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-2.5">
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-amber-300/80 font-serif">
          Select Stallion • نخبة الخيول
        </span>

        <div className="flex flex-row md:flex-col gap-2">
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

                <div className="hidden sm:block">
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

                {/* Mobile condensed label */}
                <span className="sm:hidden text-xs font-serif font-medium text-white">
                  {horse.name.split(' ')[0]}
                </span>

                {isSelected && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-amber-400 rounded-r-full shadow-[0_0_8px_#d4af37]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
