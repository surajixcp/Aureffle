import React from 'react';

export const MenuCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0c1426]/90 rounded-xl overflow-hidden border border-[#c6a252]/10 animate-pulse flex flex-col justify-between">
      <div className="aspect-[4/3] bg-[#142442]/60 w-full" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-[#142442] rounded w-3/4" />
          <div className="h-3 bg-[#142442]/60 rounded w-1/2" />
          <div className="h-3 bg-[#142442]/40 rounded w-full" />
          <div className="h-3 bg-[#142442]/40 rounded w-4/5" />
        </div>
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="h-4 bg-[#142442] rounded w-16" />
          <div className="h-7 bg-[#142442] rounded w-20" />
        </div>
      </div>
    </div>
  );
};
