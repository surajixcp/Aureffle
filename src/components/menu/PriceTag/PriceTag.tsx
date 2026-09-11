import React from 'react';
import { formatSGD } from '@/lib/utils/currency';
import { cn } from '@/lib/utils/cn';

interface PriceTagProps {
  price: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl font-bold',
  };

  return (
    <span className={cn('font-sans text-[#f4ecce] tracking-tight tabular-nums', sizeClasses[size], className)}>
      {formatSGD(price)}
    </span>
  );
};
