import React from 'react';
import { CartItem } from '@/types/order';
import { PriceTag } from '@/components/menu/PriceTag/PriceTag';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartDrawerItemProps {
  item: CartItem;
  onUpdateQty: (delta: number) => void;
  onRemove: () => void;
}

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
  item,
  onUpdateQty,
  onRemove,
}) => {
  return (
    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#101c34]/70 border border-[#c6a252]/15 hover:border-[#c6a252]/30 transition-all">
      {/* Item Image */}
      <img
        src={item.menuItem.image}
        alt={item.menuItem.name}
        className="w-16 h-16 rounded-lg object-cover bg-[#0c1426] shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-white truncate leading-tight">
            {item.menuItem.name}
          </h4>
          <PriceTag price={item.totalPrice} size="sm" className="shrink-0" />
        </div>

        {/* Selected custom options */}
        {item.selectedOptions && item.selectedOptions.length > 0 && (
          <div className="text-[11px] text-[#c6a252] space-y-0.5">
            {item.selectedOptions.map((opt, i) => (
              <span key={i} className="block truncate">
                • {opt.groupName}: {opt.optionName}
              </span>
            ))}
          </div>
        )}

        {/* Special Instructions note */}
        {item.specialInstructions && (
          <p className="text-[10px] text-[#ded5c0]/60 italic truncate">
            Note: {item.specialInstructions}
          </p>
        )}

        {/* Quantity Controls & Delete */}
        <div className="pt-1.5 flex items-center justify-between">
          <div className="flex items-center border border-white/10 rounded bg-[#080d1a]">
            <button
              onClick={() => onUpdateQty(-1)}
              className="p-1 text-[#ded5c0]/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Decrease item quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs font-semibold text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(1)}
              className="p-1 text-[#ded5c0]/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Increase item quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onRemove}
            className="p-1 text-[#ded5c0]/50 hover:text-rose-400 transition-colors cursor-pointer"
            aria-label="Remove item from cart"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
