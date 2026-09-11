export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Signature' | 'Contains Nuts' | 'Halal-Friendly' | 'Chef Choice';

export type CategoryId = 'all' | 'specialty-coffee' | 'tea-infusions' | 'viennoiserie' | 'entremets-pastry' | 'all-day-brunch' | 'mains-savory' | 'botanical-elixirs';

export interface MenuItemOption {
  name: string;
  priceDelta: number;
}

export interface MenuItemOptionGroup {
  name: string;
  required: boolean;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: CategoryId;
  price: number;
  description: string;
  tastingNotes?: string[];
  origin?: string;
  roastLevel?: 'Light' | 'Medium' | 'Medium-Dark';
  calories?: number;
  dietary: DietaryTag[];
  image: string;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  prepTimeMinutes?: number;
  customizationGroups?: MenuItemOptionGroup[];
  pairings?: string[]; // IDs of recommended items
}

export interface MenuCategory {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
}
