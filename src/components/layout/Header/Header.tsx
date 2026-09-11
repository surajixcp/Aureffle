import React, { useState } from 'react';
import { ActiveTab } from '@/types/common';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { Button } from '@/components/ui/Button/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useScrollPosition } from '@/hooks/useCommonHooks';
import { ShoppingBag, Calendar, Menu as MenuIcon, User as UserIcon, Crown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300 border-b',
          isScrolled
            ? 'bg-[#080d1a]/95 backdrop-blur-md border-[#c6a252]/20 py-3 shadow-xl shadow-black/40'
            : 'bg-[#080d1a]/80 backdrop-blur-sm border-[#c6a252]/10 py-4 sm:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* ZONE 1: Brand logo image */}
            <button
              onClick={() => onNavigate('home')}
              className="text-left flex items-center transition-transform hover:scale-[1.03] shrink-0 cursor-pointer"
              aria-label="Aureffle Cafe Home"
            >
              <img
                src="/assets/logo.png"
                alt="Aureffle Cafe Logo"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(198,162,82,0.3)]"
              />
            </button>

            {/* ZONE 2: Nav links */}
            <DesktopNav activeTab={activeTab} onNavigate={onNavigate} />

            {/* ZONE 3: Actions */}
            <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
              {/* Account / User Menu Button */}
              <div className="relative">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={cn(
                      'flex items-center gap-2 p-1.5 pr-3 rounded-full text-xs font-medium transition-all cursor-pointer border',
                      activeTab === 'auth'
                        ? 'bg-[#c6a252]/20 border-[#c6a252] text-[#f4ecce]'
                        : 'bg-white/5 border-[#c6a252]/30 text-[#ded5c0] hover:border-[#c6a252]/60 hover:text-white'
                    )}
                    aria-label="User Account Menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c6a252] to-[#8a6b24] flex items-center justify-center font-bold text-[#080d1a] text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden md:inline-block max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <Crown className="w-3 h-3 text-[#c6a252]" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('auth')}
                    className={cn(
                      'flex items-center gap-1.5 py-2 px-3 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer border',
                      activeTab === 'auth'
                        ? 'bg-[#c6a252] border-[#c6a252] text-[#080d1a] font-semibold'
                        : 'bg-white/5 border-[#c6a252]/25 text-[#ded5c0] hover:border-[#c6a252]/50 hover:text-white'
                    )}
                    aria-label="Sign In or Register"
                  >
                    <UserIcon className="w-4 h-4 text-[#c6a252]" />
                    <span className="hidden sm:inline-block">Sign In</span>
                  </button>
                )}

                {/* Logged in User Dropdown Popover */}
                {userDropdownOpen && isAuthenticated && user && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0c1426] border border-[#c6a252]/30 shadow-2xl p-4 z-50 space-y-3">
                      <div className="pb-3 border-b border-[#c6a252]/15">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-[#ded5c0]/70 truncate">{user.email}</p>
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-[#c6a252]/20 text-[#f4ecce] border border-[#c6a252]/30 font-semibold">
                          <Crown className="w-3 h-3 text-[#c6a252]" />
                          {user.tier}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onNavigate('auth');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#ded5c0] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span>Privilège Dashboard</span>
                          <span className="text-[10px] text-[#c6a252] font-semibold">{user.loyaltyPoints} Pts</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onNavigate('booking');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#ded5c0] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          My Reservations ({user.reservationsCount})
                        </button>
                      </div>

                      <div className="pt-2 border-t border-[#c6a252]/15">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-300 hover:bg-rose-950/40 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Cart Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full text-[#ded5c0] hover:text-[#c6a252] hover:bg-white/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a252]"
                aria-label={`Open shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#c6a252] text-[#080d1a] text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Table Booking CTA */}
              <Button
                variant="gold-solid"
                size="sm"
                className="hidden sm:inline-flex"
                leftIcon={<Calendar className="w-3.5 h-3.5" />}
                onClick={() => onNavigate('booking')}
              >
                Reserve Table
              </Button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#ded5c0] hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Open mobile menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        onNavigate={onNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={itemCount}
      />
    </>
  );
};
