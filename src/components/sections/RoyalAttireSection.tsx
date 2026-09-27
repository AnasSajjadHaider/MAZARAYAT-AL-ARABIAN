'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, ShieldCheck, Heart } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function RoyalAttireSection() {
  const horses = useHorseStore((state) => state.horses);
  const activeHorseId = useHorseStore((state) => state.activeHorseId);
  const setActiveHorse = useHorseStore((state) => state.setActiveHorse);
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleSelectAndInspect = (horseId: string) => {
    soundFx.playChime();
    setActiveHorse(horseId);
    const el = document.getElementById('anatomy-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBooking = (e: React.MouseEvent, horseId: string) => {
    e.stopPropagation();
    soundFx.playChime();
    setActiveHorse(horseId);
    openBookingModal();
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-800 font-bold">
                Royal Roster of Champions
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 font-semibold border border-amber-500/30">
                Official Roster ✻
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2e261f] tracking-tight">
              The Four Crown Stallions
            </h2>
            <p className="text-xs sm:text-sm text-[#705c48] font-light mt-1">
              Select any stallion to load their real-time 3D simulation or arrange a private breeding treaty.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              openBookingModal();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-900/20 bg-white hover:bg-amber-50 text-[#2e261f] text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-sm"
          >
            <span>Breeding Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
          </button>
        </div>

        {/* 4 Arched Cards (Matching Reference Editorial Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {horses.map((horse) => {
            const isSelected = horse.id === activeHorseId;

            return (
              <motion.div
                key={horse.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleSelectAndInspect(horse.id)}
                className={`cursor-pointer group rounded-3xl p-4 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white ring-2 ring-amber-500 shadow-2xl scale-[1.02]'
                    : 'bg-white hover:bg-[#fcfaf7] shadow-md hover:shadow-xl border border-amber-900/10'
                }`}
              >
                {/* Arched Top Image Portal */}
                <div className="relative w-full h-64 sm:h-72 rounded-t-full rounded-b-2xl overflow-hidden bg-[#2a241e] mb-4">
                  <img
                    src={horse.image}
                    alt={horse.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono text-amber-300 font-semibold border border-amber-400/30">
                    MAZARAYAT
                  </div>

                  {/* Color Swatch Dot */}
                  <div
                    className="absolute top-4 left-4 w-5 h-5 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: horse.coat.color }}
                    title={horse.coat.name}
                  />

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                      {horse.strain}
                    </span>
                    <span className="text-amber-300 font-bold">{horse.age}</span>
                  </div>
                </div>

                {/* Horse Metadata */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold">
                      {horse.coat.name}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      100% Purity
                    </span>
                  </div>

                  <h3 className="font-serif font-extrabold text-xl text-[#2e261f] mt-1 group-hover:text-amber-800 transition-colors">
                    {horse.name}
                  </h3>

                  <p className="text-xs text-[#6e5843] font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {horse.description}
                  </p>
                </div>

                {/* Interactive Footer & Actions */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSelectAndInspect(horse.id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-amber-800 font-bold hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in 3D</span>
                  </button>

                  <button
                    onClick={(e) => handleBooking(e, horse.id)}
                    className="px-3.5 py-1.5 rounded-full bg-[#2e261f] group-hover:bg-amber-700 text-white text-[11px] font-mono font-semibold transition-all shadow-sm"
                  >
                    Inquire Treaty
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
