import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, Truck, ShieldCheck, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, isWishlisted, toggleWishlist, openCheckout } = useCart();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  if (!quickViewProduct) return null;

  const images = quickViewProduct.galleryImages.length > 0 ? quickViewProduct.galleryImages : [quickViewProduct.primaryImage, quickViewProduct.secondaryImage];
  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, undefined, quantity);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedSize, undefined, quantity);
    closeQuickView();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#121214] border border-white/20 rounded-3xl overflow-hidden text-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-black text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery View */}
          <div className="relative bg-zinc-900 flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-white/10">
            
            {/* Main Active Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black border border-white/10 group">
              <img
                src={images[selectedImageIndex] || quickViewProduct.primaryImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-[10px] font-mono text-white px-2.5 py-1 rounded-md border border-white/20">
                  {quickViewProduct.gsm} GSM DENSITY
                </span>
                {quickViewProduct.isBestSeller && (
                  <span className="bg-white text-black text-[10px] font-mono font-bold px-2.5 py-0.5 rounded shadow">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Gallery Arrow Nav */}
              {images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                    className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-white ring-2 ring-white/50 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Product Details & Selectors */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full text-zinc-200">
                  {quickViewProduct.categoryName}
                </span>
                <div className="flex items-center gap-1.5 text-white">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span className="font-bold">{quickViewProduct.rating}</span>
                  <span className="text-zinc-500">({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white leading-tight">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-mono font-black text-white">
                    Rs. {quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm font-mono text-zinc-500 line-through">
                      Rs. {quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-mono text-emerald-400">
                    In Stock & Ready to Ship
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Fabric Specs Box */}
              <div className="bg-zinc-900/90 border border-white/10 p-3.5 rounded-2xl space-y-1.5 text-xs font-mono">
                <div className="text-zinc-400 uppercase text-[10px] tracking-wider">
                  ARCHIVAL SPECIFICATION
                </div>
                <div className="text-white">
                  {quickViewProduct.fabricSpecs}
                </div>
                <div className="text-zinc-400 text-[11px]">
                  Fit Profile: <span className="text-zinc-200">{quickViewProduct.fit}</span>
                </div>
              </div>

              {/* Size Selector with Size Guide Trigger */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 uppercase font-bold">SELECT SIZE:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                    className="flex items-center gap-1 text-zinc-300 hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" /> Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      id={`modal-size-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-white text-black border-white shadow-lg'
                          : 'bg-zinc-900 border-white/15 text-zinc-300 hover:border-white/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Guide Table Overlay */}
              {isSizeGuideOpen && (
                <div className="p-3 bg-zinc-950 border border-white/15 rounded-xl text-[11px] font-mono space-y-2 animate-in fade-in duration-200">
                  <div className="flex justify-between font-bold text-white border-b border-white/10 pb-1">
                    <span>SIZE</span>
                    <span>CHEST (IN)</span>
                    <span>LENGTH (IN)</span>
                    <span>WAIST (IN)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400"><span>S</span><span>42"</span><span>28.5"</span><span>28-30"</span></div>
                  <div className="flex justify-between text-zinc-400"><span>M</span><span>44"</span><span>29.5"</span><span>31-33"</span></div>
                  <div className="flex justify-between text-zinc-400"><span>L</span><span>46"</span><span>30.5"</span><span>34-36"</span></div>
                  <div className="flex justify-between text-zinc-400"><span>XL</span><span>48"</span><span>31.5"</span><span>37-39"</span></div>
                  <div className="flex justify-between text-zinc-400"><span>XXL</span><span>50"</span><span>32.5"</span><span>40-42"</span></div>
                </div>
              )}

            </div>

            {/* Actions: Add to Cart & Wishlist */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              
              <div className="flex items-center gap-3">
                
                {/* Quantity modifier */}
                <div className="flex items-center bg-zinc-900 border border-white/15 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-black hover:bg-zinc-200 py-3.5 rounded-2xl font-bold font-mono text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-xl cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG • Rs. {(quickViewProduct.price * quantity).toLocaleString()}</span>
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white transition-colors cursor-pointer"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white text-white' : 'text-zinc-400'}`} />
                </button>

              </div>

              {/* Buy Now Direct Checkout Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-colors border border-white/15 cursor-pointer"
              >
                BUY NOW • INSTANT CHECKOUT
              </button>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Free Express Shipping Over Rs. 4,990
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 7-Day Easy Exchange
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
