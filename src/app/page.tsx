'use client';

import React from 'react';
import HorseCanvasDynamic from '@/components/canvas/HorseCanvasDynamic';
import { Navbar } from '@/components/ui/Navbar';
import { HorseStatsCard } from '@/components/ui/HorseStatsCard';
import { HorseSelector } from '@/components/ui/HorseSelector';
import { BookingModal } from '@/components/ui/BookingModal';

export default function Home() {
  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-[#070709] select-none touch-none">
      {/* Top Luxury Navigation */}
      <Navbar />

      {/* Mobile Top Stallion Switcher (< lg only) */}
      <HorseSelector />

      {/* 3D WebGL Canvas Layer (Pure Hero Viewport) */}
      <div className="absolute inset-0 z-0">
        <HorseCanvasDynamic />
      </div>

      {/* Minimal Floating Bottom Dock & Specs Drawer */}
      <HorseStatsCard />

      {/* Cal.com Slot Booking & VIP Concierge Modal */}
      <BookingModal />
    </main>
  );
}
