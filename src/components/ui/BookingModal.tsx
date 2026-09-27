'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import confetti from 'canvas-confetti';
import { useHorseStore } from '@/store/useHorseStore';
import { soundFx } from '@/utils/sound';

export function BookingModal() {
  const isOpen = useHorseStore((state) => state.isBookingModalOpen);
  const closeModal = useHorseStore((state) => state.closeBookingModal);
  const activeHorse = useHorseStore((state) => state.activeHorse);

  const [activeTab, setActiveTab] = useState<'calendar' | 'concierge'>('calendar');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize Cal.com configuration
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'dark',
          styles: {
            branding: {
              brandColor: '#d4af37',
            },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch {
        // Fallback for restricted iframe sandbox
      }
    })();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#e5c378'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleClose = () => {
    soundFx.playClick();
    closeModal();
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0c0c0e] border border-amber-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-white flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-zinc-800/80 flex items-center justify-between bg-black/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-serif uppercase text-amber-400">
                  Private Treaty & Viewing
                </span>
                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  VIP Concierge
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-serif font-bold text-white mt-0.5">
                Reserve Appointment • {activeHorse.name}
              </h2>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-zinc-400 hover:text-white flex items-center justify-center transition-all shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="px-4 sm:px-6 pt-3 sm:pt-4 flex gap-2 sm:gap-3 border-b border-zinc-800/60 bg-black/20 overflow-x-auto">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-2.5 sm:pb-3 text-[11px] sm:text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 sm:gap-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'calendar'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Cal.com Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('concierge')}
              className={`pb-2.5 sm:pb-3 text-[11px] sm:text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 sm:gap-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'concierge'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct VIP Request</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {activeTab === 'calendar' ? (
              <div className="w-full min-h-[420px] sm:min-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 border border-zinc-800/80">
                <Cal
                  calLink="mazarayat-al-arabian/vip-viewing"
                  style={{ width: '100%', height: '100%', minHeight: '420px' }}
                  config={{ layout: 'month_view', theme: 'dark' }}
                />
              </div>
            ) : (
              <div>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 sm:py-12 text-center flex flex-col items-center"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                      <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
                      Viewing Request Received
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed mb-6">
                      Our Royal Stud Director has been notified. You will receive a personalized itinerary and secure stable gate access credentials via VIP WhatsApp concierge shortly.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                      Return to Showcase
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                          Full Dignitary / Principal Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sheikh Sultan Al Nahyan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                          VIP WhatsApp / Phone (Direct Line)
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+971 50 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                          Official Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="principal@royaloffice.ae"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                          Preferred Viewing Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                        Selected Stallion of Interest
                      </label>
                      <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium flex items-center justify-between">
                        <span>{activeHorse.name} ({activeHorse.arabicName})</span>
                        <span className="text-[11px] text-amber-400/80">{activeHorse.strain}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                        Special Protocols / Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Helipad arrival, private equine veterinary escort, confidentiality agreement..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 text-xs sm:text-sm text-white focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Strict Non-Disclosure & Privacy Protected</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Private Request</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
