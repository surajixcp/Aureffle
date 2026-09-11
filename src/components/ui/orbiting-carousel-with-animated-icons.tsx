import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Wifi,
  Car,
  CalendarCheck,
  CreditCard,
  Heart,
  Baby,
  ShieldCheck,
  Armchair,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface FacilityItem {
  id: number;
  name: string;
  category: string;
  description: string;
  badge: string;
  profile: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const facilitiesData: FacilityItem[] = [
  {
    id: 1,
    name: "Specialty Coffee & Quick Bites",
    category: "Offerings",
    description: "Single-origin Geisha pour-overs, viral handcrafted waffwiches & fresh viennoiserie.",
    badge: "On-Site Service",
    profile: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    icon: Coffee,
  },
  {
    id: 2,
    name: "Free High-Speed Wi-Fi",
    category: "Amenities",
    description: "Complimentary optical fiber Wi-Fi internet throughout the main salon & verandah.",
    badge: "Free Wi-Fi",
    profile: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    icon: Wifi,
  },
  {
    id: 3,
    name: "Street & Nearby Parking",
    category: "Parking Facilities",
    description: "Free street parking, paid street parking & plenty of space along Kandahar St.",
    badge: "Plenty of Parking",
    profile: "https://images.unsplash.com/photo-1506521782020-18925f46c0be?q=80&w=600&auto=format&fit=crop",
    icon: Car,
  },
  {
    id: 4,
    name: "Accepts Online Reservations",
    category: "Planning & Booking",
    description: "Instant online table reservations for main dining salon, verandah & private vault.",
    badge: "Instant Booking",
    profile: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    icon: CalendarCheck,
  },
  {
    id: 5,
    name: "Credit, Debit & NFC Payments",
    category: "Payment Methods",
    description: "Accepts Credit cards, Debit cards, Apple Pay, Google Pay & contactless NFC.",
    badge: "NFC Mobile Pay",
    profile: "https://images.unsplash.com/photo-1556742049-0a67daf64f42?q=80&w=600&auto=format&fit=crop",
    icon: CreditCard,
  },
  {
    id: 6,
    name: "LGBTQ+ & Transgender Safe Space",
    category: "Atmosphere & Crowd",
    description: "A respectful, warm, inclusive and welcoming environment for every guest.",
    badge: "Safe Space",
    profile: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    icon: Heart,
  },
  {
    id: 7,
    name: "Good for Kids & High Chairs",
    category: "Family & Children",
    description: "Family friendly dining with comfortable high chairs for toddlers and kids.",
    badge: "Good for Kids",
    profile: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
    icon: Baby,
  },
  {
    id: 8,
    name: "Gender-Neutral Restrooms",
    category: "Amenities",
    description: "Immaculate, private, gender-neutral restrooms equipped with luxury amenities.",
    badge: "Restroom Facility",
    profile: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    icon: ShieldCheck,
  },
  {
    id: 9,
    name: "Solo & Salon Seating",
    category: "Dining Options",
    description: "Cozy indoor salon seating ideal for peaceful solo dining or pairs.",
    badge: "Solo Dining",
    profile: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    icon: Armchair,
  },
  {
    id: 10,
    name: "100% Muslim-Owned Establishment",
    category: "Certifications",
    description: "Halal ingredients & certified artisanal processes in Kampong Glam Singapore.",
    badge: "100% Halal",
    profile: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
    icon: CheckCircle2,
  },
];

const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop";
};

const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState<'xs' | 'sm' | 'md' | 'lg'>('lg');
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else setScreenSize('lg');
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  return screenSize;
};

export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const screenSize = useResponsive();

  const getResponsiveValues = () => {
    switch (screenSize) {
      case 'xs':
        return {
          containerRadius: 105,
          profileSize: 45,
          cardWidth: 'w-52',
          avatarSize: 'w-14 h-14',
          avatarMargin: '-mt-9',
          fontSize: {
            name: 'text-xs',
            role: 'text-[10px]',
            email: 'text-[10px]'
          }
        };
      case 'sm':
        return {
          containerRadius: 130,
          profileSize: 55,
          cardWidth: 'w-60',
          avatarSize: 'w-16 h-16',
          avatarMargin: '-mt-10',
          fontSize: {
            name: 'text-sm',
            role: 'text-xs',
            email: 'text-[11px]'
          }
        };
      case 'md':
        return {
          containerRadius: 165,
          profileSize: 65,
          cardWidth: 'w-64',
          avatarSize: 'w-18 h-18',
          avatarMargin: '-mt-11',
          fontSize: {
            name: 'text-base',
            role: 'text-xs',
            email: 'text-xs'
          }
        };
      default:
        return {
          containerRadius: 210,
          profileSize: 75,
          cardWidth: 'w-72',
          avatarSize: 'w-20 h-20',
          avatarMargin: '-mt-12',
          fontSize: {
            name: 'text-lg',
            role: 'text-xs',
            email: 'text-xs'
          }
        };
    }
  };

  const { containerRadius, profileSize, cardWidth, avatarSize, avatarMargin, fontSize } = getResponsiveValues();
  const containerSize = containerRadius * 2 + 110;

  const getRotation = React.useCallback(
    (index: number): number => (index - activeIndex) * (360 / facilitiesData.length),
    [activeIndex]
  );

  const next = React.useCallback(() => setActiveIndex((i) => (i + 1) % facilitiesData.length), []);
  const prev = React.useCallback(() => setActiveIndex((i) => (i - 1 + facilitiesData.length) % facilitiesData.length), []);

  const handleProfileClick = React.useCallback((index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  }, [activeIndex]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') prev();
      else if (event.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  React.useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, next]);

  const activeFacility = facilitiesData[activeIndex];
  const ActiveIcon = activeFacility.icon;

  return (
    <div 
      className="flex flex-col items-center justify-center p-2 sm:p-6 relative min-h-[460px] sm:min-h-[520px] bg-[#080d1a] text-[#f4f1ea] overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c6a252]/10 blur-[120px] rounded-full pointer-events-none" />

      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Orbit Path Ring */}
        <div 
          className="absolute rounded-full border border-[#c6a252]/25 pointer-events-none"
          style={{ width: containerRadius * 2, height: containerRadius * 2 }}
        />

        {/* Active Facility Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFacility.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className={`z-20 bg-[#0c1426]/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-6 ${cardWidth} text-center border border-[#c6a252]/35 relative`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative inline-block mx-auto"
            >
              <img
                src={activeFacility.profile}
                alt={activeFacility.name}
                onError={safeImage}
                className={`${avatarSize} rounded-full mx-auto ${avatarMargin} border-4 border-[#080d1a] object-cover shadow-xl`}
              />
              <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#c6a252] text-[#080d1a] shadow-lg">
                <ActiveIcon size={12} className="stroke-[2.5]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <span className="inline-block px-2.5 py-0.5 mt-2 rounded-full bg-[#c6a252]/20 border border-[#c6a252]/40 text-[#f4ecce] text-[10px] font-semibold uppercase tracking-wider">
                {activeFacility.badge}
              </span>

              <h2 className={`mt-1.5 font-display font-semibold text-white leading-tight ${fontSize.name}`}>
                {activeFacility.name}
              </h2>

              <p className="text-xs text-[#ded5c0]/80 font-light mt-1.5 leading-relaxed line-clamp-2">
                {activeFacility.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-4 space-x-2"
            >
              <button
                onClick={prev}
                className="p-2 rounded-full bg-[#101c34] hover:bg-[#c6a252]/20 text-[#ded5c0] hover:text-white border border-[#c6a252]/25 transition-colors cursor-pointer"
                aria-label="Previous Facility"
              >
                <ChevronLeft size={14} />
              </button>
              
              <div className="px-3.5 py-1 text-xs rounded-full bg-gradient-to-r from-[#f4ecce] via-[#c6a252] to-[#e6ca85] text-[#080d1a] font-semibold shadow-md flex items-center gap-1">
                <Sparkles size={11} />
                <span>Available Facility</span>
              </div>

              <button
                onClick={next}
                className="p-2 rounded-full bg-[#101c34] hover:bg-[#c6a252]/20 text-[#ded5c0] hover:text-white border border-[#c6a252]/25 transition-colors cursor-pointer"
                aria-label="Next Facility"
              >
                <ChevronRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Profile Icons with Counter-Rotation */}
        {facilitiesData.map((f, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;
          const IconComponent = f.icon;
          
          return (
            <motion.div
              key={f.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.04
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 30 : 10,
              }}
            >
              {/* Counter-rotation to keep image upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="w-full h-full relative"
              >
                <motion.div
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 10px 25px -5px rgba(198,162,82,0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? "border-4 border-[#c6a252] shadow-xl shadow-[#c6a252]/40 scale-110" 
                      : "border-2 border-[#c6a252]/40 hover:border-[#c6a252] opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={f.profile}
                    alt={f.name}
                    onError={safeImage}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#080d1a]/40 flex items-center justify-center">
                    <IconComponent size={screenSize === 'xs' ? 14 : 18} className="text-[#f4ecce]" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Progress Indicator Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {facilitiesData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              index === activeIndex 
                ? "w-6 bg-[#c6a252]" 
                : "w-2 bg-[#c6a252]/30 hover:bg-[#c6a252]/60"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to facility ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
