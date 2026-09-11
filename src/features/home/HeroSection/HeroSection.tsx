import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { ActiveTab } from '@/types/common';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const heroBgImagePath = "/assets/bg/3.jpeg";

interface HeroSectionProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen w-full flex items-end justify-center pb-20 sm:pb-24 overflow-hidden bg-[#080d1a]">
      {/* High-Visibility Full Background Image Player */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src={heroBgImagePath}
          alt="Aureffle Hero Background"
          className="w-full h-full object-cover opacity-95 scale-[1.01] transition-opacity duration-700 filter brightness-[0.98] contrast-[1.02]"
        />

        {/* Minimal Soft Gradient Overlay at Bottom for Clean Button Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-black/20 pointer-events-none" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
          >
            <Button
              variant="gold-solid"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto shadow-[0_0_25px_rgba(255,230,0,0.4)] hover:shadow-[0_0_35px_rgba(255,230,0,0.7)] transition-all font-semibold"
            >
              Discover The Menu
            </Button>
            <Button
              variant="gold-outline"
              size="lg"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={() => onNavigate('booking')}
              className="w-full sm:w-auto hover:bg-[#ffe600]/15 hover:border-[#ffe600]/70 transition-all font-semibold backdrop-blur-sm"
            >
              Reserve a Table
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
