import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function DraggableCardDemo() {
  const items = [
    {
      title: "Pistachio Waffwich",
      category: "Signature Dessert",
      image:
        "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-6 left-[6%] sm:left-[12%] rotate-[-5deg]",
    },
    {
      title: "Panama Geisha Terroir",
      category: "Micro-Lot Roast",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-36 left-[18%] sm:left-[22%] rotate-[-7deg]",
    },
    {
      title: "AOP Normandy Croissant",
      category: "French Viennoiserie",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-4 left-[34%] sm:left-[38%] rotate-[8deg]",
    },
    {
      title: "24K Gold Velvet Latte",
      category: "Specialty Drink",
      image:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-28 left-[48%] sm:left-[52%] rotate-[10deg]",
    },
    {
      title: "Bronte Pistachio Gelato",
      category: "Handcrafted Gelato",
      image:
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-16 right-[8%] sm:right-[15%] rotate-[2deg]",
    },
    {
      title: "Aureffle Salon Interior",
      category: "Atmosphere",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-20 left-[38%] rotate-[-7deg]",
    },
    {
      title: "Uji Ceremonial Matcha",
      category: "Botanical Elixir",
      image:
        "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop",
      className: "absolute top-8 left-[24%] rotate-[4deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-[90vh] sm:min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] items-center justify-center overflow-hidden py-16 sm:py-24 bg-[#050811]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none px-4">
        <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#ffe600] block mb-3 drop-shadow">
          Interactive Visual Canvas
        </span>
        <p className="max-w-xl mx-auto text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight drop-shadow-2xl">
          Drag &amp; explore our signature moments of gastronomy, coffee artistry, and tranquility.
        </p>
      </div>

      {items.map((item, idx) => (
        <DraggableCardBody key={idx} className={item.className}>
          <div className="relative h-72 sm:h-80 md:h-[320px] w-full overflow-hidden rounded-xl bg-black/40">
            <img
              src={item.image}
              alt={item.title}
              className="pointer-events-none relative z-10 h-full w-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#080d1a]/95 via-transparent to-transparent opacity-90" />
            <span className="absolute bottom-3 left-3 z-30 text-[11px] uppercase tracking-widest text-[#ffe600] font-bold bg-black/60 px-2.5 py-1 rounded-full border border-[#ffe600]/30 backdrop-blur-md">
              {item.category}
            </span>
          </div>
          <h3 className="mt-4 text-center font-serif text-lg sm:text-xl font-medium text-white truncate drop-shadow-md">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
