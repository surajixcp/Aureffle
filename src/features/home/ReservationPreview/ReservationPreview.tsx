import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { ActiveTab } from '@/types/common';
import { Calendar, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ReservationPreviewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const ReservationPreview: React.FC<ReservationPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-[#050811] relative overflow-hidden border-t border-[#c6a252]/20">
      {/* Ambient background bloom */}
      <div className="absolute inset-0 cafe-ambient-glow pointer-events-none" />

      <Container size="lg" className="relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl luxury-glass border border-[#c6a252]/40 shadow-2xl bg-gradient-to-br from-[#0c162e] via-[#080d1a] to-[#0c162e] text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold px-4 py-1.5 rounded-full bg-[#c6a252]/10 border border-[#c6a252]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Table Reservations</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
              An Unforgettable Sensory Journey Awaits
            </h2>
            <p className="text-sm sm:text-base text-[#ded5c0]/80 font-light max-w-xl mx-auto leading-relaxed">
              We recommend reserving your salon table or omakase barista seats in advance. Complimentary valet service is available for all confirmed guests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gold-solid"
              size="lg"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={() => onNavigate('booking')}
            >
              Book Your Table Now
            </Button>
            <Button
              variant="gold-outline"
              size="lg"
              onClick={() => onNavigate('contact')}
            >
              Contact Concierge
            </Button>
          </div>

          <div className="pt-6 border-t border-[#c6a252]/15 flex flex-wrap items-center justify-center gap-6 text-xs text-[#ded5c0]/70 font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c6a252]" />
              <span>Instant SMS &amp; Email Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c6a252]" />
              <span>Flexible cancellation up to 2 hours prior</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
