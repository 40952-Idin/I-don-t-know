import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ShieldCheck, CheckCircle, Info, ShoppingBag } from 'lucide-react';
import { Item, ItemCategory } from '../types';

interface MarketplaceProps {
  items: Item[];
  onRentClick: (item: Item) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export default function Marketplace({ items, onRentClick, searchTerm, onSearchChange }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');
  const [showOnlyPlatform, setShowOnlyPlatform] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');

  const categories: { value: ItemCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All Resources', icon: '✨' },
    { value: 'academic', label: 'Academic & Study', icon: '📚' },
    { value: 'tech', label: 'Tech & Media', icon: '📷' },
    { value: 'events', label: 'Events & Apparel', icon: '👔' },
    { value: 'practical', label: 'Practical & Leisure', icon: '⛺' },
  ];

  // Filter and sort items dynamically
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Search term Filter
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.specs.some(spec => spec.toLowerCase().includes(query)) ||
        item.location.toLowerCase().includes(query)
      );
    }

    // Platform Filter
    if (showOnlyPlatform) {
      result = result.filter(item => item.isPlatformOwned);
    }

    // Available Filter
    if (showOnlyAvailable) {
      result = result.filter(item => item.isAvailable);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else {
      // popular / rentalsCount
      result.sort((a, b) => b.rentalsCount - a.rentalsCount);
    }

    return result;
  }, [items, activeCategory, searchTerm, showOnlyPlatform, showOnlyAvailable, sortBy]);

  const getCategoryThemeColor = (cat: ItemCategory) => {
    switch (cat) {
      case 'academic': return 'bg-blue-50 text-blue-800 border-blue-100';
      case 'tech': return 'bg-purple-50 text-purple-800 border-purple-100';
      case 'events': return 'bg-amber-50 text-amber-800 border-amber-100';
      case 'practical': return 'bg-emerald-50 text-emerald-800 border-emerald-100';
    }
  };

  return (
    <section id="marketplace" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8 mb-10">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            On-Campus Catalog
          </div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-[1.15]">
            Rent Resources on Your Campus
          </h2>
          <p className="font-sans text-base text-slate-600 max-w-xl">
            Rent high-quality items for exams, interviews, and weekend trips from classmates or the automated Student Union Hub.
          </p>
        </div>

        {/* Dynamic Items Count */}
        <div className="flex items-center space-x-2 rounded-xl bg-white border border-slate-200 shadow-sm px-4 py-2.5 text-xs font-semibold text-slate-600">
          <ShoppingBag className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Showing {filteredItems.length} available items</span>
        </div>
      </div>

      {/* Categories Horizontal Selector */}
      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none border-b border-slate-100 mb-8" id="category-scroller">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`flex shrink-0 items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeCategory === cat.value
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/50 scale-[1.02]'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/60 shadow-sm'
            }`}
            id={`cat-tab-${cat.value}`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        
        {/* Instant Search input */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search catalog (e.g., calculator, tent, camera)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            id="catalog-search"
          />
        </div>

        {/* Filters Selectors */}
        <div className="md:col-span-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-semibold text-slate-600">
            <input
              type="checkbox"
              checked={showOnlyAvailable}
              onChange={(e) => setShowOnlyAvailable(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              id="filter-available"
            />
            <span>Available Now</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-semibold text-slate-600">
            <input
              type="checkbox"
              checked={showOnlyPlatform}
              onChange={(e) => setShowOnlyPlatform(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              id="filter-platform"
            />
            <span>Locker Hub Only</span>
          </label>
        </div>

        {/* Sorting Dropdown */}
        <div className="md:col-span-3 flex items-center justify-end space-x-2">
          <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
            id="sort-select"
          >
            <option value="popular">Sort by: Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl" id="catalog-empty-state">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <Info className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-slate-800">No items match your filters</h3>
          <p className="mt-1.5 text-xs text-slate-400 max-w-xs mx-auto">
            Try resetting your search query or enabling checked parameters to browse our peer items.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              setActiveCategory('all');
              setShowOnlyPlatform(false);
              setShowOnlyAvailable(false);
            }}
            className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            id="reset-filters-btn"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id="catalog-grid">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-150 bg-white hover:shadow-lg hover:shadow-emerald-950/5 hover:border-emerald-500/30 transition-all duration-300 text-left"
              id={`product-card-${item.id}`}
            >
              {/* Product Card Image Container */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to solid color gradient if image fails
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=80`;
                  }}
                />

                {/* Hub/Peer Badge */}
                <span className={`absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[9px] font-bold border ${
                  item.isPlatformOwned
                    ? 'bg-slate-900 text-emerald-400 border-slate-800'
                    : 'bg-white text-slate-700 border-slate-200 shadow-sm'
                }`}>
                  {item.isPlatformOwned ? '🏢 Locker Hub' : '👥 Peer Listing'}
                </span>

                {/* Pricing Overlay */}
                <div className="absolute bottom-3 right-3 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm shadow-emerald-950/10">
                  ${item.pricePerDay.toFixed(2)}/day
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                
                {/* Meta details */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${getCategoryThemeColor(item.category)}`}>
                      {item.category === 'academic' && '📚 Academic'}
                      {item.category === 'tech' && '📷 Tech & Media'}
                      {item.category === 'events' && '👔 Apparel'}
                      {item.category === 'practical' && '⛺ Practical'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">
                      {item.condition} Cond.
                    </span>
                  </div>

                  <h3 className="font-sans text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Item features/specs checklist dots */}
                <div className="flex flex-wrap gap-1">
                  {item.specs.slice(0, 2).map((spec, specIdx) => (
                    <span
                      key={specIdx}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 font-medium truncate max-w-[120px]"
                    >
                      • {spec}
                    </span>
                  ))}
                </div>

                {/* Lender Profile block */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.owner.avatarUrl}
                      alt={item.owner.name}
                      className="h-6 w-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-700 line-clamp-1">
                        {item.owner.name}
                      </p>
                      <div className="flex items-center space-x-0.5">
                        <span className="text-[9px] font-bold text-amber-500">★</span>
                        <span className="text-[9px] font-bold text-slate-500">{item.owner.rating}</span>
                        <span className="text-[8px] text-slate-400">({item.owner.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                  {item.owner.isVerified && (
                    <span className="inline-flex items-center text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      <ShieldCheck className="h-3 w-3 mr-0.5 text-emerald-600" />
                      edu
                    </span>
                  )}
                </div>

                {/* Pickup Address details */}
                <div className="rounded-lg bg-slate-50 p-2 text-left text-[10px] text-slate-500 flex items-center space-x-1 border border-slate-100">
                  <span className="text-emerald-600">📍</span>
                  <span className="font-medium truncate">{item.location}</span>
                </div>

                {/* Reserve action trigger button */}
                <button
                  onClick={() => onRentClick(item)}
                  disabled={!item.isAvailable}
                  className={`w-full rounded-xl py-2.5 text-xs font-bold text-center border transition-all active:scale-[0.98] cursor-pointer ${
                    item.isAvailable
                      ? 'bg-emerald-600 text-white border-transparent hover:bg-emerald-700 shadow-sm shadow-emerald-600/10'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  }`}
                  id={`rent-now-btn-${item.id}`}
                >
                  {item.isAvailable ? 'Request Rental' : 'Rented Out'}
                </button>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
