'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';

export function ScrollConformationStage() {
  const activeHorse = useHorseStore((state) => state.activeHorse);

  const conformationPoints = [
    {
      title: 'Sculpted Dished Profile',
      tag: 'Head & Eye',
      desc: 'Distinctive concave profile, wide expressive liquid eyes, and flared desert nostrils.',
    },
    {
      title: 'High-Arching Mitbah Crest',
      tag: 'Crest & Throat',
      desc: 'Refined throatlatch and arched crest ensuring maximum respiratory volume during intense desert heat.',
    },
    {
      title: 'Short Coupled Back & Girth',
      tag: 'Core & Loin',
      desc: 'Compact loin with deep heart girth providing monumental lung capacity and explosive acceleration.',
    },
    {
      title: 'Natural High-Set Flag Tail',
      tag: 'Tail Carriage',
      desc: 'Carried aloft with aristocratic pride in every gait, the definitive hallmark of Bedouin nobility.',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between py-24 px-4 sm:px-8 lg:px-16 pointer-events-none">
      {/* Top Header */}
      <div className="max-w-xl pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/15 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Stage 02 • Conformation Inspection</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2e261f] tracking-tight">
          Anatomy of Royalty <span className="inline-block text-amber-600 text-3xl">✻</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#685340] font-light max-w-md leading-relaxed">
          Broadside lateral profile analysis. Inspect the anatomical balance and skeletal symmetry of our supreme champions.
        </p>
      </div>

      {/* Floating Conformation Cards (Positioned on the Right Side) */}
      <div className="self-end max-w-sm sm:max-w-md space-y-3.5 pointer-events-auto my-auto">
        {conformationPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-amber-900/15 shadow-lg hover:shadow-xl transition-all hover:bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#2e261f]">
                {point.title}
              </span>
              <span className="text-[10px] font-mono text-amber-800 font-semibold px-2 py-0.5 rounded-full bg-amber-500/15">
                {point.tag}
              </span>
            </div>
            <p className="text-[11px] text-[#786350] font-light mt-1 leading-relaxed">
              {point.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Telemetry Cards Underneath */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 pointer-events-auto pt-6 border-t border-amber-900/10">
        <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-900/10 shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-stone-500 block">Sprint Velocity</span>
            <span className="font-serif font-bold text-base text-[#2e261f]">{activeHorse.stats.speed}%</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-900/10 shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-stone-500 block">Lung Stamina</span>
            <span className="font-serif font-bold text-base text-[#2e261f]">{activeHorse.stats.stamina}%</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-900/10 shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-stone-500 block">Bloodline Purity</span>
            <span className="font-serif font-bold text-base text-[#2e261f]">{activeHorse.stats.purity}%</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-900/10 shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-stone-500 block">Royal Nobility</span>
            <span className="font-serif font-bold text-base text-[#2e261f]">{activeHorse.stats.temperament}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
