export type SeatingArea = 'main-salon' | 'verandah-garden' | 'barista-counter' | 'private-vault';

export type DiningOccasion = 'casual' | 'anniversary' | 'business' | 'birthday' | 'tasting-menu' | 'afternoon-tea';

export interface TableBooking {
  id: string;
  confirmationCode: string;
  fullName: string;
  email: string;
  phone: string;
  guestsCount: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  seatingArea: SeatingArea;
  occasion: DiningOccasion;
  dietaryNotes?: string;
  specialRequests?: string;
  champagneAddon?: boolean;
  sommelierTastingAddon?: boolean;
  status: 'confirmed' | 'cancelled' | 'seated';
  createdAt: string;
}

export interface SeatingAreaInfo {
  id: SeatingArea;
  name: string;
  description: string;
  image: string;
  capacityMax: number;
  atmosphere: string;
  minimumSpend?: number;
}
