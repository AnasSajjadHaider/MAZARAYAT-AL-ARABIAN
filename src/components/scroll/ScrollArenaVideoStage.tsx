'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Play, Shield } from 'lucide-react';

export function ScrollArenaVideoStage() {
  const reels = [
    {
      id: 'reel-1',
      title: 'Night Arena Presentation',
      arabic: 'عرض الساحة الليلي',
      horses: 'Parizaad & Zulfiqar',
      src: '/videos/video1.mp4',
      poster: '/images/horses/horse_white_full.jpg',
      badge: '4K Stadium Lights',
      desc: 'High-energy gait and dramatic snort-and-blow under illuminated competition conditions.',
    },
    {
      id: 'reel-2',
      title: 'Championship Cadence & Conformation',
      arabic: 'إيقاع البطولة والتكوين',
      horses: 'Lucky & Sensation',
      src: '/videos/video2.mp4',
      poster: '/images/horses/horse_golden_stand.jpg',
      badge: '4K Pure Turf',
      desc: 'Athletic shoulder flexion, high-set tail carriage, and golden symmetry across the green paddock.',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between py-24 px-4 sm:px-8 lg:px-16 pointer-events-none">
      {/* Top Header */}
      <div className="max-w-xl pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/15 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold mb-3">
          <Film className="w-3.5 h-3.5 text-amber-600" />
          <span>Stage 04 • Arena Motion Reels</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2e261f] tracking-tight">
          Stallions in Motion
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#685340] font-light max-w-md leading-relaxed">
          The true majesty of an Arabian horse reveals itself in motion. Watch the 2 official video reels captured at the Mazarayat Al Arabian estate.
        </p>
      </div>

      {/* 2 Video Cards Grid (Positioned in foreground left-center) */}
      <div className="max-w-3xl pointer-events-auto my-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {reels.map((reel) => (
          <motion.div
            key={reel.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-amber-900/15 shadow-xl flex flex-col justify-between"
          >
            {/* Video Player */}
            <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
              <video
                src={reel.src}
                poster={reel.poster}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-amber-300 font-semibold border border-amber-400/30 pointer-events-none">
                {reel.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-800 font-semibold mb-1">
                <span>{reel.horses.toUpperCase()}</span>
                <span>{reel.arabic}</span>
              </div>

              <h4 className="font-serif font-bold text-base text-[#2e261f]">
                {reel.title}
              </h4>

              <p className="text-[11px] text-[#786350] font-light mt-1 leading-relaxed">
                {reel.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-stone-500 pt-6 border-t border-amber-900/10 pointer-events-auto">
        <span>High-definition video streams directly from /public/videos/</span>
        <span>Scroll to VIP Concierge & Treaty Reservation ↓</span>
      </div>
    </section>
  );
}
