import React from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
  titleSize = 'lg',
}) => {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-3xl sm:text-4xl lg:text-5xl',
    xl: 'text-4xl sm:text-5xl lg:text-6xl',
  };

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        centered ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div className={cn('inline-flex items-center gap-3 mb-3', centered && 'justify-center')}>
          <span className="w-6 h-[1px] bg-[#c6a252]/60" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#c6a252]">
            {eyebrow}
          </span>
          <span className="w-6 h-[1px] bg-[#c6a252]/60" />
        </div>
      )}
      <h2
        className={cn(
          'font-serif font-normal text-[#fcfbf9] tracking-tight leading-[1.15]',
          sizeClasses[titleSize]
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-[#ded5c0]/80 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};
