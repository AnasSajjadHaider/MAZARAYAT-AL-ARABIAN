'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import HorseCanvasDynamic from '@/components/canvas/HorseCanvasDynamic';
import { Navbar } from '@/components/ui/Navbar';
import { HorseStatsCard } from '@/components/ui/HorseStatsCard';
import { HorseSelector } from '@/components/ui/HorseSelector';
import { BookingModal } from '@/components/ui/BookingModal';
import { useHorseStore } from '@/store/useHorseStore';

export default function Home() {
  const activeHorse = useHorseStore((state) => state.activeHorse);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#070709]">
      {/* Top Luxury Navigation */}
      <Navbar />

      {/* 3D WebGL Canvas Layer (Persistent Background) */}
      <div className="absolute inset-0 z-0">
        <HorseCanvasDynamic />
      </div>

      {/* Narrative Headline (Top-Left under Navbar) */}
      <div className="fixed top-24 left-6 md:left-12 z-20 pointer-events-none max-w-sm sm:max-w-md hidden sm:block">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300/80">
              The Sovereign Collection
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
            Purity. <br />
            Lineage. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Majesty.
            </span>
          </h2>

          <p className="mt-4 text-xs md:text-sm text-zinc-400 font-light leading-relaxed drop-shadow-md">
            Dedicated to the preservation and global elevation of the purebred Arabian stallion. Every champion is an unbroken living masterpiece of beauty, endurance, and royal heritage.
          </p>

          {/* Interactive Hint */}
          <div className="mt-5 flex items-center gap-2 text-[11px] text-zinc-500 font-mono tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-500/70 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Drag to rotate 360° • Scroll to zoom</span>
          </div>
        </motion.div>
      </div>

      {/* Center Subtle Watermark (Arabic Calligraphy) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-10">
        <span className="font-serif text-[18vw] font-bold text-amber-100 tracking-wider">
          مزارع
        </span>
      </div>

      {/* Horse Selector Dock (Bottom Left) */}
      <HorseSelector />

      {/* 2D Decoupled Telemetry & Stats HUD (Bottom Right) */}
      <HorseStatsCard />

      {/* Cal.com Slot Booking & VIP Concierge Modal */}
      <BookingModal />

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden fixed top-20 left-4 z-20 pointer-events-none">
        <span className="text-[10px] text-amber-400/90 font-mono uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-amber-500/30">
          Touch & Drag to Inspect
        </span>
      </div>
    </main>
  );
}
