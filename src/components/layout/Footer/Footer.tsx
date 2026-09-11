import React, { useState } from 'react';
import { ActiveTab } from '@/types/common';
import { FOOTER_LINKS } from '@/data/navigation/navigation';
import { SITE_CONFIG } from '@/lib/constants/site';
import { Button } from '@/components/ui/Button/Button';
import { useToast } from '@/context/ToastContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Award,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { success, error } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      error('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    success('Welcome to Le Club Aureffle', 'You have been enrolled in exclusive seasonal tasting invites.');
    setEmail('');
  };

  return (
    <footer className="bg-[#050811] text-[#f4f1ea] border-t border-[#c6a252]/20 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Connoisseur Club Banner */}
        <div className="p-8 sm:p-10 rounded-2xl luxury-glass border border-[#c6a252]/30 mb-16 relative overflow-hidden bg-gradient-to-r from-[#0a1128] via-[#0c162e] to-[#0a1128]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold">
                <Award className="w-4 h-4" />
                <span>Le Club Connoisseur</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Receive Private Invitations to Rare Micro-Lot Cuvées
              </h3>
              <p className="text-sm text-[#ded5c0]/75 font-light leading-relaxed">
                Be the first to secure limited batch Geisha releases, seasonal pastry degustation previews, and private vault reservations.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-[#f4ecce] p-3 rounded-lg bg-[#c6a252]/15 border border-[#c6a252]/30">
                  <ShieldCheck className="w-5 h-5 text-[#c6a252]" />
                  <span>Invitation registered. Welcome to Aureffle Privilège.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-[#101c34] text-white placeholder-[#ded5c0]/40 text-sm px-4 py-3 rounded-lg border border-[#c6a252]/30 focus:outline-none focus:border-[#c6a252]"
                    required
                  />
                  <Button variant="gold-solid" size="md" rightIcon={<Send className="w-4 h-4" />}>
                    Join Club
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#c6a252]/15">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <button
              onClick={() => onNavigate('home')}
              className="text-left inline-block transition-transform hover:scale-[1.03] cursor-pointer"
              aria-label="Aureffle Cafe Home"
            >
              <img
                src="/assets/logo.png"
                alt="Aureffle Cafe Logo"
                className="h-11 sm:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(198,162,82,0.3)]"
              />
            </button>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold">
              Artisanal Coffee &amp; Haute Patisserie
            </p>
            <p className="text-sm text-[#ded5c0]/75 font-light leading-relaxed max-w-sm">
              A sanctuary of refined gastronomy in Singapore’s Kampong Glam heritage quarter. 100% Muslim-owned, celebrating viral handcrafted waffwiches, artisanal gelato, and specialty coffee.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#101c34] hover:bg-[#c6a252]/20 text-[#ded5c0] hover:text-[#c6a252] border border-[#c6a252]/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#101c34] hover:bg-[#c6a252]/20 text-[#ded5c0] hover:text-[#c6a252] border border-[#c6a252]/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: The Menu */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a252]">
              The Menu Repertoire
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              {FOOTER_LINKS.dining.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.tab)}
                    className="text-[#ded5c0]/80 hover:text-[#f4ecce] transition-colors hover:translate-x-1 duration-200 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a252]">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              {FOOTER_LINKS.experiences.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.tab)}
                    className="text-[#ded5c0]/80 hover:text-[#f4ecce] transition-colors hover:translate-x-1 duration-200 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Location & Concierge */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a252]">
              Kampong Glam Concierge
            </h4>
            <div className="space-y-3 text-sm text-[#ded5c0]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c6a252] shrink-0 mt-1" />
                <span className="leading-snug">
                  {SITE_CONFIG.location.address}, {SITE_CONFIG.location.district}, {SITE_CONFIG.location.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c6a252] shrink-0" />
                <a href={`tel:${SITE_CONFIG.location.phone}`} className="hover:text-[#c6a252] transition-colors font-medium">
                  {SITE_CONFIG.location.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c6a252] shrink-0" />
                <span>{SITE_CONFIG.location.conciergeEmail}</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#c6a252] shrink-0 mt-1" />
                <div className="text-xs leading-snug space-y-0.5">
                  <p>Tue–Thu: 1:30 PM – 10:00 PM</p>
                  <p>Fri–Sat: 2:00 PM – 12:00 AM</p>
                  <p>Sun: 2:00 PM – 10:00 PM (Mon: Closed)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ded5c0]/60 font-light">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Charter
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Reservation
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#c6a252] transition-colors cursor-pointer">
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
