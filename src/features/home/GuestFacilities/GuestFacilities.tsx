import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import OrbitCarousel from '@/components/ui/orbiting-carousel-with-animated-icons';
import {
  Coffee,
  Wifi,
  Car,
  CreditCard,
  CalendarCheck,
  Heart,
  Baby,
  ShieldCheck,
  Armchair,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const GuestFacilities: React.FC = () => {
  const quickHighlights = [
    { label: 'Specialty Coffee & Quick Bites', icon: Coffee },
    { label: 'Free Optical Wi-Fi', icon: Wifi },
    { label: 'Street & Nearby Parking', icon: Car },
    { label: 'Online Table Reservations', icon: CalendarCheck },
    { label: 'NFC & Credit Card Payments', icon: CreditCard },
    { label: 'LGBTQ+ & Trans Safe Space', icon: Heart },
    { label: 'High Chairs & Family Friendly', icon: Baby },
    { label: 'Gender-Neutral Restrooms', icon: ShieldCheck },
    { label: 'Solo & Salon Dining', icon: Armchair },
    { label: '100% Halal & Muslim-Owned', icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 bg-[#080d1a] relative border-t border-[#c6a252]/15 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c6a252]/5 blur-[140px] rounded-full pointer-events-none" />

      <Container size="lg">
        <SectionHeading
          eyebrow="Guest Facilities & Services"
          title="Hospitality & Amenities"
          subtitle="Interactive showcase of all available services, dining options, crowd inclusivity, payments, and parking facilities."
        />

        {/* Orbiting Carousel as Main Facilities Showcase */}
        <div className="mb-16">
          <OrbitCarousel />
        </div>

        {/* Quick Highlights Badge Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426]/70 border border-[#c6a252]/20 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 justify-center text-center">
            <Sparkles className="w-4 h-4 text-[#c6a252]" />
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c6a252]">
              All Facilities At A Glance
            </h4>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {quickHighlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#101c34] border border-[#c6a252]/20 text-xs text-[#f4f1ea] hover:border-[#c6a252]/50 hover:bg-[#c6a252]/10 transition-all cursor-default"
                >
                  <IconComp className="w-3.5 h-3.5 text-[#c6a252]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
