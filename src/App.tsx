import React, { useState, useEffect } from 'react';
import { ActiveTab } from '@/types/common';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { BookingProvider } from '@/context/BookingContext';
import { AuthProvider } from '@/context/AuthContext';
import { TopAnnouncement } from '@/components/layout/TopBanner/TopAnnouncement';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer/CartDrawer';
import { HomePage } from '@/features/home/HomePage';
import { MenuPage } from '@/features/menu/MenuPage';
import { AboutPage } from '@/features/about/AboutPage';
import { BookingPage } from '@/features/booking/BookingPage';
import { GalleryPage } from '@/features/gallery/GalleryPage';
import { CheckoutPage } from '@/features/checkout/CheckoutPage';
import { ContactPage } from '@/features/contact/ContactPage';
import { AuthPage } from '@/features/auth/AuthPage';
import { AnimatePresence, motion } from 'motion/react';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-[#f4f1ea] selection:bg-[#c6a252] selection:text-[#080d1a]">
      {/* Top Announcement Bar */}
      <TopAnnouncement onNavigate={(tab) => setActiveTab(tab)} />

      {/* Header */}
      <Header activeTab={activeTab} onNavigate={(tab) => setActiveTab(tab)} />

      {/* Main Page View with Smooth Animated Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {activeTab === 'home' && <HomePage onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'menu' && <MenuPage />}
            {activeTab === 'about' && <AboutPage onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'booking' && <BookingPage />}
            {activeTab === 'gallery' && <GalleryPage />}
            {activeTab === 'checkout' && <CheckoutPage onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'contact' && <ContactPage />}
            {activeTab === 'auth' && <AuthPage onNavigate={(tab) => setActiveTab(tab)} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Cart Drawer */}
      <CartDrawer onNavigate={(tab) => setActiveTab(tab)} />

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
