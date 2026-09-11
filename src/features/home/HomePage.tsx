import React from 'react';
import { ActiveTab } from '@/types/common';
import { HeroSection } from './HeroSection/HeroSection';
import { CraftHeritage } from './CraftHeritage/CraftHeritage';
import { SignatureExperience } from './SignatureExperience/SignatureExperience';
import { AtmosphereGallery } from './AtmosphereGallery/AtmosphereGallery';
import { GuestFacilities } from './GuestFacilities/GuestFacilities';
import { GuestReviews } from './GuestReviews/GuestReviews';
import { ReservationPreview } from './ReservationPreview/ReservationPreview';
import { LocationConcierge } from './LocationConcierge/LocationConcierge';
import { ScrollVelocityDemo } from '@/components/ui/scroll-velocity-demo';

interface HomePageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      <HeroSection onNavigate={onNavigate} />
      <ScrollVelocityDemo />
      <CraftHeritage onNavigate={onNavigate} />
      <SignatureExperience onNavigate={onNavigate} />
      <AtmosphereGallery onNavigate={onNavigate} />
      <GuestFacilities />
      <GuestReviews />
      <ReservationPreview onNavigate={onNavigate} />
      <LocationConcierge />
    </div>
  );
};
