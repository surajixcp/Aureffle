import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[#ded5c0]/50 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-[#101c34]/80 text-[#f4f1ea] placeholder-[#ded5c0]/35 border border-[#c6a252]/25 rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:border-[#c6a252] focus:ring-1 focus:ring-[#c6a252]',
              leftIcon && 'pl-10',
              error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-[#ded5c0]/60 font-light">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
