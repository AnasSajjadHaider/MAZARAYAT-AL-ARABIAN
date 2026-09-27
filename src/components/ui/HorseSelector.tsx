'use client';

import React from 'react';
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
    // Only visible on mobile/tablet screens (< lg)
    <div className="lg:hidden fixed top-14 left-0 w-full z-30 px-3 py-1 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {horses.map((horse) => {
          const isSelected = horse.id === activeHorseId;
          return (
            <button
              key={horse.id}
              onClick={() => handleSelect(horse.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 backdrop-blur-xl transition-all ${
                isSelected
                  ? 'bg-black/90 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'bg-black/40 border-zinc-800 text-zinc-400'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: horse.coat.color }}
              />
              <span className="font-serif text-[11px] whitespace-nowrap">
                {horse.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
