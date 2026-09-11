import React from 'react';
import { MENU_CATEGORIES } from '@/data/menu/categories';
import { CategoryId } from '@/types/menu';
import {
  Sparkles,
  Coffee,
  Feather,
  Utensils,
  Wine,
  Croissant,
  Cake,
  Egg,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Feather':
        return <Feather className="w-4 h-4" />;
      case 'Croissant':
        return <Croissant className="w-4 h-4" />;
      case 'Cake':
        return <Cake className="w-4 h-4" />;
      case 'Egg':
        return <Egg className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      case 'Wine':
        return <Wine className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all border whitespace-nowrap cursor-pointer shrink-0',
                isActive
                  ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252] shadow-lg shadow-[#c6a252]/20'
                  : 'bg-[#101c34]/70 text-[#ded5c0] border-[#c6a252]/20 hover:border-[#c6a252]/60 hover:text-white'
              )}
            >
              <span className={cn(isActive ? 'text-[#080d1a]' : 'text-[#c6a252]')}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
