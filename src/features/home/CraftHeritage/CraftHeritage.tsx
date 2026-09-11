import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Button } from '@/components/ui/Button/Button';
import { ActiveTab } from '@/types/common';
import { PHILOSOPHY_PILLARS } from '@/data/stories/cafe-heritage';
import { ArrowRight, Compass, Flame, Sparkles } from 'lucide-react';

interface CraftHeritageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const CraftHeritage: React.FC<CraftHeritageProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-[#050811] relative overflow-hidden border-t border-[#c6a252]/15">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#c6a252]/30 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop"
                    alt="Laminated Croissant Craft"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 space-y-1">
                  <span className="font-serif text-2xl text-[#f4ecce] font-normal">72-Hour</span>
                  <p className="text-xs text-[#ded5c0]/75 uppercase tracking-wider font-semibold">
                    Cold Fermentation Levain
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-5 rounded-xl bg-[#0c1426] border border-[#c6a252]/20 space-y-1">
                  <span className="font-serif text-2xl text-[#f4ecce] font-normal">100% AOP</span>
                  <p className="text-xs text-[#ded5c0]/75 uppercase tracking-wider font-semibold">
                    Normandy Isigny Butter
                  </p>
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#c6a252]/30 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop"
                    alt="Uji Ceremonial Matcha Ceremony"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Four Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <SectionHeading
              eyebrow="The Craft & Terroir"
              title="An Obsession with Culinary Perfection"
              subtitle="Born from the meeting of Parisian classical technique and Kyoto’s profound respect for botanical purity."
              centered={false}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-5 rounded-xl bg-[#0c1426]/70 border border-[#c6a252]/15 space-y-2 hover:border-[#c6a252]/40 transition-colors"
                >
                  <span className="font-serif text-xs font-semibold text-[#c6a252] tracking-widest">
                    PILLAR {pillar.number}
                  </span>
                  <h4 className="font-serif text-lg text-white font-normal">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#ded5c0]/75 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                variant="gold-solid"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => onNavigate('about')}
              >
                Read Our Story &amp; Heritage
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
