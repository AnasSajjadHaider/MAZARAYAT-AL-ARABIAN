'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

interface PackageItem {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  tag: string;
}

const PACKAGES: PackageItem[] = [
  {
    id: '1',
    title: 'Imperial Bloodline Dossier',
    category: 'Pedigree Archival',
    price: '$1,200',
    tag: 'Official WAHO',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Gold-Plated Bedouin Halter',
    category: 'Handcrafted Tack',
    price: '$3,800',
    tag: '24K Gilded',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Private Stable VIP Viewing',
    category: 'Concierge Tour',
    price: '$2,500',
    tag: 'Dignitary Escort',
    image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Cryo-Genetic Breeding Treaty',
    category: 'Breeding Rights',
    price: 'Private Treaty',
    tag: 'Global Shipping',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?q=80&w=400&auto=format&fit=crop',
  },
];

export function RoyalAttireSection() {
  const openBookingModal = useHorseStore((state) => state.openBookingModal);

  const handleBooking = () => {
    soundFx.playChime();
    openBookingModal();
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                Private Reserve Catalog
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 font-semibold">
                New ✻
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2e261f]">
              Handy guide & acquisitions
            </h2>
          </div>

          <button
            onClick={handleBooking}
            className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#594736] hover:text-black font-semibold transition-colors"
          >
            <span>View Full Treaty Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Arched Cards (Inspired by Reference Image "Handy guide for beginners") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={handleBooking}
              className="cursor-pointer group rounded-3xl bg-white p-4 shadow-sm hover:shadow-xl border border-amber-900/10 transition-all flex flex-col justify-between"
            >
              {/* Arched Top Image */}
              <div className="relative w-full h-56 rounded-t-full rounded-b-2xl overflow-hidden bg-[#f4ece1] mb-4">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-amber-300 font-semibold">
                  {pkg.tag}
                </div>
              </div>

              {/* Card Meta */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                  {pkg.category}
                </span>
                <h3 className="font-serif font-bold text-sm text-[#2e261f] mt-0.5 group-hover:text-amber-700 transition-colors">
                  {pkg.title}
                </h3>
              </div>

              {/* Price & Action */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#2e261f]">
                  {pkg.price}
                </span>
                <span className="text-[11px] font-mono text-amber-700 font-semibold group-hover:underline">
                  Inquire ↗
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
