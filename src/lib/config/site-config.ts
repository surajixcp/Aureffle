import { SeatingAreaInfo, DiningOccasion } from '@/types/booking';

export const SEATING_AREAS: SeatingAreaInfo[] = [
  {
    id: 'main-salon',
    name: 'The Main Dining Salon',
    description: 'Surrounded by Italian marble, brushed gold accents, and acoustic velvet partitions.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    capacityMax: 6,
    atmosphere: 'Sophisticated, energetic, intimate ambient lighting',
  },
  {
    id: 'verandah-garden',
    name: 'The Botanical Verandah',
    description: 'Overlooking lush Marina Bay greenery with gentle breeze and natural skylight.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    capacityMax: 8,
    atmosphere: 'Serene, airy, sun-kissed afternoon retreat',
  },
  {
    id: 'barista-counter',
    name: 'Omakase Barista Counter',
    description: 'Front-row seats to master brewers pulling manual geisha pour-overs and siphon brews.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop',
    capacityMax: 4,
    atmosphere: 'Sensory, engaging, interactive specialty experience',
  },
  {
    id: 'private-vault',
    name: 'The Aureffle Private Vault',
    description: 'An exclusive soundproof salon with dedicated butler service, sommelier, and custom menu.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
    capacityMax: 12,
    atmosphere: 'Ultra-luxurious, completely discreet, VIP service',
    minimumSpend: 350,
  },
];

export const DINING_OCCASIONS: { id: DiningOccasion; label: string }[] = [
  { id: 'casual', label: 'Bespoke Casual Dining' },
  { id: 'afternoon-tea', label: 'Royal High Tea Experience' },
  { id: 'tasting-menu', label: 'Chef & Barista Omakase' },
  { id: 'anniversary', label: 'Anniversary Celebration' },
  { id: 'business', label: 'Executive Business Meeting' },
  { id: 'birthday', label: 'Private Birthday Gathering' },
];

export const AVAILABLE_TIMESLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00'
];
