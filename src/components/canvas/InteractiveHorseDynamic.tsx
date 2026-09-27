'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const InteractiveHorseShowcase = dynamic(
  () => import('./InteractiveHorseShowcase').then((mod) => mod.InteractiveHorseShowcase),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[580px] sm:h-[640px] md:h-[700px] rounded-3xl bg-[#f2ece2] flex flex-col items-center justify-center text-amber-900">
        <div className="w-12 h-12 rounded-full border border-amber-600/30 border-t-amber-700 animate-spin" />
        <span className="mt-4 font-serif text-xs tracking-[0.25em] uppercase text-stone-600">
          Loading 3D Anatomy Model...
        </span>
      </div>
    ),
  }
);

export default function InteractiveHorseDynamic() {
  return <InteractiveHorseShowcase />;
}
