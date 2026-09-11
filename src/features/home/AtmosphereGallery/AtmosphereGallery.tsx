import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Button } from '@/components/ui/Button/Button';
import DraggableCardDemo from '@/components/ui/draggable-card-demo';
import { ActiveTab } from '@/types/common';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AtmosphereGalleryProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AtmosphereGallery: React.FC<AtmosphereGalleryProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 sm:py-16 bg-[#050811] relative border-t border-[#c6a252]/15 overflow-hidden">
      {/* Full Screen Edge-to-Edge Draggable Cards Canvas */}
      <div className="w-full">
        <DraggableCardDemo />
      </div>

      <Container size="lg">
        <div className="mt-6 text-center">
          <Button
            variant="gold-outline"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate('gallery')}
            className="hover:bg-[#c6a252]/15 transition-all font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-1 text-[#c6a252]" />
            View Full Gastronomy &amp; Architecture Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
};
