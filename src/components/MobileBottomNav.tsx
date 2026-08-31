import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const {
    totalItems,
    openCart,
    setIsSearchOpen,
    wishlist,
    closeProductPage,
    closeCheckout,
    setSelectedCategory,
    isCheckoutOpen
  } = useCart();

  // If in active checkout flow, don't obstruct the checkout actions
  if (isCheckoutOpen) return null;

  const handleHomeClick = () => {
    closeCheckout();
    closeProductPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopClick = () => {
    closeCheckout();
    closeProductPage();
    setSelectedCategory('all');
    setTimeout(() => {
      const elem = document.getElementById('collection-grid');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleWishlistClick = () => {
    closeCheckout();
    closeProductPage();
    setTimeout(() => {
      const elem = document.getElementById('collection-grid');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-zinc-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        
        {/* Home */}
        <button
          id="mobile-bottom-nav-home"
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1 px-2 text-zinc-600 hover:text-black active:scale-95 transition-all w-full"
          aria-label="Home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono font-bold tracking-tight">HOME</span>
        </button>

        {/* Shop / Archive */}
        <button
          id="mobile-bottom-nav-shop"
          onClick={handleShopClick}
          className="flex flex-col items-center justify-center py-1 px-2 text-zinc-600 hover:text-black active:scale-95 transition-all w-full"
          aria-label="Shop Catalog"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono font-bold tracking-tight">ARCHIVE</span>
        </button>

        {/* Search */}
        <button
          id="mobile-bottom-nav-search"
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-zinc-600 hover:text-black active:scale-95 transition-all w-full"
          aria-label="Search"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono font-bold tracking-tight">SEARCH</span>
        </button>

        {/* Wishlist */}
        <button
          id="mobile-bottom-nav-wishlist"
          onClick={handleWishlistClick}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-zinc-600 hover:text-black active:scale-95 transition-all w-full"
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 mb-0.5 ${wishlist.length > 0 ? 'fill-black text-black' : ''}`} />
          <span className="text-[9px] font-mono font-bold tracking-tight">SAVED</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-3 w-3.5 h-3.5 bg-black text-white text-[8px] font-mono font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Bag / Cart */}
        <button
          id="mobile-bottom-nav-bag"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-black active:scale-95 transition-all w-full"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-black text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center border border-white">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono font-extrabold tracking-tight">BAG</span>
        </button>

      </div>
    </div>
  );
};
