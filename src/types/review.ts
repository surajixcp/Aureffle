export interface Review {
  id: string;
  author: string;
  roleOrPublication: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  favoriteDish?: string;
  source: 'Michelin Guide Inspector' | 'Tatler Dining' | 'Singapore Gourmet Gazette' | 'Verified Guest';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'artisanal-coffee' | 'patisserie' | 'culinary' | 'moments';
  image: string;
  description: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface StoryMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}
