'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const HorseViewport = dynamic(() => import('./HorseViewport'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#070709] text-amber-300">
      <div className="w-16 h-16 rounded-full border border-amber-500/30 border-t-amber-400 animate-spin" />
      <span className="mt-4 font-serif text-xs tracking-[0.3em] uppercase text-amber-200/60">
        Initializing 3D Arabian Viewport...
      </span>
    </div>
  ),
});

export default function HorseCanvasDynamic() {
  return <HorseViewport />;
}
