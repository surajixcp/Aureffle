import { MenuCategory } from '@/types/menu';

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'all',
    name: 'Full Collection',
    tagline: 'The Complete Aureffle Repertoire',
    description: 'Explore our entire showcase of haute gastronomy, single-origin roasts, and artisanal pastry.',
    iconName: 'Sparkles',
  },
  {
    id: 'specialty-coffee',
    name: 'Specialty Coffee',
    tagline: 'Micro-Lot & Geisha Reserve',
    description: 'Manual siphon extractions, competition geisha roasts, and velvet espresso compositions.',
    iconName: 'Coffee',
  },
  {
    id: 'tea-infusions',
    name: 'Artisan Tea & Matcha',
    tagline: 'Ceremonial Japanese & French Blends',
    description: 'Uji single-estate ceremonial matcha, hand-picked high mountain oolongs, and floral infusions.',
    iconName: 'Feather',
  },
  {
    id: 'viennoiserie',
    name: 'Viennoiserie & Bakes',
    tagline: 'Laminated with AOP Isigny Butter',
    description: 'Baked fresh every 3 hours with French stone-milled T55 flour and 72-hour slow fermentation.',
    iconName: 'Croissant',
  },
  {
    id: 'entremets-pastry',
    name: 'Haute Entremets',
    tagline: 'Sculpted Patisserie & Tarts',
    description: 'Architectural pastries blending French technique with Kyoto yuzu, Valrhona grand cru, and 24K gold leaf.',
    iconName: 'Cake',
  },
  {
    id: 'all-day-brunch',
    name: 'All-Day Brunch',
    tagline: 'Elevated Morning Classics',
    description: 'Organic Japanese cage-free eggs, house-cured salmon gravlax, and brioche French toast.',
    iconName: 'Egg',
  },
  {
    id: 'mains-savory',
    name: 'Culinary Mains',
    tagline: 'Refined Modern European Dining',
    description: 'Miyazaki A5 Wagyu striploin sando, truffle lobster tagliolini, and duck confit hash.',
    iconName: 'Utensils',
  },
  {
    id: 'botanical-elixirs',
    name: 'Botanical Elixirs',
    tagline: 'Zero-Proof Cocktails & Cold Brews',
    description: 'Clarified yuzu tonic, nitro cascara infusion, and smoked rosemary lavender fizz.',
    iconName: 'Wine',
  },
];
