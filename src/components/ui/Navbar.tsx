'use client';

import React from 'react';
import { Volume2, VolumeX, Sparkles, Calendar } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function Navbar() {
  const isSoundEnabled = useHorseStore((state) => state.isSoundEnabled);
  const toggleSound = useHorseStore((state) => state.toggleSound);
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleSoundToggle = () => {
    soundFx.playClick();
    toggleSound();
    soundFx.toggleAmbient(!isSoundEnabled);
  };

  const handleBookingClick = () => {
    soundFx.playChime();
    openBookingModal();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-5 md:px-12 flex items-center justify-between pointer-events-none">
      {/* Brand & Crest */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-[0.25em] text-sm md:text-base font-semibold text-white uppercase drop-shadow-md">
              Mazarayat Al Arabian
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full">
              Royal Stud
            </span>
          </div>
          <p className="text-[11px] font-light text-amber-200/60 tracking-[0.2em] font-serif">
            مزارع العَرَبيَّة الأصيلة • Est. 1984
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Ambient Audio Toggle */}
        <button
          onClick={handleSoundToggle}
          className="relative px-3.5 py-2 rounded-full border border-zinc-800 bg-black/50 backdrop-blur-md text-zinc-300 hover:text-amber-300 hover:border-amber-500/40 transition-all flex items-center gap-2 text-xs"
          title="Toggle Desert Ambience"
        >
          {isSoundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline text-[11px] tracking-wider text-amber-300 uppercase">
                Atmosphere On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline text-[11px] tracking-wider text-zinc-400 uppercase">
                Atmosphere Off
              </span>
            </>
          )}
        </button>

        {/* VIP Booking CTA */}
        <button
          onClick={handleBookingClick}
          className="relative group px-5 py-2 rounded-full overflow-hidden bg-gradient-to-r from-amber-500/90 via-amber-400 to-amber-600 text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-black" />
            <span>Book Private Viewing</span>
          </span>
        </button>
      </div>
    </header>
  );
}
