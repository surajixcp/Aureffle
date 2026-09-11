import React, { useState, useEffect, useMemo } from 'react';
import { MenuItem } from '@/types/menu';
import { SelectedOption } from '@/types/order';
import { Modal } from '@/components/ui/Modal/Modal';
import { PriceTag } from '../PriceTag/PriceTag';
import { DietaryBadge } from '../DietaryBadge/DietaryBadge';
import { Button } from '@/components/ui/Button/Button';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS } from '@/data/menu/menu-items';
import { formatSGD } from '@/lib/utils/currency';
import { Plus, Minus, Check, Sparkles, Clock, Flame, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPairing?: (item: MenuItem) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onSelectPairing,
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { optionName: string; priceDelta: number }>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSpecialInstructions('');
      const defaults: Record<string, { optionName: string; priceDelta: number }> = {};
      item.customizationGroups?.forEach((group) => {
        if (group.required && group.options.length > 0) {
          defaults[group.name] = {
            optionName: group.options[0].name,
            priceDelta: group.options[0].priceDelta,
          };
        }
      });
      setSelectedOptions(defaults);
    }
  }, [item]);

  if (!item) return null;

  const handleOptionSelect = (groupName: string, optionName: string, priceDelta: number) => {
    setSelectedOptions((prev) => {
      // If same is clicked in non-required group, deselect it
      const current = prev[groupName];
      const isRequired = item.customizationGroups?.find((g) => g.name === groupName)?.required;

      if (!isRequired && current?.optionName === optionName) {
        const next = { ...prev };
        delete next[groupName];
        return next;
      }

      return {
        ...prev,
        [groupName]: { optionName, priceDelta },
      };
    });
  };

  const currentUnitPrice = useMemo(() => {
    const extras = Object.values(selectedOptions).reduce((acc: number, opt: { priceDelta: number }) => acc + opt.priceDelta, 0);
    return item.price + extras;
  }, [item.price, selectedOptions]);

  const totalCalculated = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    const formattedOptions: SelectedOption[] = Object.entries(selectedOptions).map(
      ([groupName, val]: [string, { optionName: string; priceDelta: number }]) => ({
        groupName,
        optionName: val.optionName,
        priceDelta: val.priceDelta,
      })
    );

    addItem(item, quantity, formattedOptions, specialInstructions);
    onClose();
  };

  // Find paired items from dataset
  const pairedItems = (item.pairings || [])
    .map((id) => MENU_ITEMS.find((m) => m.id === id))
    .filter(Boolean) as MenuItem[];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-6">
        {/* Top Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Image */}
          <div className="md:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#c6a252]/30 shadow-xl bg-[#101c34]">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {item.featured && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-[#c6a252] text-[#080d1a] shadow-md">
                  <Sparkles className="w-3 h-3" />
                  Signature Masterpiece
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                {item.name}
              </h2>
              {item.frenchName && (
                <p className="text-sm text-[#c6a252] italic font-serif mt-0.5">
                  {item.frenchName}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <PriceTag price={item.price} size="lg" />
              <div className="flex flex-wrap gap-1.5">
                {item.dietary.map((tag) => (
                  <DietaryBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>

            <p className="text-sm text-[#ded5c0]/85 font-light leading-relaxed">
              {item.description}
            </p>

            {/* Origin, Prep Time, Calories Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {item.origin && (
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[#ded5c0]/60 block text-[10px] uppercase">Terroir / Origin</span>
                  <span className="text-white font-medium truncate block">{item.origin}</span>
                </div>
              )}
              {item.prepTimeMinutes && (
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[#ded5c0]/60 block text-[10px] uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#c6a252]" /> Prep Time
                  </span>
                  <span className="text-white font-medium block">~{item.prepTimeMinutes} mins</span>
                </div>
              )}
              {item.calories && (
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[#ded5c0]/60 block text-[10px] uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> Energy
                  </span>
                  <span className="text-white font-medium block">{item.calories} kcal</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tasting Notes */}
        {item.tastingNotes && item.tastingNotes.length > 0 && (
          <div className="p-3.5 rounded-lg bg-[#101c34]/60 border border-[#c6a252]/20 space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c6a252]">
              Sommelier Tasting Notes
            </span>
            <div className="flex flex-wrap gap-2">
              {item.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="text-xs text-[#ded5c0] px-2.5 py-1 rounded bg-black/40 border border-white/10"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Customization Options */}
        {item.customizationGroups && item.customizationGroups.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-[#c6a252]/15">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a252]">
              Bespoke Customization
            </h4>
            <div className="space-y-4">
              {item.customizationGroups.map((group) => (
                <div key={group.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white uppercase tracking-wider">
                      {group.name}
                    </span>
                    <span className="text-[#ded5c0]/60">
                      {group.required ? '(Required)' : '(Optional)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.options.map((opt) => {
                      const isSelected =
                        selectedOptions[group.name]?.optionName === opt.name;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() =>
                            handleOptionSelect(group.name, opt.name, opt.priceDelta)
                          }
                          className={cn(
                            'flex items-center justify-between p-3 rounded-lg text-left text-xs transition-all border cursor-pointer',
                            isSelected
                              ? 'bg-[#c6a252]/20 border-[#c6a252] text-white'
                              : 'bg-[#101c34]/50 border-white/10 text-[#ded5c0] hover:border-white/30'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'w-4 h-4 rounded-full flex items-center justify-center border text-[9px]',
                                isSelected
                                  ? 'bg-[#c6a252] border-[#c6a252] text-[#080d1a]'
                                  : 'border-white/30 text-transparent'
                              )}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span className="font-medium">{opt.name}</span>
                          </div>
                          {opt.priceDelta > 0 && (
                            <span className="text-[#c6a252] font-semibold ml-2 shrink-0">
                              +{formatSGD(opt.priceDelta)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        <div className="space-y-2 pt-2 border-t border-[#c6a252]/15">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0]">
            Chef Special Notes &amp; Dietary Allergies (Optional)
          </label>
          <input
            type="text"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="e.g., Serve milk on side, extra hot, no nuts allergy note"
            className="w-full bg-[#101c34] text-white placeholder-[#ded5c0]/35 text-xs px-3.5 py-2.5 rounded-lg border border-[#c6a252]/20 focus:outline-none focus:border-[#c6a252]"
          />
        </div>

        {/* Recommended Pairings */}
        {pairedItems.length > 0 && (
          <div className="pt-2 border-t border-[#c6a252]/15 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#c6a252]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Gastronomic Pairing</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pairedItems.map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => onSelectPairing?.(pair)}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#c6a252]/40 transition-colors cursor-pointer"
                >
                  <img
                    src={pair.image}
                    alt={pair.name}
                    className="w-12 h-12 rounded object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white truncate">{pair.name}</p>
                    <p className="text-[11px] text-[#c6a252]">{formatSGD(pair.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Sticky Action Row */}
        <div className="pt-4 border-t border-[#c6a252]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <span className="text-xs uppercase tracking-wider text-[#ded5c0] font-semibold">
              Quantity
            </span>
            <div className="flex items-center border border-[#c6a252]/40 rounded-lg overflow-hidden bg-[#101c34]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-white/10 text-[#ded5c0] hover:text-white transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-white tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-white/10 text-[#ded5c0] hover:text-white transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Order Button */}
          <Button
            variant="gold-solid"
            size="lg"
            className="w-full sm:w-auto flex-1 max-w-sm"
            onClick={handleAddToCart}
          >
            Add to Order • {formatSGD(totalCalculated)}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
