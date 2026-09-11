import { useState, useEffect } from 'react';
import { Gallery, ImageModal, GalleryItem } from "@/components/ui/react-tailwind-image-gallery";

const galleryData: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1200&auto=format&fit=crop",
    alt: "Pistachio Gelato Waffwich",
    title: "Signature Pistachio Waffwich",
    category: "Specialty Waffwich",
    span: "col-span-1 sm:row-span-2"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
    alt: "Panama Geisha Pour-Over",
    title: "Panama Geisha Terroir",
    category: "Micro-Lot Roast",
    span: "sm:col-span-2"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop",
    alt: "Normandy Butter Croissant",
    title: "AOP Normandy Croissant",
    category: "French Viennoiserie",
    span: "col-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop",
    alt: "24K Gold Velvet Latte",
    title: "24K Gold Velvet Latte",
    category: "Specialty Coffee",
    span: "col-span-1"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1200&auto=format&fit=crop",
    alt: "Artisanal Pistachio Gelato",
    title: "Bronte Pistachio Gelato",
    category: "Handcrafted Gelato",
    span: "sm:col-span-2"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    alt: "Aureffle Dining Salon",
    title: "Parisian Salon Atmosphere",
    category: "Interior Atmosphere",
    span: "col-span-1"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    alt: "Haute Entremets & Tarts",
    title: "Haute Raspberry Entremet",
    category: "Parisian Patisserie",
    span: "col-span-1"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop",
    alt: "Uji Ceremonial Matcha",
    title: "Uji Ceremonial Matcha",
    category: "Botanical Elixir",
    span: "col-span-1"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Outdoor Botanical Verandah",
    title: "Botanical Verandah Seating",
    category: "Verandah Experience",
    span: "sm:col-span-2"
  },
];

export default function GalleryDemo() {
  const [modalImage, setModalImage] = useState<string | null>(null);

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
    <>
      <Gallery data={galleryData} onImageClick={openModal} />
      <ImageModal src={modalImage} onClose={closeModal} />
    </>
  );
}
