import React from 'react';
import { MenuItem } from '@/types/menu';
import { PriceTag } from '../PriceTag/PriceTag';
import { DietaryBadge } from '../DietaryBadge/DietaryBadge';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useCommonHooks';
import { Plus, Heart, Sparkles, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  className?: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect, className }) => {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const hasCustomizations = Boolean(
    item.customizationGroups && item.customizationGroups.length > 0
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasCustomizations) {
      onSelect(item);
    } else {
      addItem(item, 1);
    }
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className={cn(
        'group relative bg-[#0c1426]/90 rounded-xl overflow-hidden border border-[#c6a252]/20 hover:border-[#c6a252]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between cursor-pointer',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#101c34]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1426] via-transparent to-black/30" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
          {item.featured && (
            <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-[#c6a252] text-[#080d1a] shadow-sm tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              Signature
            </span>
          )}
          {item.bestSeller && (
            <span className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[#f4ecce] border border-[#c6a252]/30 tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFav}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white/80 hover:text-white transition-all cursor-pointer"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn('w-4 h-4 transition-colors', favorite && 'fill-rose-500 text-rose-500')}
          />
        </button>

        {/* Origin Pill if Coffee / Single Estate */}
        {item.origin && (
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="text-[10px] text-[#ded5c0] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-light border border-white/10">
              {item.origin}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#fcfbf9] font-normal leading-snug group-hover:text-[#f4ecce] transition-colors">
                {item.name}
              </h3>
              {item.frenchName && (
                <p className="text-xs text-[#c6a252]/85 italic font-serif">
                  {item.frenchName}
                </p>
              )}
            </div>
            <PriceTag price={item.price} size="md" className="shrink-0 pt-0.5" />
          </div>

          <p className="text-xs sm:text-sm text-[#ded5c0]/70 line-clamp-2 leading-relaxed font-light">
            {item.description}
          </p>

          {/* Tasting Notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-1">
              {item.tastingNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="text-[10px] text-[#ded5c0]/60 bg-white/5 px-2 py-0.5 rounded-full font-light"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#c6a252]/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-hidden">
            {item.dietary.slice(0, 2).map((tag) => (
              <DietaryBadge key={tag} tag={tag} />
            ))}
          </div>

          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold py-1.5 px-3 rounded-md bg-[#c6a252]/15 hover:bg-[#c6a252] text-[#f4ecce] hover:text-[#080d1a] border border-[#c6a252]/30 hover:border-[#c6a252] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {hasCustomizations ? (
              <>
                <SlidersHorizontal className="w-3 h-3" />
                <span>Customize</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
