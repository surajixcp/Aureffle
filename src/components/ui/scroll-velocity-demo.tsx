import { ScrollVelocity } from "@/components/ui/scroll-velocity"

const cafeImages = [
  {
    title: "Pistachio Waffwich",
    thumbnail: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=800&auto=format&fit=crop",
    category: "Signature Waffwich",
  },
  {
    title: "Panama Geisha Pour-Over",
    thumbnail: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    category: "Micro-Lot Roast",
  },
  {
    title: "Haute Entremets & Tarts",
    thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    category: "Parisian Patisserie",
  },
  {
    title: "Artisanal Pistachio Gelato",
    thumbnail: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop",
    category: "Handcrafted Gelato",
  },
  {
    title: "Normandy Butter Croissant",
    thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    category: "AOP Viennoiserie",
  },
  {
    title: "24K Gold Velvet Latte",
    thumbnail: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
    category: "Specialty Drink",
  },
  {
    title: "Uji Ceremonial Matcha",
    thumbnail: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop",
    category: "Botanical Elixir",
  },
  {
    title: "Haute Soufflé Stack",
    thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop",
    category: "Dessert Specialty",
  },
  {
    title: "Kandahar Single-Origin Beans",
    thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
    category: "Artisanal Roastery",
  },
  {
    title: "Aureffle Salon Atmosphere",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    category: "Salon Interior",
  },
]

const velocities = [3, -3]

export function ScrollVelocityDemo() {
  return (
    <div className="w-full overflow-hidden bg-[#080d1a] py-16 border-y border-[#c6a252]/20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c6a252]">
          Continuous Taste Motion
        </span>
        <h2 className="font-display text-2xl sm:text-4xl text-white font-light mt-1">
          Aureffle Culinary Gallery in Motion
        </h2>
      </div>

      {/* Increased vertical gap between top and bottom rows */}
      <div className="flex flex-col space-y-8 sm:space-y-12">
        {velocities.map((v, index) => (
          <ScrollVelocity key={index} velocity={v} className="py-2">
            {cafeImages.map(({ title, thumbnail, category }) => (
              <div
                key={`${title}-${index}`}
                className="relative h-[8.5rem] w-[14rem] md:h-[11rem] md:w-[18rem] xl:h-[13rem] xl:w-[21rem] rounded-2xl overflow-hidden border border-[#c6a252]/30 shadow-2xl group cursor-pointer"
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/95 via-[#080d1a]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6a252] font-semibold block mb-0.5">
                    {category}
                  </span>
                  <p className="text-xs sm:text-sm font-display text-white font-medium truncate">
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </ScrollVelocity>
        ))}
        
        <div className="pt-6 border-t border-[#c6a252]/10">
          <ScrollVelocity velocity={4} className="text-[#f4ecce] font-display uppercase tracking-[0.25em] text-lg sm:text-2xl py-2">
            ✨ Handcrafted Waffwiches • Artisanal Gelato • 100% Muslim-Owned • Kampong Glam Singapore ✨
          </ScrollVelocity>
        </div>
      </div>
    </div>
  )
}
