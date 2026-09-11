import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ActiveTab } from '@/types/common';
import { LoginPage } from '@/components/ui/sign-in-page';
import { SignupPage } from '@/components/ui/sign-up-page';
import { Button } from '@/components/ui/Button/Button';
import {
  Crown,
  Sparkles,
  Calendar,
  Coffee,
  Award,
  Check,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AuthPageProps {
  onNavigate?: (tab: ActiveTab) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, authMode, setAuthMode, logout } = useAuth();

  // If user is already authenticated, show the Account Dashboard View
  if (isAuthenticated && user) {
    return (
      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Glow ambient accent */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c6a252]/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-[#0c1426]/90 border border-[#c6a252]/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
          >
            {/* Header Header Banner */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#c6a252]/20">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#c6a252] to-[#8a6b24] p-[1.5px] shadow-xl shadow-[#c6a252]/20 shrink-0">
                  <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center font-display text-2xl sm:text-3xl font-bold text-[#f4ecce]">
                    {user.name.charAt(0)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-display font-light text-[#f4f1ea]">{user.name}</h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#c6a252]/20 text-[#f4ecce] border border-[#c6a252]/40 tracking-wider">
                      <Crown className="w-3.5 h-3.5 text-[#c6a252]" />
                      {user.tier}
                    </span>
                  </div>
                  <p className="text-sm text-[#ded5c0]/70 mt-1 font-light flex items-center gap-2">
                    <span>{user.email}</span>
                    <span className="w-1 h-1 rounded-full bg-[#c6a252]/60" />
                    <span>Member since {user.joinedDate}</span>
                  </p>
                </div>
              </div>

              <Button
                variant="gold-outline"
                size="md"
                onClick={logout}
                leftIcon={<LogOut className="w-4 h-4" />}
                className="shrink-0"
              >
                Sign Out
              </Button>
            </div>

            {/* Dashboard Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {/* Stat 1: Loyalty Points */}
              <div className="p-6 rounded-2xl bg-[#101b33]/60 border border-[#c6a252]/15 relative overflow-hidden group hover:border-[#c6a252]/40 transition-colors">
                <div className="flex items-center justify-between text-[#c6a252] mb-3">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-widest text-[#ded5c0]/60 font-medium">Aureffle Privilege</span>
                </div>
                <p className="text-3xl font-display text-white font-semibold">{user.loyaltyPoints.toLocaleString()} <span className="text-sm font-normal text-[#c6a252]">Pts</span></p>
                <p className="text-xs text-[#ded5c0]/70 mt-2">Next tier unlock at 2,000 points (Complimentary Tasting Flight)</p>
              </div>

              {/* Stat 2: Active Salon Reservations */}
              <div className="p-6 rounded-2xl bg-[#101b33]/60 border border-[#c6a252]/15 relative overflow-hidden group hover:border-[#c6a252]/40 transition-colors">
                <div className="flex items-center justify-between text-[#c6a252] mb-3">
                  <Calendar className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-widest text-[#ded5c0]/60 font-medium">Salon Visits</span>
                </div>
                <p className="text-3xl font-display text-white font-semibold">{user.reservationsCount} <span className="text-sm font-normal text-[#c6a252]">Completed</span></p>
                <p className="text-xs text-[#ded5c0]/70 mt-2">Priority table reservation status enabled</p>
              </div>

              {/* Stat 3: Curated Recommendation */}
              <div className="p-6 rounded-2xl bg-[#101b33]/60 border border-[#c6a252]/15 relative overflow-hidden group hover:border-[#c6a252]/40 transition-colors">
                <div className="flex items-center justify-between text-[#c6a252] mb-3">
                  <Coffee className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-widest text-[#ded5c0]/60 font-medium">Signature Pairing</span>
                </div>
                <p className="text-sm font-medium text-white line-clamp-1">{user.favoriteItem || 'Single-Origin Ethiopian Yirgacheffe'}</p>
                <p className="text-xs text-[#ded5c0]/70 mt-2">Prepared specially upon your reservation check-in</p>
              </div>
            </div>

            {/* Actions & Perks Container */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111e38] to-[#0c1426] border border-[#c6a252]/20">
              <h3 className="text-lg font-display text-[#f4f1ea] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#c6a252]" />
                Your Le Cercle Privilège Benefits
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#ded5c0]/90 font-light mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Check className="w-4 h-4 text-[#c6a252] shrink-0" />
                  <span>Priority Salon & Verandah Reservations</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Check className="w-4 h-4 text-[#c6a252] shrink-0" />
                  <span>Early Access to Limited Micro-Lot Releases</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Check className="w-4 h-4 text-[#c6a252] shrink-0" />
                  <span>Complimentary Viennoiserie Flight on your Birthday</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Check className="w-4 h-4 text-[#c6a252] shrink-0" />
                  <span>Complimentary Roastery Masterclass Invitation</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/10">
                {onNavigate && (
                  <>
                    <Button variant="gold-solid" size="md" onClick={() => onNavigate('booking')} rightIcon={<ChevronRight className="w-4 h-4" />}>
                      Reserve a Salon Table
                    </Button>
                    <Button variant="gold-outline" size="md" onClick={() => onNavigate('menu')}>
                      Explore Seasonal Menu
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (authMode === 'signup') {
    return (
      <SignupPage
        onNavigateHome={() => onNavigate?.('home')}
        onNavigateLogin={() => setAuthMode('login')}
      />
    );
  }

  return (
    <LoginPage
      onNavigateHome={() => onNavigate?.('home')}
      onNavigateSignup={() => setAuthMode('signup')}
    />
  );
};
