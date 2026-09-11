'use client';

import { useState, type CSSProperties } from 'react';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export type GalleryItem = {
  image: { src: string; alt?: string };
  title?: string;
  subtitle?: string;
};

type ArchGalleryProps = {
  items?: GalleryItem[];
  cardWidth?: number;
  cardHeight?: number;
  cornerRadius?: number;
  className?: string;
};

// ---------------------------------------------------------------------------
// Cafe & Coffee Default Items
// ---------------------------------------------------------------------------
const DEFAULT_ITEMS: GalleryItem[] = [
  {
    image: {
      src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      alt: 'Golden Crema Espresso Extraction',
    },
    title: 'Artisanal Espresso',
    subtitle: 'Micro-lot Single Origin',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
      alt: 'Handcrafted Latte Art Heart',
    },
    title: 'Velvety Latte Art',
    subtitle: 'Infused with 24K Gold Dust',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      alt: 'Aureffle Salon Interior Architecture',
    },
    title: 'Salon Sanctuary',
    subtitle: 'Marina Bay Waterfront',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      alt: 'Normandy AOP Butter Croissants',
    },
    title: 'Normandy Viennoiserie',
    subtitle: 'Fresh Morning Lamination',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
      alt: 'Panama Geisha Roasted Beans',
    },
    title: 'Rare Geisha Beans',
    subtitle: 'Hacienda La Esmeralda',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      alt: 'Live Siphon Coffee Ritual',
    },
    title: 'Siphon Vacuum Craft',
    subtitle: 'Brewed Live at Table',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      alt: 'V60 Pour-Over Coffee Ritual',
    },
    title: 'Pour-Over V60',
    subtitle: 'Precision Thermal Pour',
  },
];

const ROTATE_STEP = 6;
const Y_STEP = 18;
const OVERLAP = 0.58;
const HOVER_SCALE = 1.08;
const HOVER_LIFT = 16;

export function ArchGallery({
  items = DEFAULT_ITEMS,
  cardWidth = 200,
  cardHeight = 270,
  cornerRadius = 20,
  className = '',
}: ArchGalleryProps) {
  const deck = items.length ? items : DEFAULT_ITEMS;
  const total = deck.length;
  const mid = (total - 1) / 2;
  const [hovered, setHovered] = useState<number | null>(null);

  const stageWidth = cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * Y_STEP + 56;

  return (
    <div
      className={['flex w-full items-center justify-center py-8 overflow-hidden select-none', className]
        .filter(Boolean)
        .join(' ')}
      role='group'
      aria-label='Image gallery'
    >
      <div
        className='relative max-w-full flex justify-center items-center'
        style={{ width: stageWidth, height: stageHeight }}
      >
        {deck.map((entry, index) => {
          const offset = index - mid;
          const rotate = offset * ROTATE_STEP;
          const translateY = Math.abs(offset) * Y_STEP;
          const translateX = offset * cardWidth * OVERLAP;
          const baseZ = total - Math.abs(offset);
          const isHovered = hovered === index;

          const cardStyle: CSSProperties = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            marginTop: -cardHeight / 2,
            borderRadius: cornerRadius,
            overflow: 'hidden',
            transformOrigin: 'center center',
            transform: isHovered
              ? `translate(${translateX}px, ${translateY - HOVER_LIFT}px) rotate(0deg) scale(${HOVER_SCALE})`
              : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
            zIndex: isHovered ? total + 10 : baseZ,
            transition:
              'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms, border-color 280ms ease-out',
            boxShadow: isHovered
              ? '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(255,230,0,0.4)'
              : '0 12px 28px rgba(0,0,0,0.6), 0 2px 8px rgba(198,162,82,0.2)',
            cursor: 'pointer',
            backgroundColor: '#0c1426',
            border: isHovered ? '2px solid rgba(255, 230, 0, 0.7)' : '1px solid rgba(198, 162, 82, 0.3)',
          };

          return (
            <div
              key={`${entry.image.src}-${index}`}
              style={cardStyle}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              aria-label={entry.image.alt || `Photo ${index + 1}`}
              className="group relative"
            >
              <img
                src={entry.image.src}
                alt={entry.image.alt || ''}
                draggable={false}
                className='pointer-events-none absolute inset-0 h-full w-full select-none object-cover transform group-hover:scale-105 transition-transform duration-500'
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              {/* Optional Title & Subtitle Badge */}
              {(entry.title || entry.subtitle) && (
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  {entry.subtitle && (
                    <span className="text-[9px] uppercase tracking-widest text-[#ffe600] font-bold block truncate">
                      {entry.subtitle}
                    </span>
                  )}
                  {entry.title && (
                    <h4 className="font-serif text-sm text-[#f4ecce] font-normal leading-snug truncate">
                      {entry.title}
                    </h4>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
