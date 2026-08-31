import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, openProductPage, setSelectedCategory } = useCart();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const trendingTags = [
    'Straight-Leg Baggy',
    '300 GSM Drop-Shoulder',
    'Waffle Knit Polo',
    'Pleated Trouser',
    'Acid Wash Oversized',
    'Cotton Cargo'
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const searchResults = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSelectTrending = (tag: string) => {
    setSearchQuery(tag);
  };

  const handleViewAllResults = () => {
    setIsSearchOpen(false);
    const elem = document.getElementById('collection-grid');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 px-4">
          
          {/* Click outside to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer" 
            onClick={() => setIsSearchOpen(false)} 
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-3xl overflow-hidden text-zinc-950 shadow-2xl z-10 my-4"
          >
            
            {/* Search Input Header */}
            <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center gap-3 bg-zinc-50">
              <Search className="w-5 h-5 text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search baggy trousers, drop-shoulder tees, knit polos, 300 GSM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-zinc-950 placeholder-zinc-400 focus:outline-none font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-zinc-400 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                id="close-search-modal-btn"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-mono text-zinc-600 hover:text-black px-2.5 py-1 bg-zinc-200 rounded-lg cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Search Body Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Trending Searches */}
              {!searchQuery && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>POPULAR SEARCHES</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                      <button
                        key={tag}
                        id={`trending-tag-${tag}`}
                        onClick={() => handleSelectTrending(tag)}
                        className="bg-zinc-100 hover:bg-black hover:text-white border border-zinc-200 text-zinc-800 text-xs font-mono px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Results */}
              {searchQuery && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>FOUND {searchResults.length} PIECES MATCHING "{searchQuery}"</span>
                    {searchResults.length > 0 && (
                      <button
                        onClick={handleViewAllResults}
                        className="text-black font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        View in Grid <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 space-y-2">
                      <p className="text-sm font-medium">No matching pieces found.</p>
                      <p className="text-xs font-mono text-zinc-400">Try searching for "Trouser", "Drop Shoulder", "Polo", or "GSM"</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResults.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            openProductPage(prod);
                          }}
                          className="flex items-center gap-3.5 p-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 rounded-2xl cursor-pointer transition-all group"
                        >
                          <div className="w-16 h-20 rounded-xl overflow-hidden bg-zinc-200 shrink-0 border border-zinc-200">
                            <img
                              src={prod.primaryImage}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">
                              {prod.categoryName}
                            </span>
                            <h4 className="text-xs font-bold text-zinc-950 truncate group-hover:text-zinc-700">
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-mono font-bold text-zinc-950">
                                Rs. {prod.price.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500">
                                {prod.gsm} GSM
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quick Categories Bar */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Browse Categories:</span>
                <div className="flex items-center gap-3 text-zinc-800 font-medium">
                  <button
                    onClick={() => {
                      setSelectedCategory('trousers');
                      handleViewAllResults();
                    }}
                    className="hover:text-black underline underline-offset-4 cursor-pointer"
                  >
                    Trousers
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('drop-shoulder');
                      handleViewAllResults();
                    }}
                    className="hover:text-black underline underline-offset-4 cursor-pointer"
                  >
                    Drop Shoulder
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('polos');
                      handleViewAllResults();
                    }}
                    className="hover:text-black underline underline-offset-4 cursor-pointer"
                  >
                    Polos
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
