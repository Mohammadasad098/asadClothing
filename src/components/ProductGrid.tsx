import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles, RefreshCw, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const ProductGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useCart();
  
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [selectedGsmFilter, setSelectedGsmFilter] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesTag = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTag) {
          return false;
        }
      }

      // Size match
      if (selectedSizeFilter !== 'all' && !product.sizes.includes(selectedSizeFilter as any)) {
        return false;
      }

      // GSM match
      if (selectedGsmFilter === 'heavy' && product.gsm < 300) return false;
      if (selectedGsmFilter === 'ultra' && product.gsm < 400) return false;

      // In-stock match
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, selectedSizeFilter, selectedGsmFilter, inStockOnly, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedSizeFilter('all');
    setSelectedGsmFilter('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '' || selectedSizeFilter !== 'all' || selectedGsmFilter !== 'all' || inStockOnly;

  return (
    <section id="collection-grid" className="py-16 bg-white text-zinc-900 min-h-[600px] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter Nav */}
        <div className="space-y-6 mb-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                COMPLETE WARDROBE ARCHIVE
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 uppercase">
                THE COLLECTION
              </h2>
            </div>
            
            <div className="text-xs font-mono text-zinc-500">
              SHOWING <span className="text-black font-bold">{filteredProducts.length}</span> OF <span className="text-black font-bold">{PRODUCTS.length}</span> PIECES
            </div>
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-zinc-200">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white font-bold shadow-md'
                    : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>

          {/* Filter Bar Controls & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="toggle-filter-drawer-btn"
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-colors ${
                  isFilterDrawerOpen || hasActiveFilters
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400 shadow-sm'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>FILTERS</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>

              {/* Quick Size Dropdown */}
              <select
                id="filter-size-select"
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className="bg-white border border-zinc-200 text-zinc-800 hover:text-black text-xs font-mono px-3 py-2 rounded-xl cursor-pointer focus:outline-none focus:border-black shadow-sm"
              >
                <option value="all">ALL SIZES</option>
                <option value="S">SIZE S</option>
                <option value="M">SIZE M</option>
                <option value="L">SIZE L</option>
                <option value="XL">SIZE XL</option>
                <option value="XXL">SIZE XXL</option>
              </select>

              {/* GSM Density filter */}
              <select
                id="filter-gsm-select"
                value={selectedGsmFilter}
                onChange={(e) => setSelectedGsmFilter(e.target.value)}
                className="bg-white border border-zinc-200 text-zinc-800 hover:text-black text-xs font-mono px-3 py-2 rounded-xl cursor-pointer focus:outline-none focus:border-black shadow-sm"
              >
                <option value="all">ALL GSM WEIGHTS</option>
                <option value="heavy">HEAVYWEIGHT (300+ GSM)</option>
                <option value="ultra">ULTRA-HEAVY (400+ GSM)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">SORT BY:</span>
              <div className="relative">
                <select
                  id="sort-products-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-zinc-200 text-zinc-900 text-xs font-mono px-3 py-2 rounded-xl cursor-pointer focus:outline-none focus:border-black pr-8 shadow-sm"
                >
                  <option value="featured">FEATURED ARCHIVE</option>
                  <option value="newest">NEW RELEASES</option>
                  <option value="rating">HIGHEST RATED (★)</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                </select>
              </div>
            </div>

          </div>

          {/* Active Search & Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
              <span className="text-zinc-500">ACTIVE:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-200 text-zinc-900 px-2.5 py-1 rounded-md">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-200 text-zinc-900 px-2.5 py-1 rounded-md">
                  Category: {CATEGORIES_LIST.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSizeFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-200 text-zinc-900 px-2.5 py-1 rounded-md">
                  Size: {selectedSizeFilter}
                  <button onClick={() => setSelectedSizeFilter('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                id="clear-all-filters-btn"
                onClick={resetAllFilters}
                className="text-zinc-600 hover:text-black underline underline-offset-4 ml-2"
              >
                RESET ALL
              </button>
            </div>
          )}

        </div>

        {/* Product Grid Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-zinc-50 rounded-3xl border border-zinc-200 p-8">
            <SlidersHorizontal className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-xl font-bold text-zinc-950">No products found</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto">
              We couldn't find any pieces matching your current filter criteria. Try adjusting your filters or search keywords.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-black text-white px-6 py-2.5 rounded-full font-mono text-xs font-bold hover:bg-zinc-800 transition-colors shadow-md"
            >
              SHOW ALL COLLECTION
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
