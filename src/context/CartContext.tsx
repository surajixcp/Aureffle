import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CartItem, SelectedOption } from '@/types/order';
import { MenuItem } from '@/types/menu';
import { calculateOrderTotals } from '@/lib/utils/currency';
import { useToast } from './ToastContext';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  serviceCharge: number;
  gst: number;
  discount: number;
  grandTotal: number;
  promoCode: string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (item: MenuItem, quantity?: number, selectedOptions?: SelectedOption[], specialInstructions?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'aureffle_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const { success, info } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  const addItem = useCallback(
    (
      menuItem: MenuItem,
      quantity = 1,
      selectedOptions: SelectedOption[] = [],
      specialInstructions = ''
    ) => {
      // Calculate unit price including options
      const optionsExtra = selectedOptions.reduce((acc, opt) => acc + opt.priceDelta, 0);
      const unitPrice = menuItem.price + optionsExtra;

      // Unique identifier based on item ID and stringified options
      const optionsKey = selectedOptions
        .map((o) => `${o.groupName}:${o.optionName}`)
        .sort()
        .join('|');
      const cartItemId = `${menuItem.id}-${optionsKey}-${specialInstructions}`;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          const current = updated[existingIndex];
          const newQty = current.quantity + quantity;
          updated[existingIndex] = {
            ...current,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
          return updated;
        }

        const newItem: CartItem = {
          id: cartItemId,
          menuItem,
          quantity,
          selectedOptions,
          specialInstructions,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      });

      success('Added to your Order', `${menuItem.name} (${quantity}x)`);
    },
    [success]
  );

  const updateQuantity = useCallback((cartItemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  }, []);

  const removeItem = useCallback(
    (cartItemId: string) => {
      setItems((prev) => prev.filter((item) => item.id !== cartItemId));
      info('Item removed from order');
    },
    [info]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode('');
    setDiscountAmount(0);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const applyPromoCode = useCallback(
    (code: string): boolean => {
      const clean = code.trim().toUpperCase();
      if (clean === 'AUREFFLE10' || clean === 'ROYALVIP') {
        setPromoCode(clean);
        // Calculate 10% discount on raw subtotal
        const rawSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
        setDiscountAmount(rawSubtotal * 0.1);
        success('Privilege Code Applied', '10% VIP Connoisseur discount deducted');
        return true;
      }
      return false;
    },
    [items, success]
  );

  const removePromoCode = useCallback(() => {
    setPromoCode('');
    setDiscountAmount(0);
    info('Privilege code removed');
  }, [info]);

  const subtotalRaw = useMemo(() => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totals = useMemo(() => {
    return calculateOrderTotals(subtotalRaw, discountAmount);
  }, [subtotalRaw, discountAmount]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal: totals.subtotal,
        serviceCharge: totals.serviceCharge,
        gst: totals.gst,
        discount: totals.discount,
        grandTotal: totals.grandTotal,
        promoCode,
        isCartOpen,
        setIsCartOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
