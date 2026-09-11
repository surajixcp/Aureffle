import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  variant?: 'gold' | 'navy' | 'subtle' | 'outline';
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  className,
  size = 'sm',
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 tracking-wider font-semibold',
    md: 'text-xs px-3 py-1 tracking-wider font-semibold',
  };

  const variantClasses = {
    gold: 'bg-[#c6a252]/15 text-[#f4ecce] border border-[#c6a252]/30',
    navy: 'bg-[#142442] text-[#f4f1ea] border border-[#26437a]',
    subtle: 'bg-white/5 text-[#ded5c0] border border-white/10',
    outline: 'bg-transparent text-[#c6a252] border border-[#c6a252]/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center uppercase rounded-full whitespace-nowrap shrink-0',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
