import React from 'react';
import { Leaf, ExternalLink } from 'lucide-react';

export interface AngledCardItem {
  id: number;
  label: string;
  title: string;
  image: string;
  tag?: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80";

export const DEFAULT_GALLERY_ITEMS: AngledCardItem[] = [
  {
    id: 1,
    label: "Nature",
    title: "Panama Geisha Terroir",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    tag: "Signature",
  },
  {
    id: 2,
    label: "Forest",
    title: "High Altitude Micro-lot",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    tag: "Rare Reserve",
  },
  {
    id: 3,
    label: "Ocean",
    title: "Marina Bay Siphon Ritual",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tag: "Haute Extraction",
  },
  {
    id: 4,
    label: "Landscape",
    title: "Normandy Butter Viennoiserie",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    tag: "Artisanal",
  },
  {
    id: 5,
    label: "Valley",
    title: "Kyoto 16-Hour Slow Drip",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    tag: "Cold Drip",
  },
  {
    id: 6,
    label: "Bridge",
    title: "24K Gold Velvet Latte",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    tag: "Gold Series",
  },
  {
    id: 7,
    label: "Nature",
    title: "Aureffle Salon Interior",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    tag: "Atmosphere",
  },
  {
    id: 8,
    label: "Forest",
    title: "Table-Side Pour Over V60",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    tag: "Precision",
  },
  {
    id: 9,
    label: "Ocean",
    title: "Artisanal Coffee & Dining",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    tag: "Bistro Mains",
  },
  {
    id: 10,
    label: "Bridge",
    title: "Matcha Uji Grand Cru",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tag: "Japanese Tea",
  },
  {
    id: 11,
    label: "Valley",
    title: "Bespoke Sommelier Reserve",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    tag: "Exclusive",
  },
  {
    id: 12,
    label: "Landscape",
    title: "Hokkaido Jersey Cream Tart",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    tag: "Patisserie",
  },
];

interface AngledMonochromaticGalleryProps {
  items?: AngledCardItem[];
  onCardClick?: (item: AngledCardItem) => void;
}

export const AngledMonochromaticGallery: React.FC<AngledMonochromaticGalleryProps> = ({
  items = DEFAULT_GALLERY_ITEMS,
  onCardClick,
}) => {
  const row1 = items.slice(0, 6);
  const row2 = items.slice(6, 12);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-[#080d1a] py-12 sm:py-16">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c6a252]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Full-Screen Rotated Grid Container (-16 degrees) */}
      <div className="relative w-full overflow-hidden transform -rotate-[16deg] scale-[1.15] sm:scale-[1.25] origin-center py-6">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Row 1: Smooth CSS Marquee Leftward */}
          <div className="flex overflow-hidden select-none">
            <div className="flex gap-4 sm:gap-5 shrink-0 animate-marquee py-2" style={{ animationDuration: '32s' }}>
              {[...row1, ...row1, ...row1].map((item, idx) => (
                <div
                  key={`r1-${item.id}-${idx}`}
                  onClick={() => onCardClick?.(item)}
                  className="relative shrink-0 w-44 sm:w-52 md:w-56 h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden bg-[#0c1426] border border-[#c6a252]/35 shadow-xl shadow-black/90 cursor-pointer group p-3.5 sm:p-4 flex flex-col justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImgError}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:opacity-90 transition-opacity" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white/95 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-black/70 px-2.5 py-0.5 rounded-full border border-[#c6a252]/40 backdrop-blur-md shadow-md">
                      <Leaf className="w-3 h-3 text-[#ffe600] shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.tag && (
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#ffe600] bg-[#c6a252]/25 px-2 py-0.5 rounded-full border border-[#ffe600]/40 backdrop-blur-md">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 space-y-0.5">
                    <h3 className="font-serif text-sm sm:text-base md:text-lg text-white font-normal leading-tight drop-shadow-md line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#ffe600] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Smooth CSS Marquee Rightward */}
          <div className="flex overflow-hidden select-none">
            <div 
              className="flex gap-4 sm:gap-5 shrink-0 animate-marquee py-2" 
              style={{ animationDuration: '38s', animationDirection: 'reverse' }}
            >
              {[...row2, ...row2, ...row2].map((item, idx) => (
                <div
                  key={`r2-${item.id}-${idx}`}
                  onClick={() => onCardClick?.(item)}
                  className="relative shrink-0 w-44 sm:w-52 md:w-56 h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden bg-[#0c1426] border border-[#c6a252]/35 shadow-xl shadow-black/90 cursor-pointer group p-3.5 sm:p-4 flex flex-col justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImgError}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:opacity-90 transition-opacity" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white/95 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-black/70 px-2.5 py-0.5 rounded-full border border-[#c6a252]/40 backdrop-blur-md shadow-md">
                      <Leaf className="w-3 h-3 text-[#ffe600] shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.tag && (
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#ffe600] bg-[#c6a252]/25 px-2 py-0.5 rounded-full border border-[#ffe600]/40 backdrop-blur-md">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 space-y-0.5">
                    <h3 className="font-serif text-sm sm:text-base md:text-lg text-white font-normal leading-tight drop-shadow-md line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#ffe600] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
