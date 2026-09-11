export type ActiveTab = 'home' | 'menu' | 'about' | 'booking' | 'gallery' | 'contact' | 'checkout' | 'auth';

export interface NavItem {
  label: string;
  tab: ActiveTab;
  badge?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  duration?: number;
}
