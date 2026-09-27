'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { CapsuleCanvasDynamic } from '@/components/canvas/CapsuleCanvasDynamic';
import { ScrollHeroStage } from '@/components/scroll/ScrollHeroStage';
import { ScrollConformationStage } from '@/components/scroll/ScrollConformationStage';
import { ScrollFourChampionsStage } from '@/components/scroll/ScrollFourChampionsStage';
import { ScrollArenaVideoStage } from '@/components/scroll/ScrollArenaVideoStage';
import { ScrollSanctuaryFooterStage } from '@/components/scroll/ScrollSanctuaryFooterStage';
import { BookingModal } from '@/components/ui/BookingModal';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#faf7f2] via-[#f6f1e8] to-[#f2e9dc] text-[#2e261f] overflow-x-hidden selection:bg-[#d4af37] selection:text-white">
      {/* 1. Fixed Header Navigation */}
      <Navbar />

      {/* 2. Fullscreen Capsul-in-Pro Style 3D Scroll Canvas */}
      <CapsuleCanvasDynamic />

      {/* 3. Subtle Luxury Topographic Watermark Background */}
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="royal-topo" width="180" height="180" patternUnits="userSpaceOnUse">
              <path
                d="M0 60 Q45 20 90 60 T180 60 M0 120 Q45 80 90 120 T180 120"
                fill="none"
                stroke="#2e261f"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#royal-topo)" />
        </svg>
      </div>

      {/* 4. Foreground Multi-Stage Scroll Story */}
      <div className="relative z-20 flex flex-col">
        {/* Stage 01: Hero */}
        <ScrollHeroStage />

        {/* Stage 02: Conformation Inspection (Horse turns sideways) */}
        <ScrollConformationStage />

        {/* Stage 03: The Four Crown Stallions (Live 3D coat shift + real farm photos) */}
        <ScrollFourChampionsStage />

        {/* Stage 04: Arena Cinema (2 Video Reels) */}
        <ScrollArenaVideoStage />

        {/* Stage 05: VIP Sanctuary Concierge & Treaty */}
        <ScrollSanctuaryFooterStage />
      </div>

      {/* 5. Cal.com & VIP Private Treaty Reservation Modal */}
      <BookingModal />
    </main>
  );
}
