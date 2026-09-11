import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_ITEMS } from '@/data/navigation/navigation';
import { ActiveTab } from '@/types/common';
import { Button } from '@/components/ui/Button/Button';
import { SITE_CONFIG } from '@/lib/constants/site';
import { useAuth } from '@/context/AuthContext';
import { X, Calendar, ShoppingBag, MapPin, Phone, Clock, User, Crown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  onOpenCart,
  cartCount,
}) => {
  const { user, isAuthenticated } = useAuth();

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative ml-auto w-full max-w-sm bg-[#080d1a] border-l border-[#c6a252]/20 h-full flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#c6a252]/15">
                <img
                  src="/assets/logo.png"
                  alt="Aureffle Cafe Logo"
                  className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(198,162,82,0.3)] select-none"
                />
                <button
                  onClick={onClose}
                  className="p-2 text-[#ded5c0] hover:text-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Bar in Mobile Menu */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#101c34]/70 border border-[#c6a252]/20 flex items-center justify-between">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => handleNavClick('auth')}
                    className="flex items-center gap-3 text-left w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c6a252] to-[#8a6b24] flex items-center justify-center font-bold text-[#080d1a] text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-[#c6a252] font-medium flex items-center gap-1">
                        <Crown className="w-2.5 h-2.5" /> {user.tier}
                      </p>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick('auth')}
                    className="flex items-center justify-between w-full text-xs font-medium text-[#f4ecce] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#c6a252]" />
                      Sign In / Le Cercle Privilège
                    </span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#c6a252]/20 text-[#f4ecce] border border-[#c6a252]/40">
                      Join
                    </span>
                  </button>
                )}
              </div>

              {/* Navigation Items */}
              <nav className="py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleNavClick(item.tab)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3.5 rounded-lg text-left text-sm uppercase tracking-[0.2em] font-medium transition-all cursor-pointer',
                        isActive
                          ? 'bg-[#101c34] text-[#f4ecce] border-l-2 border-[#c6a252]'
                          : 'text-[#ded5c0]/80 hover:bg-[#101c34]/50 hover:text-white'
                      )}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#c6a252]/20 text-[#f4ecce] border border-[#c6a252]/40">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="pt-2 pb-6 space-y-3">
                <Button
                  variant="gold-solid"
                  size="md"
                  className="w-full"
                  leftIcon={<Calendar className="w-4 h-4" />}
                  onClick={() => handleNavClick('booking')}
                >
                  Reserve a Table
                </Button>
                <Button
                  variant="gold-outline"
                  size="md"
                  className="w-full"
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                >
                  View Order ({cartCount})
                </Button>
              </div>
            </div>

            {/* Bottom Concierge Quick Info */}
            <div className="pt-6 border-t border-[#c6a252]/15 text-xs text-[#ded5c0]/70 space-y-2 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c6a252] shrink-0" />
                <span>{SITE_CONFIG.location.address}, {SITE_CONFIG.location.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c6a252] shrink-0" />
                <span>Tue–Thu: 1:30–10 PM | Fri–Sat: 2 PM–12 AM | Sun: 2–10 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c6a252] shrink-0" />
                <a href={`tel:${SITE_CONFIG.location.phone}`} className="hover:text-[#c6a252]">{SITE_CONFIG.location.phone}</a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
