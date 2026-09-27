'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Award, Compass, Sun } from 'lucide-react';
import { soundFx } from '@/utils/sound';
import { useHorseStore } from '@/store/useHorseStore';

export function SplitHeroSection() {
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  const scrollTo3D = () => {
    soundFx.playClick();
    const el = document.getElementById('anatomy-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#faf7f2] pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: Topographic Dark Textured Card with Orbital Ring        */}
          {/* ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative rounded-[2.5rem] bg-[#141416] p-6 sm:p-8 text-white overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Topographic Contour Lines SVG Background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="topo-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path
                      d="M0 40 Q30 10 60 40 T120 40 M0 80 Q30 50 60 80 T120 80 M0 120 Q30 90 60 120 T120 120"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="1.2"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#topo-pattern)" />
              </svg>
            </div>

            {/* Top Tag & Grid Dots */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-serif text-sm tracking-widest uppercase text-amber-300 font-semibold">
                Mazarayat
              </span>
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-amber-400/40" />
                ))}
              </div>
            </div>

            {/* Circular Horse Portal with Golden Orbital Halo (Inspired by reference) */}
            <div className="relative z-10 my-8 flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-[0_0_40px_rgba(212,175,55,0.25)] flex items-center justify-center bg-gradient-to-b from-[#2a241e] to-[#121214]">
                {/* Golden Orbital Ring */}
                <div
                  className="absolute -inset-3 rounded-full border border-amber-400/60 animate-spin"
                  style={{ animationDuration: '24s' }}
                />
                <div
                  className="absolute -inset-1 rounded-full border border-dashed border-amber-300/40 animate-spin"
                  style={{ animationDuration: '18s', animationDirection: 'reverse' }}
                />

                {/* Real Arabian Horse Image / Visual: Parizaad */}
                <img
                  src="/images/horses/horse_white_full.jpg"
                  alt="Parizaad - MAZARAYAT AL ARABIANS"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Trust Proof Pill with Avatars */}
            <div className="relative z-10 flex items-center justify-between p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full border border-amber-400 bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white">
                    👑
                  </div>
                  <div className="w-7 h-7 rounded-full border border-amber-400 bg-stone-700 flex items-center justify-center text-[10px] font-bold text-amber-300">
                    MA
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Royal Heritage</span>
                  <span className="text-[10px] text-zinc-400 block font-light">
                    MAZARAYAT AL ARABIANS Bloodlines
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">4 Champions</span>
            </div>

            {/* Bottom Arched Thumbnail Portraits: Zulfiqar & Lucky */}
            <div className="relative z-10 mt-4 flex items-center gap-2.5">
              <div className="flex-1 h-20 rounded-2xl overflow-hidden border border-white/15 relative group cursor-pointer" onClick={scrollTo3D}>
                <img
                  src="/images/horses/horse_black_night.jpg"
                  alt="Zulfiqar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-mono text-amber-300 font-semibold">Zulfiqar</span>
                </div>
              </div>
              <div className="flex-1 h-20 rounded-2xl overflow-hidden border border-white/15 relative group cursor-pointer" onClick={scrollTo3D}>
                <img
                  src="/images/horses/horse_chestnut_front.jpg"
                  alt="Lucky"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-mono text-amber-300 font-semibold">Lucky</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Modern Editorial Typography & Circular Portals         */}
          {/* ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider font-semibold uppercase bg-amber-500/10 border border-amber-600/30 text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Purity • Lineage • Majesty
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-600">
                <Sun className="w-4 h-4 animate-spin" style={{ animationDuration: '16s' }} />
              </div>
            </div>

            {/* Giant Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#2e261f] tracking-tight leading-[1.08]">
              Horse <span className="inline-block px-3 py-0.5 rounded-2xl bg-[#2e261f] text-white text-3xl sm:text-4xl font-sans align-middle">🐎</span> <br />
              <span className="italic font-light">Sanctuary of</span> <br />
              Pure Arabian Royalty
            </h1>

            <p className="text-sm sm:text-base text-[#6b5845] font-light leading-relaxed max-w-xl">
              Preserving the aristocratic straight Egyptian bloodlines. Discover our supreme world gold champion stallions through real-time 3D anatomical exploration and private treaty reservations.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollTo3D}
                className="px-6 py-3.5 rounded-full bg-[#2e261f] hover:bg-[#1a1511] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explore 3D Stallion Anatomy</span>
              </button>

              <button
                onClick={handleBooking}
                className="px-6 py-3.5 rounded-full border border-[#8a7259]/40 bg-white hover:bg-[#faf6ef] text-[#2e261f] font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Book Private Viewing</span>
                <ArrowUpRight className="w-4 h-4 text-amber-700" />
              </button>
            </div>

            {/* Circular Portrait with Halter */}
            <div className="pt-4 flex items-center gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-lg shrink-0">
                <img
                  src="/images/horses/horse_golden_stand.jpg"
                  alt="Sensation - Arabian Champion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                  Featured Champion Sire
                </span>
                <span className="text-base font-serif font-bold text-[#2e261f] block">
                  Sensation
                </span>
                <p className="text-xs text-[#7d6852] font-light leading-tight mt-0.5">
                  Golden stallion of MAZARAYAT AL ARABIANS with pure desert conformation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
