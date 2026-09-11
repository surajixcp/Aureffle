import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { CartDrawerItem } from './CartDrawerItem';
import { Button } from '@/components/ui/Button/Button';
import { PriceTag } from '@/components/menu/PriceTag/PriceTag';
import { ActiveTab } from '@/types/common';
import { formatSGD } from '@/lib/utils/currency';
import {
  X,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    itemCount,
    subtotal,
    serviceCharge,
    gst,
    discount,
    grandTotal,
    promoCode,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!inputCode.trim()) return;

    const valid = applyPromoCode(inputCode);
    if (!valid) {
      setPromoError('Invalid privilege code. Try: AUREFFLE10');
    } else {
      setInputCode('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigate('checkout');
  };

  const handleBrowseMenu = () => {
    setIsCartOpen(false);
    onNavigate('menu');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-md bg-[#080d1a] border-l border-[#c6a252]/20 h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#c6a252]/15 flex items-center justify-between bg-[#0c1426]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#c6a252]" />
                <h3 className="font-serif text-xl text-white font-normal">
                  Your Gastronomic Order
                </h3>
                <span className="text-xs text-[#c6a252] font-semibold px-2 py-0.5 rounded-full bg-[#c6a252]/15">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#ded5c0]/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                aria-label="Close order drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#101c34] flex items-center justify-center text-[#c6a252]/60 border border-[#c6a252]/20">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h4 className="font-serif text-lg text-white font-normal">
                      Your Order is Empty
                    </h4>
                    <p className="text-xs text-[#ded5c0]/70 leading-relaxed font-light">
                      Select your single-origin pour-overs, artisanal bakes, and culinary masterpieces from our repertoire.
                    </p>
                  </div>
                  <Button
                    variant="gold-solid"
                    size="sm"
                    onClick={handleBrowseMenu}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Explore The Menu
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        item={item}
                        onUpdateQty={(delta) => updateQuantity(item.id, delta)}
                        onRemove={() => removeItem(item.id)}
                      />
                    ))}
                  </div>

                  {/* Privilege Promo Code Box */}
                  <div className="pt-4 border-t border-[#c6a252]/15">
                    {promoCode ? (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#c6a252]/10 border border-[#c6a252]/40 text-xs">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-[#c6a252]" />
                          <div>
                            <span className="font-bold text-[#f4ecce]">{promoCode}</span>
                            <span className="text-[#ded5c0]/70 ml-1.5">(10% VIP Deducted)</span>
                          </div>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="space-y-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="Privilege Code (e.g. AUREFFLE10)"
                            className="flex-1 bg-[#101c34] text-white text-xs px-3 py-2 rounded-lg border border-[#c6a252]/20 focus:outline-none focus:border-[#c6a252]"
                          />
                          <button
                            type="submit"
                            className="text-xs uppercase font-semibold px-3 py-2 bg-[#1b2f56] hover:bg-[#c6a252] hover:text-[#080d1a] text-[#f4ecce] rounded-lg transition-colors border border-[#c6a252]/30 cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        {promoError && (
                          <p className="text-[11px] text-rose-400 pl-1">{promoError}</p>
                        )}
                      </form>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#c6a252]/20 bg-[#0c1426] space-y-4">
                {/* Breakdown */}
                <div className="space-y-1.5 text-xs text-[#ded5c0]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">{formatSGD(subtotal + discount)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#c6a252]">
                      <span>VIP Privilege Discount</span>
                      <span>-{formatSGD(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Service Charge (10%)</span>
                    <span className="text-white">{formatSGD(serviceCharge)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Singapore GST (9%)</span>
                    <span className="text-white">{formatSGD(gst)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm font-semibold text-white">
                    <span className="font-serif text-base">Grand Total (SGD)</span>
                    <PriceTag price={grandTotal} size="lg" />
                  </div>
                </div>

                {/* Checkout CTA */}
                <Button
                  variant="gold-solid"
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleCheckoutClick}
                >
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#ded5c0]/60 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c6a252]" />
                  <span>Complimentary tableside dining concierge</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
