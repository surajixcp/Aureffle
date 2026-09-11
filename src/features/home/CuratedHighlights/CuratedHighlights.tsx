import React, { useState } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { AngledMonochromaticGallery } from '@/components/ui/angled-monochromatic-gallery';
import { MenuItemModal } from '@/components/menu/MenuItemModal/MenuItemModal';
import { Button } from '@/components/ui/Button/Button';
import { MENU_ITEMS } from '@/data/menu/menu-items';
import { MenuItem } from '@/types/menu';
import { ActiveTab } from '@/types/common';
import { ArrowRight } from 'lucide-react';

interface CuratedHighlightsProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const CuratedHighlights: React.FC<CuratedHighlightsProps> = ({ onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleCardClick = () => {
    const signatureItem = MENU_ITEMS.find((item) => item.featured) || MENU_ITEMS[0];
    setSelectedItem(signatureItem);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#080d1a] relative border-t border-[#c6a252]/10 overflow-hidden">
      <Container size="lg">
        <SectionHeading
          eyebrow="The Signature Repertoire"
          title="Curated Gastronomic Masterpieces"
          subtitle="Explore our immersive angled moving gallery featuring rare geisha extractions, Normandy viennoiserie, and signature creations."
        />
      </Container>

      {/* Full-Screen Edge-to-Edge Moving Angled Gallery */}
      <div className="w-full">
        <AngledMonochromaticGallery onCardClick={handleCardClick} />
      </div>

      <Container size="lg">
        {/* Explore Full Repertoire Button */}
        <div className="mt-8 text-center">
          <Button
            variant="gold-outline"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate('menu')}
            className="hover:bg-[#ffe600]/15 transition-all font-semibold"
          >
            Explore Complete Menu &amp; Repertoire (16+ Creations)
          </Button>
        </div>
      </Container>

      {/* Item Customization & Details Modal */}
      <MenuItemModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onSelectPairing={(pairedItem) => setSelectedItem(pairedItem)}
      />
    </section>
  );
};
