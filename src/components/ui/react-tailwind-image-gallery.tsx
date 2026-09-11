import React from 'react';
import { X, ZoomIn } from 'lucide-react';

export interface GalleryItem {
  id: number | string;
  src: string;
  alt: string;
  title: string;
  category?: string;
  span?: string;
}

export interface GalleryProps {
  data: GalleryItem[];
  onImageClick: (src: string) => void;
}

export function Gallery({ data, onImageClick }: GalleryProps) {
  return (
    <section id="portfolio" className="py-12 bg-[#050811]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px]">
          {data.map((img) => (
            <div
              key={img.id}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl border border-[#c6a252]/20 hover:border-[#c6a252]/50 shadow-xl transition-all duration-300 ${img.span || ''}`}
              onClick={() => onImageClick(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="gallery-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811]/95 via-[#050811]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                {img.category && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c6a252] block mb-1">
                    {img.category}
                  </span>
                )}
                <p className="text-white text-base font-display font-medium transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center justify-between">
                  <span>{img.title}</span>
                  <ZoomIn className="w-4 h-4 text-[#c6a252] shrink-0 ml-2" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export function ImageModal({ src, onClose }: ImageModalProps) {
  if (!src) return null;

  return (
    <div
      id="imageModal"
      className="fixed inset-0 bg-[#050811]/90 backdrop-blur-md flex justify-center items-center z-50 p-4 sm:p-6 opacity-100 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="relative max-w-[92vw] max-h-[88vh] rounded-2xl overflow-hidden border border-[#c6a252]/40 shadow-2xl">
        <img
          src={src}
          alt="Enlarged view"
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-[#080d1a]/80 text-[#f4f1ea] hover:text-[#c6a252] border border-[#c6a252]/30 backdrop-blur-md transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
