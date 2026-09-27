'use client';

import React from 'react';
import { Volume2, VolumeX, Sparkles, Calendar } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function Navbar() {
  const isSoundEnabled = useHorseStore((state) => state.isSoundEnabled);
  const toggleSound = useHorseStore((state) => state.toggleSound);
  const openBookingModal = useHorseStore((state) => state.openBookingModal);
  const horses = useHorseStore((state) => state.horses);
  const activeHorseId = useHorseStore((state) => state.activeHorseId);
  const setActiveHorse = useHorseStore((state) => state.setActiveHorse);

  const handleSoundToggle = () => {
    soundFx.playClick();
    toggleSound();
    soundFx.toggleAmbient(!isSoundEnabled);
  };

  const handleBookingClick = () => {
    soundFx.playChime();
    openBookingModal();
  };

  const handleSelectHorse = (id: string) => {
    soundFx.playChime();
    setActiveHorse(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 py-3 md:px-10 md:py-5 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/80 via-black/30 to-transparent">
      {/* Brand & Crest */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-amber-500/40 bg-black/70 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.15)] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
        <div>
          <span className="font-serif tracking-[0.2em] text-xs md:text-sm font-semibold text-white uppercase block leading-none">
            Mazarayat Al Arabian
          </span>
          <span className="text-[9px] md:text-[10px] font-light text-amber-200/60 tracking-[0.2em] font-serif block mt-0.5">
            مزارع العَرَبيَّة
          </span>
        </div>
      </div>

      {/* Center Stallion Switcher Pills (Desktop) */}
      <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-auto">
        {horses.map((horse) => {
          const isSelected = horse.id === activeHorseId;
          return (
            <button
              key={horse.id}
              onClick={() => handleSelectHorse(horse.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500/20 border border-amber-400/80 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: horse.coat.color }}
              />
              <span>{horse.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
        {/* Ambient Audio Toggle */}
        <button
          onClick={handleSoundToggle}
          className="p-2 md:px-3 md:py-1.5 rounded-full border border-zinc-800 bg-black/60 backdrop-blur-md text-zinc-300 hover:text-amber-300 hover:border-amber-500/40 transition-all flex items-center gap-2 text-xs"
          title="Toggle Desert Ambience"
          aria-label="Toggle Desert Ambience"
        >
          {isSoundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
          )}
        </button>

        {/* VIP Booking CTA */}
        <button
          onClick={handleBookingClick}
          className="relative group px-4 py-1.5 md:px-5 md:py-2 rounded-full overflow-hidden bg-gradient-to-r from-amber-500/90 via-amber-400 to-amber-600 text-black font-semibold text-[11px] md:text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-black" />
            <span className="hidden sm:inline">Book Private Viewing</span>
            <span className="sm:hidden">VIP View</span>
          </span>
        </button>
      </div>
    </header>
  );
}
