import InteractiveBentoGallery, { MediaItemType } from "@/components/ui/interactive-bento-gallery"

export const cafeMediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "Artisanal Golden Crema",
    desc: "Single-origin micro-lot espresso extraction",
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "video",
    title: "Live Siphon Vacuum Extraction",
    desc: "Panama Geisha brewed live at your table.",
    url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Aureffle Architectural Salon",
    desc: "Tranquil acoustics & velvet seating in Marina Bay",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Normandy AOP Butter Viennoiserie",
    desc: "Flaky golden morning croissant lamination",
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "Artisanal Pour-Over Ritual",
    desc: "Precision water temperature pour over V60",
    url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Handcrafted Latte Art Heart",
    desc: "Velvety micro-foam infused with 24K gold dust",
    url: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Rare Geisha Roasted Terroir Beans",
    desc: "Hand-sorted competition grade roasts",
    url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

export function BentoGridGalleryDemo() {
  return (
    <div className="w-full">
      <InteractiveBentoGallery
        mediaItems={cafeMediaItems}
        title="Interactive Bento Gallery"
        description="Drag, click, and explore our curated visual anthology"
      />
    </div>
  )
}
