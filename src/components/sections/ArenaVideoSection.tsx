'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Film, Maximize2, ShieldCheck } from 'lucide-react';
import { soundFx } from '@/utils/sound';

export function ArenaVideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoReels = [
    {
      id: 'reel-1',
      title: 'Night Arena Presentation',
      arabicTitle: 'عرض الساحة الليلي',
      horse: 'Parizaad & Zulfiqar',
      duration: '4K Ultra-HD',
      thumbnail: '/images/horses/horse_white_full.jpg',
      src: '/videos/video1.mp4',
      description:
        'Majestic nighttime gait showcase under full stadium lights, exhibiting world-class Arabian snort-and-blow and tail carriage.',
    },
    {
      id: 'reel-2',
      title: 'Championship Cadence & Conformation',
      arabicTitle: 'إيقاع البطولة والتكوين',
      horse: 'Lucky & Sensation',
      duration: '4K Ultra-HD',
      thumbnail: '/images/horses/horse_golden_stand.jpg',
      src: '/videos/video2.mp4',
      description:
        'Athletic stride analysis, trotting balance, and muscular symmetry captured across the pristine greens of Mazarayat Al Arabian.',
    },
  ];

  const handlePlayVideo = (src: string) => {
    soundFx.playChime();
    setActiveVideo(src);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#141416] text-white overflow-hidden">
      {/* Topographic Lines Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cinema-topo" width="160" height="160" patternUnits="userSpaceOnUse">
              <path
                d="M0 60 Q40 20 80 60 T160 60 M0 110 Q40 70 80 110 T160 110"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cinema-topo)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Film className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
              Arena Action Cinema
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white tracking-tight">
            Championship Motion Reels
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
            Witness the raw power, explosive gallop, and timeless Arabian grace in motion at the private arenas of Mazarayat Al Arabian.
          </p>
        </div>

        {/* 2 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoReels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 shadow-2xl flex flex-col justify-between group"
            >
              {/* Video Thumbnail / Player Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                <video
                  src={reel.src}
                  poster={reel.thumbnail}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-amber-400 font-semibold border border-amber-400/30">
                    {reel.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-serif text-white">
                    {reel.arabicTitle}
                  </span>
                </div>
              </div>

              {/* Meta Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-amber-400/80 font-mono mb-1">
                  <span>FEATURING {reel.horse.toUpperCase()}</span>
                  <span>MAZARAYAT ARCHIVE</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                  {reel.title}
                </h3>

                <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                  {reel.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
