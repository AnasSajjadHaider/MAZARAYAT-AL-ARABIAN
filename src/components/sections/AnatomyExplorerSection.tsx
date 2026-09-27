'use client';

import React from 'react';
import InteractiveHorseDynamic from '@/components/canvas/InteractiveHorseDynamic';
import { Sparkles, Activity, Shield, Zap, Award } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';

export function AnatomyExplorerSection() {
  const activeHorse = useHorseStore((state) => state.activeHorse);

  return (
    <section id="anatomy-section" className="relative w-full py-16 sm:py-20 bg-[#f7f3ec] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-800 font-bold">
              3D Anatomical Inspection
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-600" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2e261f] tracking-tight">
            Horses details <span className="inline-block text-amber-600 text-3xl">✻</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#6b5845] font-light leading-relaxed">
            Rotate the stallion 360°, inspect purebred conformation points, and explore the muscular dynamics of our royal breeding foundation.
          </p>
        </div>

        {/* 3D Model Viewport with Anatomy Hotspots */}
        <div className="relative">
          <InteractiveHorseDynamic />
        </div>

        {/* 4 Bottom Telemetry Cards Under 3D Viewer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-white/90 border border-amber-900/10 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Speed & Sprint
              </span>
              <span className="font-serif font-bold text-lg text-[#2e261f]">
                {activeHorse.stats.speed}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-amber-900/10 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Lung Stamina
              </span>
              <span className="font-serif font-bold text-lg text-[#2e261f]">
                {activeHorse.stats.stamina}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-amber-900/10 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Bloodline Purity
              </span>
              <span className="font-serif font-bold text-lg text-[#2e261f]">
                {activeHorse.stats.purity}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-amber-900/10 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Royal Nobility
              </span>
              <span className="font-serif font-bold text-lg text-[#2e261f]">
                {activeHorse.stats.temperament}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
