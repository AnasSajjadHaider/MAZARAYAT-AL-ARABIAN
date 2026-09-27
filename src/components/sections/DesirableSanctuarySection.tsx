'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Sun, Compass, Shield, Heart } from 'lucide-react';

export function DesirableSanctuarySection() {
  return (
    <section className="relative w-full py-20 bg-[#121214] text-white overflow-hidden">
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dark-topo" width="140" height="140" patternUnits="userSpaceOnUse">
              <path
                d="M0 50 Q35 15 70 50 T140 50 M0 95 Q35 60 70 95 T140 95 M0 140 Q35 105 70 140 T140 140"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dark-topo)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Playful Floating Avatar Stickers (Inspired by reference) */}
        <div className="relative mb-6 flex justify-center items-center gap-8 sm:gap-16">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -6 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400/80 overflow-hidden shadow-lg p-0.5 bg-gradient-to-tr from-amber-600 to-amber-300"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
              alt="Equestrian Rider"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>

          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
            <Crown className="w-6 h-6 animate-pulse" />
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400/80 overflow-hidden shadow-lg p-0.5 bg-gradient-to-tr from-amber-600 to-amber-300"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Stud Master"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight">
          The most desirable place for Arabian royalty & breeders
        </h2>

        <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
          Where pure desert heritage meets state-of-the-art breeding science, climate-controlled stables, and personalized VIP concierge.
        </p>

        {/* Floating Bento Pill Card (Matching Reference Screenshot) */}
        <div className="mt-12 max-w-3xl mx-auto rounded-3xl bg-white text-[#2e261f] p-6 sm:p-8 shadow-2xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 text-2xl font-serif font-bold shrink-0">
              🐎
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-base text-[#2e261f] block tracking-wide">
                MAZARAYAT AL ARABIANS
              </span>
              <span className="text-xs text-[#7d6852] font-mono">
                Official WAHO & Straight Egyptian Registry
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-left">
            <div className="border-l-2 border-amber-500/40 pl-3">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Stallions</span>
              <span className="text-sm font-bold text-[#2e261f]">18 Champions</span>
            </div>
            <div className="border-l-2 border-amber-500/40 pl-3">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Lineage</span>
              <span className="text-sm font-bold text-[#2e261f]">100% Purity</span>
            </div>
            <div className="border-l-2 border-amber-500/40 pl-3">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Acreage</span>
              <span className="text-sm font-bold text-[#2e261f]">250 Hectares</span>
            </div>
            <div className="border-l-2 border-amber-500/40 pl-3">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Treaties</span>
              <span className="text-sm font-bold text-[#2e261f]">Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
