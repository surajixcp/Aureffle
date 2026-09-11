import { MenuItem } from './menu';

export interface SelectedOption {
  groupName: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  id: string; // Unique cart item ID (combines item ID + selected options)
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'dine-in' | 'takeaway' | 'preorder';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  tableNumber?: string;
  pickupTime?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  orderType: OrderType;
  customer: CustomerDetails;
  subtotal: number;
  serviceCharge: number; // 10% in Singapore standard
  gst: number; // 9% Singapore GST
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
  estimatedTimeMinutes: number;
  paymentMethod: 'card' | 'apple-pay' | 'paynow' | 'cash-on-arrival';
}
