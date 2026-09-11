import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { SITE_CONFIG } from '@/lib/constants/site';
import { MapPin, Phone, Clock, Car, Train, ExternalLink } from 'lucide-react';

export const LocationConcierge: React.FC = () => {
  return (
    <section className="py-20 bg-[#080d1a] relative border-t border-[#c6a252]/15">
      <Container size="lg">
        <SectionHeading
          eyebrow="Visit Our Café"
          title="Kampong Glam, Singapore"
          subtitle="Located at 26 Kandahar Street in the vibrant historic heritage district."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Address */}
            <div className="p-6 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs uppercase font-semibold text-[#c6a252] tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Café Location</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#c6a252]/15 text-[#f4ecce] border border-[#c6a252]/30">
                  {SITE_CONFIG.dietary}
                </span>
              </div>
              <p className="text-lg text-white font-semibold">
                {SITE_CONFIG.location.address}
              </p>
              <p className="text-xs text-[#ded5c0]/80">
                {SITE_CONFIG.location.district}, {SITE_CONFIG.location.city}
              </p>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 space-y-3">
              <div className="flex items-center gap-2.5 text-xs uppercase font-semibold text-[#c6a252] tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <div className="space-y-2 text-xs text-[#ded5c0]/85">
                {SITE_CONFIG.operatingHours.map((h, i) => (
                  <div key={i} className="flex justify-between pb-1 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="font-medium text-white">{h.days}</span>
                    <span className={h.hours === 'Closed' ? 'text-amber-400 font-semibold' : 'text-[#ded5c0]'}>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parking & MRT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#c6a252]">
                  <Car className="w-4 h-4" />
                  <span>Parking</span>
                </div>
                <p className="text-xs text-[#ded5c0]/75 leading-relaxed">
                  {SITE_CONFIG.location.valet}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#c6a252]">
                  <Train className="w-4 h-4" />
                  <span>MRT Transit</span>
                </div>
                <p className="text-xs text-[#ded5c0]/75 leading-relaxed">
                  {SITE_CONFIG.location.mrt}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#c6a252]/30 bg-[#0c1426] relative min-h-[360px] flex flex-col justify-end p-6 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
              alt="Aureffle Kandahar Street Singapore"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/60 to-transparent" />

            <div className="relative z-10 p-6 rounded-xl luxury-glass border border-[#c6a252]/40 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-display text-xl text-white font-bold tracking-wide">
                  Aureffle Café • Kandahar St
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Open Today
                </span>
              </div>

              <p className="text-xs text-[#ded5c0]/90 font-light leading-relaxed">
                26 Kandahar Street, Singapore 198888. Serving viral handcrafted Waffwiches, gelato &amp; specialty brews.
              </p>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-3 text-xs">
                <a
                  href={`tel:${SITE_CONFIG.location.phone}`}
                  className="text-[#c6a252] hover:text-[#f4ecce] font-semibold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call {SITE_CONFIG.location.phone}
                </a>

                <a
                  href={SITE_CONFIG.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#c6a252] text-[#080d1a] font-bold flex items-center gap-1.5 hover:bg-[#e6ca85] transition-all shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
