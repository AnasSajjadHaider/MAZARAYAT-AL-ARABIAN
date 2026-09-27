'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Sun, Globe, Mail, MessageCircle } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function ExperienceSection() {
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  return (
    <section className="relative w-full bg-[#faf7f2] pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2e261f]">
          Experience your <br />
          <span className="text-amber-700 italic font-light">private viewing</span> of champions
        </h2>

        {/* Dynamic Arched Gallery Layout (Inspired by reference) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Arched Photo: Pure Arabian Head under arena lights */}
          <div className="h-72 sm:h-80 rounded-t-full rounded-b-3xl overflow-hidden shadow-lg border-2 border-white relative group">
            <img
              src="/images/horses/horse_white_head.jpg"
              alt="Mazarayat Al Arabian Champion Head"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3">
              <span className="text-[11px] font-mono text-amber-300 font-semibold">Parizaad (پریزاد)</span>
            </div>
          </div>

          {/* Center Info Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-900/10 shadow-xl flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-700 mb-3">
              <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2e261f]">
              Royal Concierge Itinerary
            </h3>
            <p className="text-xs text-[#6e5843] font-light mt-2 leading-relaxed text-center">
              We offer bespoke stable tours, private pedigree inspections, and international equine transport coordination for dignitaries and distinguished breeders worldwide.
            </p>
            <button
              onClick={handleBooking}
              className="mt-6 px-6 py-3 rounded-full bg-[#2e261f] hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Right Arched Photo: Real Chestnut Profile */}
          <div className="h-72 sm:h-80 rounded-t-full rounded-b-3xl overflow-hidden shadow-lg border-2 border-white relative group">
            <img
              src="/images/horses/horse_chestnut_side.jpg"
              alt="Mazarayat Al Arabian Lucky"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3">
              <span className="text-[11px] font-mono text-amber-300 font-semibold">Lucky (لاكي)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DARK FOOTER SECTION (Inspired by reference bottom block)                  */}
      {/* ========================================================================= */}
      <footer className="mt-20 w-full bg-[#121214] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐎</span>
                <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wide">
                  Stay Connected with Mazarayat
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1">
                The premier international stud farm for straight Egyptian & Bedouin champions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-white"
                title="Global Portal"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-white"
                title="VIP Concierge Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-white"
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© 2026 Mazarayat Al Arabian (مزارع العَرَبيَّة). All Rights Reserved.</p>
            <div className="flex items-center gap-6 font-mono text-[11px]">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">WAHO Registration</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Concierge Treaty</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
