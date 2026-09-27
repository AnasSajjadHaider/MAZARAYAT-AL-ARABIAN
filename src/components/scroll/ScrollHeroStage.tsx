'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, ArrowUpRight, Crown } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function ScrollHeroStage() {
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  const handleScrollDown = () => {
    soundFx.playClick();
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 lg:px-16 pointer-events-none">
      {/* Top Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/15 shadow-sm text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold mb-4">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>Mazarayat Al Arabian • مزارع العَرَبيَّة</span>
        </div>

        {/* Giant Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-[#2e261f] tracking-tight leading-[1.06]">
          Horse <span className="inline-block px-3 py-0.5 rounded-2xl bg-[#2e261f] text-white text-3xl sm:text-5xl font-sans align-middle shadow-md">🐎</span> <br />
          <span className="italic font-light">Dynasty of</span> <br />
          Pure Arabian Royalty
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#685340] font-light max-w-lg leading-relaxed">
          Home to supreme world gold champion Straight Egyptian & Bedouin stallions. Experience our living legends in continuous 3D motion as you explore our royal sanctuary.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={handleScrollDown}
            className="px-6 py-3.5 rounded-full bg-[#2e261f] hover:bg-[#1a1410] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Scroll To Explore</span>
            <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
          </button>

          <button
            onClick={handleBooking}
            className="px-6 py-3.5 rounded-full border border-amber-900/20 bg-white/90 hover:bg-white text-[#2e261f] font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Book Private Treaty</span>
            <ArrowUpRight className="w-4 h-4 text-amber-700" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Trust & Scroll Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-amber-900/10 pointer-events-auto"
      >
        <div className="flex items-center gap-6 text-xs font-mono text-[#786350]">
          <span className="flex items-center gap-1.5 font-semibold text-[#2e261f]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            40+ Yrs Heritage
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">100% WAHO Registered</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">The Four Crown Stallions</span>
        </div>

        <button
          onClick={handleScrollDown}
          className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-800 hover:text-black font-semibold transition-colors"
        >
          <span>Scroll to Inspect Conformation</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
