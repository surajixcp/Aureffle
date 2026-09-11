import React from 'react';
import { Sparkles } from 'lucide-react';
import { ActiveTab } from '@/types/common';

interface TopAnnouncementProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const TopAnnouncement: React.FC<TopAnnouncementProps> = ({ onNavigate }) => {
  return (
    <aside aria-label="Announcement" className="bg-[#050811] border-b border-[#c6a252]/20 text-[#ded5c0] text-xs py-2 px-4 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#c6a252] animate-pulse shrink-0" />
          <span className="truncate">
            <strong className="text-white font-medium">New Season Reserve:</strong> Rare Washed Panama Geisha &amp; Périgord Winter Truffle Series
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 shrink-0 text-[11px] uppercase tracking-wider">
          <button
            onClick={() => onNavigate('booking')}
            className="text-[#c6a252] hover:text-[#f4ecce] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Reserve Vault Table
          </button>
          <span className="text-white/20">|</span>
          <span className="text-[#ded5c0]/70">Marina Bay, Singapore • Open until 10 PM</span>
        </div>
      </div>
    </aside>
  );
};
