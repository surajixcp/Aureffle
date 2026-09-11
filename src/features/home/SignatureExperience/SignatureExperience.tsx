import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { Button } from '@/components/ui/Button/Button';
import { ActiveTab } from '@/types/common';
import { ArrowRight } from 'lucide-react';

interface SignatureExperienceProps {
  onNavigate: (tab: ActiveTab) => void;
}

const PARALLAX_SALON_IMAGES = [
  {
    src: '/assets/gallery/1.jpeg',
    alt: 'Aureffle Main Salon Atmosphere',
  },
  {
    src: '/assets/gallery/2.jpeg',
    alt: 'Signature Scoops Waffles & Smiles Neon Salon',
  },
  {
    src: '/assets/gallery/3.jpeg',
    alt: 'Aureffle Interior Lounge & Seating',
  },
  {
    src: '/assets/gallery/4.jpeg',
    alt: 'Aureffle Entrance & Exterior Architecture',
  },
  {
    src: '/assets/gallery/5.jpeg',
    alt: 'Aureffle Neon Brand Wall & Warm Illumination',
  },
  {
    src: '/assets/gallery/6.jpeg',
    alt: 'Aureffle Waffle & Dessert Counter Bar',
  },
  {
    src: '/assets/gallery/7.jpeg',
    alt: 'Aureffle Ambient Dining Sanctuary',
  },
];

export const SignatureExperience: React.FC<SignatureExperienceProps> = ({ onNavigate }) => {
  return (
    <section className="bg-[#080d1a] relative border-t border-[#c6a252]/15">
      <div className="pt-20 pb-10">
        <Container size="lg">
          <SectionHeading
            eyebrow="The Four Salons &amp; Visual Parallax"
            title="Distinct Atmosphere for Every Occasion"
            subtitle="Scroll down to zoom through our architectural salons, manual extraction rituals, and private vault atmosphere."
          />
        </Container>
      </div>

      {/* Interactive Zoom Parallax Experience */}
      <ZoomParallax images={PARALLAX_SALON_IMAGES} />

      <div className="py-12 text-center bg-[#080d1a]">
        <Container size="lg">
          <Button
            variant="gold-solid"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate('booking')}
          >
            Reserve Your Salon Experience
          </Button>
        </Container>
      </div>
    </section>
  );
};
