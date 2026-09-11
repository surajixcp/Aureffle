import React from 'react';
import { DietaryTag } from '@/types/menu';
import { cn } from '@/lib/utils/cn';

interface DietaryBadgeProps {
  tag: DietaryTag;
  className?: string;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({ tag, className }) => {
  const getBadgeStyle = (t: DietaryTag) => {
    switch (t) {
      case 'Signature':
        return 'bg-[#c6a252]/20 text-[#f4ecce] border-[#c6a252]/50 font-bold';
      case 'Chef Choice':
        return 'bg-amber-900/30 text-amber-200 border-amber-500/40';
      case 'Vegan':
      case 'Vegetarian':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
      case 'Gluten-Free':
        return 'bg-sky-950/40 text-sky-200 border-sky-500/30';
      default:
        return 'bg-white/5 text-[#ded5c0]/90 border-white/10';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] uppercase font-semibold px-2 py-0.5 rounded border whitespace-nowrap tracking-wider',
        getBadgeStyle(tag),
        className
      )}
    >
      {tag}
    </span>
  );
};
