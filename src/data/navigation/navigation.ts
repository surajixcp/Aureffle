import { NavItem } from '@/types/common';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', tab: 'home' },
  { label: 'The Menu', tab: 'menu', badge: 'New Season' },
  { label: 'Reservations', tab: 'booking' },
  { label: 'Our Story', tab: 'about' },
  { label: 'Gallery', tab: 'gallery' },
  { label: 'Concierge', tab: 'contact' },
];

export const FOOTER_LINKS = {
  dining: [
    { label: 'Morning Viennoiserie', tab: 'menu' as const, category: 'viennoiserie' },
    { label: 'Specialty Micro-Lots', tab: 'menu' as const, category: 'specialty-coffee' },
    { label: 'Haute Entremets & Tarts', tab: 'menu' as const, category: 'entremets-pastry' },
    { label: 'All-Day Savory Dining', tab: 'menu' as const, category: 'mains-savory' },
    { label: 'Botanical Elixirs', tab: 'menu' as const, category: 'botanical-elixirs' },
  ],
  experiences: [
    { label: 'The Main Dining Salon', tab: 'booking' as const },
    { label: 'Botanical Verandah', tab: 'booking' as const },
    { label: 'Omakase Barista Counter', tab: 'booking' as const },
    { label: 'Aureffle Private Vault', tab: 'booking' as const },
    { label: 'Private Soirées & Events', tab: 'contact' as const },
  ],
  hospitality: [
    { label: 'Marina Bay Location', tab: 'contact' as const },
    { label: 'Artisanal Roastery Story', tab: 'about' as const },
    { label: 'Press & Michelin Accolades', tab: 'about' as const },
    { label: 'Dietary & Allergens Guide', tab: 'menu' as const },
    { label: 'Careers & Apprenticeships', tab: 'contact' as const },
  ],
};
