import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Button } from '@/components/ui/Button/Button';
import { ActiveTab } from '@/types/common';
import { STORY_MILESTONES, PHILOSOPHY_PILLARS } from '@/data/stories/cafe-heritage';
import { Sparkles, Award, Compass, HeartHandshake, ArrowRight, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-[#080d1a] space-y-20">
      {/* Hero Header */}
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold px-3.5 py-1.5 rounded-full luxury-glass border border-[#c6a252]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Aureffle Heritage &amp; Ethos</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
            A Pilgrimage to the Heights of Sensory Elegance
          </h1>
          <p className="text-base text-[#ded5c0]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Founded in Singapore with roots spanning the coffee highlands of Boquete and the grand patisseries of Paris, Aureffle was born from a singular desire: to treat coffee and viennoiserie as high art.
          </p>
        </div>
      </Container>

      {/* Founders & Vision Section */}
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#c6a252]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
                alt="Aureffle Main Salon Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl luxury-glass border border-[#c6a252]/30">
                <span className="text-[10px] uppercase font-bold text-[#c6a252] tracking-widest block">
                  Marina Bay Salon
                </span>
                <p className="text-xs text-white font-serif italic mt-1">
                  "Hospitality is not merely service; it is the curation of stillness in an electric city."
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="The Genesis"
              title="Parisian Craft Meets Kyoto Serenity"
              subtitle="Every element at Aureffle — from our custom silver siphons to the acoustic fabric dampening our salon — was designed to create an immersive sanctuary."
              centered={false}
            />

            <div className="space-y-4 text-sm text-[#ded5c0]/80 font-light leading-relaxed">
              <p>
                Our journey began when Master Baker Antoine Laurent and Champion Q-Grader Mei Lin met during a single-origin sourcing expedition in Central America. Both discovered a shared frustration with the modern rushed cafe culture.
              </p>
              <p>
                Together, they spent two years perfecting the balance between high-extraction micro-lot coffees and temperature-controlled 36-layer French viennoiserie, selecting only AOP Isigny butter from Normandy and rare Geisha harvests.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="p-4 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 min-w-[160px]">
                <span className="font-serif text-2xl text-[#f4ecce]">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-[#ded5c0]/70 block font-semibold">
                  Direct Trade Sourcing
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 min-w-[160px]">
                <span className="font-serif text-2xl text-[#f4ecce]">36 Layers</span>
                <span className="text-[10px] uppercase tracking-wider text-[#ded5c0]/70 block font-semibold">
                  Hand-Folded Lamination
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* The Milestones Timeline */}
      <div className="py-16 bg-[#050811] border-y border-[#c6a252]/15">
        <Container size="lg">
          <SectionHeading
            eyebrow="The Journey"
            title="Milestones of Excellence"
            subtitle="The path that defined Aureffle as Singapore’s benchmark luxury cafe."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORY_MILESTONES.map((m) => (
              <div
                key={m.year}
                className="p-6 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-4 hover:border-[#c6a252]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-serif text-3xl font-normal text-[#c6a252]">
                    {m.year}
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal">
                    {m.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-[#ded5c0]/60 font-semibold block">
                    {m.subtitle}
                  </span>
                  <p className="text-xs text-[#ded5c0]/75 leading-relaxed font-light pt-1">
                    {m.description}
                  </p>
                </div>

                <div className="aspect-[16/9] rounded-lg overflow-hidden border border-white/10 mt-4">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* The Four Pillars */}
      <Container size="lg">
        <SectionHeading
          eyebrow="The Ethos"
          title="Our Four Pillars of Gastronomy"
          subtitle="The uncompromising standards guiding our bakers, baristas, and sommeliers every morning."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHILOSOPHY_PILLARS.map((p) => (
            <div
              key={p.number}
              className="p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 hover:border-[#c6a252]/50 transition-all space-y-3"
            >
              <span className="font-serif text-sm font-semibold text-[#c6a252] tracking-widest block">
                PILLAR {p.number}
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                {p.title}
              </h3>
              <p className="text-sm text-[#ded5c0]/80 font-light leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Experience the Craft Firsthand
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              variant="gold-solid"
              size="lg"
              onClick={() => onNavigate('booking')}
            >
              Reserve a Table
            </Button>
            <Button
              variant="gold-outline"
              size="lg"
              onClick={() => onNavigate('menu')}
            >
              View Menu Repertoire
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
