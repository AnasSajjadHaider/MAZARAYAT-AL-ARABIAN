'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { SplitHeroSection } from '@/components/sections/SplitHeroSection';
import { AnatomyExplorerSection } from '@/components/sections/AnatomyExplorerSection';
import { DesirableSanctuarySection } from '@/components/sections/DesirableSanctuarySection';
import { RoyalAttireSection } from '@/components/sections/RoyalAttireSection';
import { ArenaVideoSection } from '@/components/sections/ArenaVideoSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { BookingModal } from '@/components/ui/BookingModal';

export default function Home() {
  return (
    <main className="relative bg-[#faf7f2] text-[#2e261f] min-h-screen overflow-x-hidden selection:bg-[#d4af37] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Split Hero Section (Inspired by uploaded reference) */}
      <SplitHeroSection />

      {/* 3. 3D Interactive Anatomy Explorer Centerpiece */}
      <AnatomyExplorerSection />

      {/* 4. The Most Desirable Sanctuary Bento Band (Dark Topographic) */}
      <DesirableSanctuarySection />

      {/* 5. The Four Crown Stallions (Lucky, Sensation, Parizaad, Zulfiqar) */}
      <RoyalAttireSection />

      {/* 6. Arena Cinema & Motion Reels (2 Championship Videos) */}
      <ArenaVideoSection />

      {/* 7. Experience Private Viewing & Luxury Footer */}
      <ExperienceSection />

      {/* 7. Cal.com & VIP Private Treaty Booking Modal */}
      <BookingModal />
    </main>
  );
}
