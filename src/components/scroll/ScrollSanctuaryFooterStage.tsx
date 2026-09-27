'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Calendar, Globe, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function ScrollSanctuaryFooterStage() {
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-16 pointer-events-none">
      {/* Top Header */}
      <div className="max-w-xl pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/15 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold mb-3">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>Stage 05 • Private Sanctuary</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2e261f] tracking-tight">
          Reserve Your Private Treaty
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#685340] font-light max-w-md leading-relaxed">
          Exclusive breeding treaties, VIP stable visitations, and worldwide transport coordination for distinguished owners and royal stables.
        </p>
      </div>

      {/* Floating VIP Concierge Card (Positioned in Center / Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto w-full p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-lg border border-amber-900/15 shadow-2xl pointer-events-auto my-auto text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-800 flex items-center justify-center text-2xl mx-auto mb-4 font-serif">
          👑
        </div>

        <h3 className="font-serif font-bold text-2xl text-[#2e261f]">
          MAZARAYAT AL ARABIANS Concierge
        </h3>

        <p className="text-xs sm:text-sm text-[#6e5843] font-light mt-2 max-w-lg mx-auto leading-relaxed">
          Schedule a private in-person viewing of Lucky, Sensation, Parizaad, and Zulfiqar, or acquire an official WAHO purebred breeding treaty with global frozen semen logistics.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleBooking}
            className="px-8 py-3.5 rounded-full bg-[#2e261f] hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book Private Treaty</span>
          </button>

          <button
            onClick={scrollToTop}
            className="px-6 py-3.5 rounded-full border border-amber-900/20 bg-white hover:bg-stone-50 text-[#2e261f] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <span>Back to Beginning ↑</span>
          </button>
        </div>
      </motion.div>

      {/* Luxury Footer Bar */}
      <footer className="w-full pt-8 border-t border-amber-900/10 pointer-events-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div>
            <span className="font-serif font-bold text-sm text-[#2e261f] block tracking-wide">
              MAZARAYAT AL ARABIANS
            </span>
            <span className="text-[11px] text-stone-400">
              © 2026 Official WAHO Straight Egyptian Stud Farm. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-amber-600 hover:text-white border border-amber-900/15 flex items-center justify-center transition-all text-[#2e261f]"
              title="Official Portal"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-amber-600 hover:text-white border border-amber-900/15 flex items-center justify-center transition-all text-[#2e261f]"
              title="VIP Email Concierge"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-amber-600 hover:text-white border border-amber-900/15 flex items-center justify-center transition-all text-[#2e261f]"
              title="Direct WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
