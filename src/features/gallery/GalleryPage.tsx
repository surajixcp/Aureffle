import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Gallery, ImageModal, GalleryItem } from '@/components/ui/react-tailwind-image-gallery';
import { Camera, Sparkles } from 'lucide-react';

const fullGalleryData: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1200&auto=format&fit=crop",
    alt: "Pistachio Gelato Waffwich",
    title: "Signature Pistachio Gelato Waffwich",
    category: "Signature Waffwich",
    span: "col-span-1 sm:row-span-2"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
    alt: "Panama Geisha Pour-Over",
    title: "Panama Geisha Terroir Extractions",
    category: "Specialty Coffee",
    span: "sm:col-span-2"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop",
    alt: "Normandy Butter Croissant",
    title: "AOP Normandy Butter Viennoiserie",
    category: "Parisian Patisserie",
    span: "col-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop",
    alt: "24K Gold Velvet Latte",
    title: "24K Gold Velvet Latte Ritual",
    category: "Specialty Coffee",
    span: "col-span-1"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1200&auto=format&fit=crop",
    alt: "Artisanal Pistachio Gelato",
    title: "Handcrafted Bronte Gelato Scoop",
    category: "Artisanal Gelato",
    span: "sm:col-span-2"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    alt: "Aureffle Dining Salon",
    title: "Refined Parisian Salon Atmosphere",
    category: "Salon Interior",
    span: "col-span-1"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    alt: "Haute Entremets & Tarts",
    title: "Fresh Raspberry Entremet Tart",
    category: "Parisian Patisserie",
    span: "col-span-1"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop",
    alt: "Uji Ceremonial Matcha",
    title: "Uji Ceremonial Matcha Elixir",
    category: "Botanical Drinks",
    span: "col-span-1"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Outdoor Botanical Verandah",
    title: "Kampong Glam Verandah Dining",
    category: "Salon Interior",
    span: "sm:col-span-2"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop",
    alt: "Japanese Soufflé Pancake",
    title: "Hokkaido Cream Soufflé Stack",
    category: "Parisian Patisserie",
    span: "col-span-1"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop",
    alt: "Single Estate Coffee Roasting",
    title: "Single-Origin Micro-Lot Beans",
    category: "Specialty Coffee",
    span: "col-span-1"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1528207776546-385fe72de8b6?q=80&w=1200&auto=format&fit=crop",
    alt: "Artisanal Waffle Creation",
    title: "Belgian Crispy Waffle Creation",
    category: "Signature Waffwich",
    span: "sm:col-span-2"
  },
];

const categories = [
  'All Showcase',
  'Signature Waffwich',
  'Specialty Coffee',
  'Parisian Patisserie',
  'Artisanal Gelato',
  'Salon Interior',
];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Showcase');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const filteredData = selectedCategory === 'All Showcase'
    ? fullGalleryData
    : fullGalleryData.filter((item) => item.category === selectedCategory);

  const openModal = (src: string) => setModalImage(src);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050811] text-[#f4f1ea] pt-24 pb-20">
      <Container size="lg">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a252]/15 border border-[#c6a252]/30 text-xs font-semibold uppercase tracking-[0.25em] text-[#f4ecce] mb-3">
            <Camera className="w-3.5 h-3.5 text-[#c6a252]" />
            <span>Gastronomy Visual Showcase</span>
          </div>
          <SectionHeading
            eyebrow="Haute Gallery"
            title="Curated Culinary & Salon Gallery"
            subtitle="An immersive visual journey through our rare geisha extractions, Parisian viennoiserie, viral waffwiches, and salon atmosphere."
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#f4ecce] via-[#c6a252] to-[#e6ca85] text-[#080d1a] font-semibold shadow-lg shadow-[#c6a252]/20'
                  : 'bg-[#0c1426] text-[#ded5c0]/80 hover:text-white border border-[#c6a252]/20 hover:border-[#c6a252]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid Showcase */}
        <Gallery data={filteredData} onImageClick={openModal} />

        {/* Lightbox Modal */}
        <ImageModal src={modalImage} onClose={closeModal} />

        {/* Footer Banner CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0c1426] via-[#0e1930] to-[#080d1a] border border-[#c6a252]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <Sparkles className="w-6 h-6 text-[#c6a252] mx-auto" />
            <h3 className="font-display text-2xl sm:text-3xl text-white font-light">
              Experience the Gastronomy in Person
            </h3>
            <p className="text-xs sm:text-sm text-[#ded5c0]/80 font-light leading-relaxed">
              Visit our Kampong Glam salon at 26 Kandahar Street, Singapore to sample our signature artisanal menu.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GalleryPage;
