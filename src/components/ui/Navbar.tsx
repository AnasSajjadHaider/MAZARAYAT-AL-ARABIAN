'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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

  const scrollToSection = (id: string) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-5 md:px-12 md:py-7 flex items-center justify-between pointer-events-none">
      {/* Left: Minimalist Rounded MENU Button (Matching Capsul-in-Pro) */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={() => scrollToSection('roster-stage')}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#4a5f56]/30 bg-white/40 hover:bg-white/80 backdrop-blur-md text-[#2e3b35] text-xs font-mono tracking-widest uppercase font-semibold transition-all hover:border-[#2e3b35]/60 shadow-sm"
        >
          <span className="flex flex-col gap-1 w-3.5">
            <span className="w-full h-[1.5px] bg-[#2e3b35] rounded-full" />
            <span className="w-full h-[1.5px] bg-[#2e3b35] rounded-full" />
          </span>
          <span>STALLIONS</span>
        </button>

        {/* Ambient Desert Wind Toggle */}
        <button
          onClick={handleSoundToggle}
          className="w-9 h-9 rounded-full border border-[#4a5f56]/20 bg-white/40 hover:bg-white/80 backdrop-blur-md flex items-center justify-center text-[#2e3b35] transition-all shadow-sm"
          title="Toggle Desert Ambience"
          aria-label="Toggle Desert Ambience"
        >
          {isSoundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>
      </div>

      {/* Center: Iconic Speech Bubble / Shield Logo (Matching Capsul-in-Pro "CI" badge) */}
      <div className="pointer-events-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative group flex items-center justify-center"
        >
          <div className="px-3.5 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#4a5f56]/25 shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <span className="text-sm font-serif font-black tracking-tight text-[#2d4037]">
              MA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          </div>
        </button>
      </div>

      {/* Right: CONTACT US / TREATY (Matching Capsul-in-Pro right header) */}
      <div className="pointer-events-auto">
        <button
          onClick={handleBookingClick}
          className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#2d4037] hover:text-[#18241f] transition-colors py-2 px-1 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#2d4037] hover:after:w-full after:transition-all"
        >
          CONTACT US
        </button>
      </div>
    </header>
  );
}
