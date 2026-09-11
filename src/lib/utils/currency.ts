/**
 * Currency and pricing formatting for Aureffle Cafe (Singapore SGD standard)
 */
export function formatSGD(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates standard Singapore F&B breakdown (10% Service Charge + 9% GST)
 */
export function calculateOrderTotals(subtotal: number, discount: number = 0) {
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const serviceCharge = discountedSubtotal * 0.10; // 10% Service Charge
  const gst = (discountedSubtotal + serviceCharge) * 0.09; // 9% GST on subtotal + svc
  const grandTotal = discountedSubtotal + serviceCharge + gst;

  return {
    subtotal: discountedSubtotal,
    serviceCharge,
    gst,
    discount,
    grandTotal,
  };
}
