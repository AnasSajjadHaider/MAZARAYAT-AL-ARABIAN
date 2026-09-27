'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '@/utils/sound';

export function ScrollHeroStage() {
  const handleDiscoverClick = () => {
    soundFx.playChime();
    window.scrollTo({
      top: window.innerHeight * 0.96,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center pt-24 pb-12 px-4 sm:px-8 select-none pointer-events-none">
      {/* Floating Depth-of-Field Accents (Matching Capsul-in-Pro leaves/particles) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top-Right Floating Leaf / Accent */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 right-[12%] sm:right-[18%] w-14 h-14 sm:w-20 sm:h-20 opacity-75 filter drop-shadow-md"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M10 80 Q50 10 90 20 Q80 70 20 85 Z"
              fill="#4a695d"
              opacity="0.85"
            />
            <path d="M10 80 Q50 45 90 20" stroke="#7ea393" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* Bottom-Left Foreground Blurred Bokeh Leaf */}
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-24 left-[10%] sm:left-[16%] w-20 h-20 sm:w-28 sm:h-28 opacity-65 blur-[2.5px] filter drop-shadow-xl"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M15 85 Q45 15 85 25 Q75 75 25 90 Z"
              fill="#3a5348"
              opacity="0.9"
            />
            <path d="M15 85 Q50 50 85 25" stroke="#608173" strokeWidth="3" />
          </svg>
        </motion.div>

        {/* Mid-Left Subtle Floating Petal */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-[8%] sm:left-[12%] w-10 h-10 opacity-50 blur-[0.8px]"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M20 70 Q50 20 80 30 Q70 70 30 75 Z" fill="#8f7a5c" opacity="0.75" />
          </svg>
        </motion.div>
      </div>

      {/* Spacing top */}
      <div className="h-6" />

      {/* ========================================================================= */}
      {/* CENTERPIECE: Giant Capsul-in-Pro Style Typography                         */}
      {/* (3D Horse floats right in the center between Pure & Royalty)              */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center leading-[0.86] tracking-tight font-serif select-none"
        >
          {/* Top Word: Pure */}
          <span
            className="text-[17vw] sm:text-[14vw] md:text-[13vw] font-black uppercase tracking-tight block text-transparent bg-clip-text bg-gradient-to-b from-[#476357] via-[#5c7a6e] to-[#7f988c] opacity-90 drop-shadow-sm"
            style={{
              textShadow: '0 4px 30px rgba(71, 99, 87, 0.08)',
            }}
          >
            Pure
          </span>

          {/* Spacer for 3D Horse Intersecting Center */}
          <div className="h-16 sm:h-24 md:h-32 w-full" />

          {/* Bottom Word: Royalty */}
          <span
            className="text-[17vw] sm:text-[14vw] md:text-[13vw] font-black uppercase tracking-tight block text-transparent bg-clip-text bg-gradient-to-b from-[#5c7a6e] via-[#758f83] to-[#99aba1] opacity-85 drop-shadow-sm"
            style={{
              textShadow: '0 4px 30px rgba(71, 99, 87, 0.08)',
            }}
          >
            Royalty
          </span>
        </motion.div>

        {/* Minimalist Sub-headline Strip (Matching Capsul-in-Pro center line) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#33463e] font-semibold"
        >
          <span>STRAIGHT EGYPTIAN</span>
          <span className="text-amber-700/60">•</span>
          <span>WAHO REGISTERED</span>
          <span className="text-amber-700/60">•</span>
          <span>4 CROWN CHAMPIONS</span>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM: Iconic Double-Ringed "DISCOVER" Button (Matching Capsul-in-Pro)   */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-20 pointer-events-auto pb-4"
      >
        <button
          onClick={handleDiscoverClick}
          className="group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95"
          aria-label="Discover MAZARAYAT AL ARABIANS"
        >
          {/* Outer Thin Ring */}
          <div
            className="absolute inset-0 rounded-full border border-[#33463e]/25 group-hover:border-[#33463e]/60 transition-colors duration-500 group-hover:animate-spin"
            style={{ animationDuration: '24s' }}
          />

          {/* Inner Secondary Ring */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-[#33463e]/40 group-hover:border-[#33463e]/80 transition-colors duration-500" />

          {/* Text Center */}
          <span className="relative z-10 text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#25352e] group-hover:text-black transition-colors">
            DISCOVER
          </span>
        </button>
      </motion.div>
    </section>
  );
}
