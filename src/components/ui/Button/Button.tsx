import React from 'react';
import { ButtonProps } from './button.types';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold-solid',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a252] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-semibold',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2 font-semibold',
    lg: 'text-sm sm:text-base px-7 py-3.5 gap-2.5 font-semibold tracking-widest',
  };

  const variantStyles = {
    'gold-solid':
      'bg-[#c6a252] text-[#080d1a] hover:bg-[#d4af37] shadow-lg shadow-[#c6a252]/20 hover:shadow-[#c6a252]/40 border border-[#c6a252]',
    'gold-outline':
      'bg-transparent text-[#d4af37] border border-[#c6a252]/60 hover:border-[#c6a252] hover:bg-[#c6a252]/10 hover:text-white',
    'navy-solid':
      'bg-[#101c34] text-[#f4f1ea] hover:bg-[#1b2f56] border border-[#c6a252]/20 hover:border-[#c6a252]/40',
    ghost:
      'bg-transparent text-[#ded5c0] hover:text-[#c6a252] hover:bg-[#c6a252]/10',
    glass:
      'luxury-glass text-white hover:border-[#c6a252] hover:bg-[#142442]/80 shadow-md',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
