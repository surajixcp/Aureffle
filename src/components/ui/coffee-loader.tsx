import React from 'react';

interface CoffeeLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const CoffeeLoader: React.FC<CoffeeLoaderProps> = ({
  size = 'md',
  text = 'Brewing Aureffle Experience...',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {/* Animated Coffee SVG Loader from public/assets/svg/coffe.svg */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <img
          src="/assets/svg/coffe.svg"
          alt="Coffee Loader"
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(198,162,82,0.5)] animate-pulse"
        />

        {/* Ambient Ring Pulse */}
        <div className="absolute inset-0 rounded-full border border-[#ffe600]/40 animate-ping pointer-events-none" />
      </div>

      {text && (
        <p className="font-serif text-sm tracking-widest uppercase text-[#ffe600] animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};
