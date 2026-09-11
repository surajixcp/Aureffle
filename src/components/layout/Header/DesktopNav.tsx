import React from 'react';
import { NAV_ITEMS } from '@/data/navigation/navigation';
import { ActiveTab } from '@/types/common';
import { cn } from '@/lib/utils/cn';

interface DesktopNavProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ activeTab, onNavigate }) => {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onNavigate(item.tab)}
            className={cn(
              'relative py-2 text-xs xl:text-sm uppercase tracking-[0.18em] font-medium transition-all cursor-pointer whitespace-nowrap group',
              isActive
                ? 'text-[#f4ecce]'
                : 'text-[#ded5c0]/75 hover:text-white'
            )}
          >
            <span className="flex items-center gap-1.5">
              {item.label}
              {item.badge && (
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#c6a252]/20 text-[#f4ecce] border border-[#c6a252]/40 tracking-wider">
                  {item.badge}
                </span>
              )}
            </span>

            {/* Active Indicator Underline */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c6a252] shadow-[0_0_8px_#c6a252]" />
            )}
            {!isActive && (
              <span className="absolute bottom-0 left-1/2 right-1/2 h-[1px] bg-[#c6a252]/50 transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
