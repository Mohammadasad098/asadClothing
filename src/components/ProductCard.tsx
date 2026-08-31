import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openProductPage, isWishlisted, toggleWishlist } = useCart();
  
  const [isHovered, setIsHovered] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    e.stopPropagation();
    addToCart(product, size, undefined, 1);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProductPage(product)}
    >
      {/* Product Image Frame with Hover Image Swap */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
        {/* Primary Image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image on Hover */}
        <img
          src={product.secondaryImage}
          alt={`${product.name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                NEW DROP
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-900 text-[9px] font-mono font-semibold px-2 py-0.5 rounded shadow-sm">
                BEST SELLER
              </span>
            )}
          </div>

          <span className="bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-800 font-bold text-[9px] font-mono px-2 py-0.5 rounded shadow-sm">
            {product.gsm} GSM
          </span>
        </div>

        {/* Floating Quick Action Buttons (Wishlist & View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-zinc-900 backdrop-blur-md border border-zinc-200 transition-transform active:scale-90 hover:scale-110 shadow-md"
            aria-label="Toggle wishlist"
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-700'}`} />
          </button>

          <button
            id={`quick-view-trigger-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              openProductPage(product);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-zinc-900 backdrop-blur-md border border-zinc-200 transition-transform active:scale-90 hover:scale-110 shadow-md opacity-0 group-hover:opacity-100 duration-200"
            aria-label="View Details"
            title="Open product page"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-700" />
          </button>
        </div>

        {/* Hover Quick Size Selector Bar */}
        <div
          className={`absolute bottom-3 left-3 right-3 z-20 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-zinc-200 p-2.5 rounded-xl shadow-xl space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 px-1 font-semibold">
              <span>QUICK ADD:</span>
              <span className="text-black font-extrabold">Rs. {product.price.toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-5 gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  id={`quick-add-size-${product.id}-${size}`}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="bg-zinc-100 hover:bg-black text-zinc-900 hover:text-white py-1.5 rounded-lg text-xs font-mono font-bold transition-colors flex items-center justify-center active:scale-95 border border-zinc-200/60 shadow-xs"
                  title={`Add Size ${size} directly`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Product Meta Section */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        
        <div>
          {/* Category */}
          <div className="text-[11px] font-mono text-zinc-500 mb-1 font-medium">
            <span className="uppercase tracking-wider">{product.categoryName}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-zinc-950 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-zinc-700 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Fit description */}
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {product.fit}
          </p>
        </div>

        {/* Product Bottom Details & Price */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
            {product.gsm} GSM
          </span>

          {/* Pricing in PKR */}
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-zinc-950">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
