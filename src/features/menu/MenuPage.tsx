import React, { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { CategoryTabs } from '@/components/menu/CategoryTabs/CategoryTabs';
import { MenuCard } from '@/components/menu/MenuCard/MenuCard';
import { MenuItemModal } from '@/components/menu/MenuItemModal/MenuItemModal';
import { MENU_ITEMS } from '@/data/menu/menu-items';
import { MENU_CATEGORIES } from '@/data/menu/categories';
import { CategoryId, DietaryTag, MenuItem } from '@/types/menu';
import { Search, Sparkles, Filter, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  const dietaryOptions: { id: DietaryTag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'Signature', label: '★ Signatures' },
    { id: 'Chef Choice', label: 'Chef Choice' },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Vegan', label: 'Vegan' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
  ];

  const currentCategoryInfo = useMemo(() => {
    return (
      MENU_CATEGORIES.find((c) => c.id === selectedCategory) ||
      MENU_CATEGORIES[0]
    );
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Dietary filter
      const matchesDiet =
        selectedDietary === 'all' || item.dietary.includes(selectedDietary);

      // Search query
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.frenchName &&
          item.frenchName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin &&
          item.origin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tastingNotes &&
          item.tastingNotes.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      return matchesCat && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="py-12 sm:py-16 bg-[#080d1a] min-h-screen">
      <Container size="lg" className="space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold px-3.5 py-1.5 rounded-full luxury-glass border border-[#c6a252]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Repertoire • Vol. IX</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            The Gastronomic Repertoire
          </h1>
          <p className="text-sm sm:text-base text-[#ded5c0]/80 font-light max-w-xl mx-auto leading-relaxed">
            Every creation at Aureffle is a testament to uncompromised provenance — from competition micro-lots to French grand cru patisserie.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#ded5c0]/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flavor, origin, or name (e.g. Geisha, Truffle, Yuzu)..."
              className="w-full bg-[#101c34] text-white placeholder-[#ded5c0]/40 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-xl border border-[#c6a252]/30 focus:outline-none focus:border-[#c6a252] shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#ded5c0]/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="space-y-4">
          <CategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />

          {/* Dietary Sub-filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[11px] text-[#ded5c0]/50 uppercase tracking-wider font-semibold shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {dietaryOptions.map((opt) => {
              const active = selectedDietary === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDietary(opt.id)}
                  className={cn(
                    'text-xs px-3 py-1 rounded-full border transition-all whitespace-nowrap shrink-0 cursor-pointer',
                    active
                      ? 'bg-[#c6a252]/20 border-[#c6a252] text-[#f4ecce] font-semibold'
                      : 'bg-white/5 border-white/10 text-[#ded5c0]/70 hover:border-white/25 hover:text-white'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Banner */}
        <div className="p-6 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c6a252] font-semibold">
              {currentCategoryInfo.tagline}
            </span>
            <h2 className="font-serif text-2xl text-white font-normal">
              {currentCategoryInfo.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#ded5c0]/70 max-w-2xl font-light">
              {currentCategoryInfo.description}
            </p>
          </div>
          <div className="text-xs text-[#ded5c0]/60 shrink-0 font-medium">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'creation' : 'creations'}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#0c1426]/50 border border-white/10 space-y-3">
            <Coffee className="w-8 h-8 text-[#c6a252]/40 mx-auto" />
            <h3 className="font-serif text-xl text-white font-normal">
              No matching creations found
            </h3>
            <p className="text-xs text-[#ded5c0]/60 max-w-md mx-auto">
              Try adjusting your search criteria or resetting the dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="text-xs text-[#c6a252] hover:underline uppercase font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onSelect={(item) => setActiveModalItem(item)}
              />
            ))}
          </div>
        )}
      </Container>

      {/* Item Customization & Details Modal */}
      <MenuItemModal
        item={activeModalItem}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
        onSelectPairing={(pairedItem) => setActiveModalItem(pairedItem)}
      />
    </div>
  );
};
