import React, { useState } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { PriceTag } from '@/components/menu/PriceTag/PriceTag';
import { useCart } from '@/context/CartContext';
import { ActiveTab } from '@/types/common';
import { OrderType } from '@/types/order';
import { formatSGD } from '@/lib/utils/currency';
import { generateOrderNumber } from '@/lib/utils/formatters';
import {
  ShoppingBag,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CheckoutPageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    items,
    subtotal,
    serviceCharge,
    gst,
    discount,
    grandTotal,
    clearCart,
  } = useCart();

  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 08');
  const [pickupTime, setPickupTime] = useState('In 15 minutes');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paynow' | 'apple-pay'>('card');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    itemsCount: number;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (confirmedOrder) {
    return (
      <div className="py-16 bg-[#080d1a] min-h-screen flex items-center">
        <Container size="md">
          <div className="p-8 sm:p-12 rounded-3xl luxury-glass border border-[#c6a252]/40 shadow-2xl bg-[#0c1426] text-center space-y-8">
            <div className="w-16 h-16 rounded-full bg-[#c6a252]/15 text-[#c6a252] flex items-center justify-center mx-auto border border-[#c6a252]/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold">
                Order Placed Successfully
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Our Baristas &amp; Chefs Are Preparing Your Selection
              </h1>
              <p className="text-sm text-[#ded5c0]/75 max-w-md mx-auto font-light">
                Order reference <strong className="text-white font-mono">{confirmedOrder.orderNumber}</strong> has been transmitted directly to our kitchen &amp; siphon counter.
              </p>
            </div>

            {/* Live Progress Timeline */}
            <div className="p-6 rounded-2xl bg-[#101c34] border border-[#c6a252]/25 max-w-lg mx-auto text-left space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase text-[#ded5c0]/70 font-semibold">
                  Live Preparation Status
                </span>
                <span className="text-xs text-[#c6a252] font-semibold animate-pulse">
                  ● In Progress (ETA ~12 mins)
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#c6a252] text-[#080d1a] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Order Received &amp; Verified</p>
                    <p className="text-[11px] text-[#ded5c0]/60">Payment authorized via secure token</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#c6a252]/20 border border-[#c6a252] text-[#c6a252] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 animate-pulse">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#f4ecce]">Barista Grinding &amp; Siphon Extraction</p>
                    <p className="text-[11px] text-[#ded5c0]/60">Single-origin lot weighed to 0.1g precision</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-5 h-5 rounded-full bg-white/10 text-white/50 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Plating &amp; Tableside Delivery</p>
                    <p className="text-[11px] text-[#ded5c0]/60">Dispatched directly to {tableNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold-solid"
                size="md"
                onClick={() => {
                  setConfirmedOrder(null);
                  onNavigate('menu');
                }}
              >
                Back to Menu Repertoire
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 bg-[#080d1a] min-h-[70vh] flex items-center">
        <Container size="sm" className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#101c34] text-[#c6a252]/60 flex items-center justify-center mx-auto border border-[#c6a252]/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl text-white font-normal">
              Your Order is Currently Empty
            </h2>
            <p className="text-sm text-[#ded5c0]/70 font-light max-w-md mx-auto">
              Please browse our culinary creations and add your selections before proceeding to checkout.
            </p>
          </div>
          <Button
            variant="gold-solid"
            size="lg"
            onClick={() => onNavigate('menu')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Repertoire
          </Button>
        </Container>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8)
      newErrors.phone = 'Mobile number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = generateOrderNumber();
      const totalSnapshot = grandTotal;
      const countSnapshot = items.length;
      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder({
        orderNumber: orderNum,
        total: totalSnapshot,
        itemsCount: countSnapshot,
      });
    }, 1200);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#080d1a] min-h-screen">
      <Container size="lg" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold px-3.5 py-1.5 rounded-full luxury-glass border border-[#c6a252]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Gastronomy Checkout</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            Finalize Your Order
          </h1>
          <p className="text-sm sm:text-base text-[#ded5c0]/80 font-light max-w-xl mx-auto leading-relaxed">
            Review your single-origin selections, dining location, and contactless payment.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Order Details & Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dining Style Selector */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-4">
                <h3 className="font-serif text-xl text-white font-normal">
                  Dining Style &amp; Timing
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dine-in' as OrderType, label: 'Dine-In Salon' },
                    { id: 'takeaway' as OrderType, label: 'Artisan Takeaway' },
                    { id: 'preorder' as OrderType, label: 'Pre-Order' },
                  ].map((type) => {
                    const active = orderType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setOrderType(type.id)}
                        className={cn(
                          'py-3 px-2 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center',
                          active
                            ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252] shadow-md'
                            : 'bg-[#101c34] text-[#ded5c0] border-white/10 hover:border-white/30'
                        )}
                      >
                        {type.label}
                      </button>
                    );
                  })}
                </div>

                {orderType === 'dine-in' && (
                  <div className="pt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0] mb-1.5">
                      Salon Table Number / Seating Area
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g., Table 12 or Barista Counter Seat 3"
                      className="w-full bg-[#101c34] text-white text-xs px-4 py-2.5 rounded-lg border border-[#c6a252]/30 focus:outline-none focus:border-[#c6a252]"
                    />
                  </div>
                )}

                {orderType === 'takeaway' && (
                  <div className="pt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0] mb-1.5">
                      Desired Pickup Window
                    </label>
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="e.g., In 15 minutes, or 2:30 PM"
                      className="w-full bg-[#101c34] text-white text-xs px-4 py-2.5 rounded-lg border border-[#c6a252]/30 focus:outline-none focus:border-[#c6a252]"
                    />
                  </div>
                )}
              </div>

              {/* Guest Details */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-4">
                <h3 className="font-serif text-xl text-white font-normal">
                  Guest Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      label="Full Name *"
                      placeholder="e.g., Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      error={errors.fullName}
                      required
                    />
                  </div>
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="e.g., sarah@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Mobile Number *"
                    placeholder="e.g., +65 9876 5432"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-4">
                <h3 className="font-serif text-xl text-white font-normal">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'card' as const, label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'apple-pay' as const, label: 'Apple Pay', icon: <Sparkles className="w-4 h-4" /> },
                    { id: 'paynow' as const, label: 'Singapore PayNow QR', icon: <QrCode className="w-4 h-4" /> },
                  ].map((p) => {
                    const active = paymentMethod === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={cn(
                          'p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer',
                          active
                            ? 'bg-[#c6a252]/20 text-[#f4ecce] border-[#c6a252]'
                            : 'bg-[#101c34] text-[#ded5c0] border-white/10 hover:border-white/30'
                        )}
                      >
                        <span className={cn(active ? 'text-[#c6a252]' : 'text-[#ded5c0]/60')}>
                          {p.icon}
                        </span>
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Col: Order Summary & Placement */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/30 shadow-2xl space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-[#c6a252]/15 pb-4">
                <h3 className="font-serif text-2xl text-white font-normal">
                  Order Summary
                </h3>
                <span className="text-xs text-[#c6a252] font-semibold">
                  {items.length} items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs pb-2 border-b border-white/5"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-medium text-white truncate">
                        {item.quantity}x {item.menuItem.name}
                      </p>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <p className="text-[10px] text-[#c6a252] truncate">
                          {item.selectedOptions.map((o) => o.optionName).join(', ')}
                        </p>
                      )}
                    </div>
                    <PriceTag price={item.totalPrice} size="sm" />
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-[#ded5c0]/80 pt-2 border-t border-white/10">
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
                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-sm font-semibold text-white">
                  <span className="font-serif text-lg">Grand Total</span>
                  <PriceTag price={grandTotal} size="lg" />
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="gold-solid"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Place Order • {formatSGD(grandTotal)}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#ded5c0]/60 font-light">
                <ShieldCheck className="w-4 h-4 text-[#c6a252]" />
                <span>256-bit encrypted hospitality transaction</span>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
