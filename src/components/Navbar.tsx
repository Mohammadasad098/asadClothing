import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES_LIST } from '../data/products';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const {
    totalItems,
    openCart,
    setIsSearchOpen,
    setIsAuthOpen,
    user,
    wishlist,
    selectedCategory,
    setSelectedCategory,
    closeProductPage,
    closeCheckout
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    'FREE EXPRESS DELIVERY ACROSS PAKISTAN ON ORDERS OVER RS. 4,990',
    'ARCHIVE DROP: 300+ GSM HEAVYWEIGHT DROP-SHOULDER TEES & BAGGY TROUSERS',
    'CASH ON DELIVERY (COD) & 7-DAY EASY EXCHANGES NATIONWIDE'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleCategoryClick = (catId: string) => {
    closeCheckout();
    closeProductPage();
    setSelectedCategory(catId);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const elem = document.getElementById('collection-grid');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSectionScroll = (id: string) => {
    closeCheckout();
    closeProductPage();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-black text-[#a1a1aa] text-[11px] font-medium tracking-widest uppercase border-b border-white/5 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-4 text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              EDITION 2026 / LIMITED UNITS
            </span>
          </div>

          <div className="mx-auto flex items-center gap-2 overflow-hidden text-center text-white/90">
            <Sparkles className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="transition-all duration-500 font-semibold tracking-wider">
              {announcements[announcementIndex]}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-zinc-400 text-[11px]">
            <button 
              id="announcement-currency-btn"
              className="hover:text-white transition-colors cursor-pointer text-white font-mono"
            >
              PKR (Rs.)
            </button>
            <span>•</span>
            <span className="hover:text-white transition-colors">7-DAY RETURNS</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm py-3.5'
            : 'bg-white/80 backdrop-blur-md border-b border-zinc-200/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            
            {/* LEFT: Search Trigger Icon (User explicit mandate) */}
            <div className="flex items-center space-x-2">
              <button
                id="navbar-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="group flex items-center gap-2 p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-700 hover:text-black"
                aria-label="Search products"
                title="Search collection (Press /)"
              >
                <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="hidden lg:inline text-xs font-mono tracking-wider text-zinc-500 group-hover:text-black font-semibold">
                  SEARCH
                </span>
                <span className="hidden xl:inline text-[10px] bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-600 font-mono">
                  ⌘K
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                id="navbar-mobile-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* CENTER: Brand Title / Logo & Desktop Centered Nav */}
            <div className="flex flex-col items-center justify-center">
              <a
                href="#"
                id="brand-logo-link"
                className="group flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  closeCheckout();
                  closeProductPage();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="font-display text-lg sm:text-2xl font-extrabold tracking-[0.25em] text-zinc-950 uppercase group-hover:text-zinc-700 transition-colors">
                  MONOCHROME
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-700 font-bold">
                  STUDIO
                </span>
              </a>

              {/* Centered Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6 mt-1 text-[11px] font-bold tracking-[0.18em] uppercase text-zinc-500">
                <button
                  id="nav-link-all"
                  onClick={() => handleCategoryClick('all')}
                  className={`hover:text-black transition-colors relative py-1 ${
                    selectedCategory === 'all' ? 'text-black' : ''
                  }`}
                >
                  ALL
                  {selectedCategory === 'all' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                  )}
                </button>

                <button
                  id="nav-link-trousers"
                  onClick={() => handleCategoryClick('trousers')}
                  className={`hover:text-black transition-colors relative py-1 ${
                    selectedCategory === 'trousers' ? 'text-black' : ''
                  }`}
                >
                  BAGGY TROUSERS
                  {selectedCategory === 'trousers' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                  )}
                </button>

                <button
                  id="nav-link-drop-shoulder"
                  onClick={() => handleCategoryClick('drop-shoulder')}
                  className={`hover:text-black transition-colors relative py-1 ${
                    selectedCategory === 'drop-shoulder' ? 'text-black' : ''
                  }`}
                >
                  DROP SHOULDER
                  {selectedCategory === 'drop-shoulder' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                  )}
                </button>

                <button
                  id="nav-link-polos"
                  onClick={() => handleCategoryClick('polos')}
                  className={`hover:text-black transition-colors relative py-1 ${
                    selectedCategory === 'polos' ? 'text-black' : ''
                  }`}
                >
                  POLOS & KNITS
                  {selectedCategory === 'polos' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                  )}
                </button>

                <button
                  id="nav-link-campaign"
                  onClick={() => handleSectionScroll('video-campaign-section')}
                  className="hover:text-black transition-colors py-1"
                >
                  CAMPAIGN VIDEO
                </button>

                <button
                  id="nav-link-reviews"
                  onClick={() => handleSectionScroll('reviews-section')}
                  className="hover:text-black transition-colors py-1"
                >
                  REVIEWS (4.9★)
                </button>
              </div>
            </div>

            {/* RIGHT: Login & Cart Icons (User explicit mandate: login & card icon) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Wishlist Icon */}
              <button
                id="navbar-wishlist-btn"
                onClick={() => {
                  const elem = document.getElementById('collection-grid');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-700 hover:text-black"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-black text-black' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Login / User Account Icon */}
              <button
                id="navbar-login-btn"
                onClick={() => setIsAuthOpen(true)}
                className="group flex items-center gap-1.5 p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-700 hover:text-black"
                aria-label="Account Login"
                title={user ? `Signed in as ${user.name}` : 'Login / Account'}
              >
                <User className="w-5 h-5 transition-transform group-hover:scale-110" />
                {user ? (
                  <span className="hidden md:inline text-xs font-mono font-bold max-w-[80px] truncate text-zinc-900">
                    {user.name.split(' ')[0]}
                  </span>
                ) : (
                  <span className="hidden md:inline text-xs font-mono tracking-wider text-zinc-600 group-hover:text-black font-semibold">
                    LOGIN
                  </span>
                )}
              </button>

              {/* Cart Icon (opens side dropdown / drawer from right) */}
              <button
                id="navbar-cart-btn"
                onClick={openCart}
                className="relative group flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-3.5 py-2 rounded-full transition-all duration-200 active:scale-95 shadow-md"
                aria-label="Shopping Bag"
                title="Open Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold font-mono tracking-wider">
                  BAG
                </span>
                <span className="bg-white text-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {totalItems}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
              COLLECTIONS
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm font-semibold uppercase tracking-wider">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.id}
                  id={`mobile-nav-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center justify-between text-left py-2 px-3 rounded-lg transition-colors ${
                    selectedCategory === cat.id ? 'bg-black text-white' : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs font-mono opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex flex-col gap-2">
              <button
                id="mobile-nav-campaign"
                onClick={() => handleSectionScroll('video-campaign-section')}
                className="flex items-center justify-between text-sm text-zinc-700 py-2 px-3 hover:bg-zinc-100 rounded-lg"
              >
                <span>CAMPAIGN VIDEO & LOOKBOOK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="mobile-nav-reviews"
                onClick={() => handleSectionScroll('reviews-section')}
                className="flex items-center justify-between text-sm text-zinc-700 py-2 px-3 hover:bg-zinc-100 rounded-lg"
              >
                <span>CUSTOMER REVIEWS (4.9 / 5.0)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
