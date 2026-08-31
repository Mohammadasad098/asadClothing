import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Share2, Sparkles, Star, ChevronRight, Layers, Ruler } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const { addToCart, isWishlisted, toggleWishlist, openProductPage, setSelectedCategory, showToast, openCheckout } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'fit' | 'shipping'>('specs');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(product.primaryImage);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id, product.primaryImage]);

  const wishlisted = isWishlisted(product.id);

  // Recommendations: Other pieces in same or complimentary category
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, undefined, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, undefined, quantity);
    openCheckout();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-24 pb-20">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-zinc-200 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <button
            id="back-to-catalog-btn"
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-mono font-bold text-zinc-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO COLLECTION</span>
          </button>

          {/* Breadcrumb path */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <button onClick={onBack} className="hover:text-black">HOME</button>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <button 
              onClick={() => {
                setSelectedCategory(product.category);
                onBack();
              }} 
              className="hover:text-black uppercase"
            >
              {product.categoryName}
            </button>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-zinc-900 font-bold truncate max-w-[200px]">{product.name}</span>
          </div>

          <button
            id="share-product-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-black"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SHARE</span>
          </button>

        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Multi-Angle High Res Images */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {product.isNew && (
                  <span className="bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                    NEW RELEASE
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-900 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                    BEST SELLER
                  </span>
                )}
              </div>

              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-900 font-mono font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                {product.gsm} GSM DENSITY
              </span>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-3">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  id={`product-thumbnail-${idx}`}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-black ring-2 ring-black/10 scale-95'
                      : 'border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Buying Controls & Comprehensive Specs */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
            
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-zinc-200">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  {product.categoryName}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3" /> IN STOCK • READY TO SHIP
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
                {product.name}
              </h1>

              {/* Price in PKR */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-zinc-950">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                  Inclusive of all taxes
                </span>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed pt-2">
                {product.description}
              </p>

            </div>

            {/* Size Selector with Size Guide button */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 font-bold uppercase">SELECT SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-zinc-700 hover:text-black underline underline-offset-4"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    id={`detail-size-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl font-mono text-sm font-bold transition-all flex items-center justify-center cursor-pointer ${
                      selectedSize === size
                        ? 'bg-black text-white shadow-md'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-zinc-300 rounded-xl bg-zinc-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-10 flex items-center justify-center font-mono font-bold text-sm hover:bg-zinc-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-10 flex items-center justify-center font-mono font-bold text-sm hover:bg-zinc-200 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart Primary Button */}
                <button
                  id="detail-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-black hover:bg-zinc-800 text-white py-3.5 px-6 rounded-xl font-mono font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-98 shadow-xl hover:shadow-2xl cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG • Rs. {(product.price * quantity).toLocaleString()}</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  id="detail-wishlist-btn"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    wishlisted
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                  }`}
                  title={wishlisted ? 'Saved to wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Buy Now Direct Checkout Button */}
              <button
                id="detail-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full bg-zinc-900 hover:bg-black text-white py-3.5 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-98 border border-zinc-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>BUY NOW • PROCEED TO CHECKOUT</span>
              </button>

            </div>

            {/* Delivery & Service Assurances in Pakistan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-700">
              <div className="flex items-start gap-2 bg-[#fafafa] p-3 rounded-xl border border-zinc-200">
                <Truck className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-zinc-950">Fast Pakistan Delivery</span>
                  <span className="text-[11px] text-zinc-500">2-4 business days</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#fafafa] p-3 rounded-xl border border-zinc-200">
                <RotateCcw className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-zinc-950">7-Day Easy Exchange</span>
                  <span className="text-[11px] text-zinc-500">Hassle-free sizing</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#fafafa] p-3 rounded-xl border border-zinc-200">
                <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-zinc-950">Cash On Delivery</span>
                  <span className="text-[11px] text-zinc-500">Available nationwide</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Accordion Tabs */}
            <div className="pt-4 border-t border-zinc-200 space-y-3">
              <div className="flex border-b border-zinc-200">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-black text-black'
                      : 'border-transparent text-zinc-500 hover:text-black'
                  }`}
                >
                  FABRIC & SPECS
                </button>
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`pb-2 px-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors border-b-2 ${
                    activeTab === 'fit'
                      ? 'border-black text-black'
                      : 'border-transparent text-zinc-500 hover:text-black'
                  }`}
                >
                  FIT & SILHOUETTE
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 px-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors border-b-2 ${
                    activeTab === 'shipping'
                      ? 'border-black text-black'
                      : 'border-transparent text-zinc-500 hover:text-black'
                  }`}
                >
                  SHIPPING & CARE
                </button>
              </div>

              <div className="text-xs text-zinc-600 font-mono leading-relaxed pt-1">
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p><strong className="text-black">Fabric Composition:</strong> {product.fabricSpecs}</p>
                    <p><strong className="text-black">Weight & Density:</strong> {product.gsm} GSM Heavyweight Construction</p>
                    <p><strong className="text-black">Hardware:</strong> Custom tonal trims, reinforced double-needle lock stitching</p>
                  </div>
                )}

                {activeTab === 'fit' && (
                  <div className="space-y-2">
                    <p><strong className="text-black">Cut:</strong> {product.fit}</p>
                    <p><strong className="text-black">Model Size:</strong> Model is 6'1" (185cm) wearing Size Large for signature relaxed streetwear drape</p>
                    <p><strong className="text-black">Recommendation:</strong> Choose your normal size for intended relaxed fit, or size down for a slimmer profile.</p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p><strong className="text-black">Shipping:</strong> Free nationwide shipping on orders over Rs. 4,990. Standard Rs. 250 for orders below.</p>
                    <p><strong className="text-black">Care:</strong> Machine wash cold with similar dark colors inside out. Do not tumble dry. Hang dry in shade.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Matching & Related Archive Pieces */}
        <div className="mt-24 pt-16 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold block mb-1">
                COMPLETE THE LOOK
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-950 uppercase">
                YOU MAY ALSO LIKE
              </h2>
            </div>
            
            <button
              onClick={onBack}
              className="text-xs font-mono font-bold text-zinc-800 hover:text-black underline underline-offset-4"
            >
              VIEW ALL PIECES →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                id={`related-product-card-${relProduct.id}`}
                onClick={() => openProductPage(relProduct)}
                className="group cursor-pointer bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden">
                  <img
                    src={relProduct.primaryImage}
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-200">
                    {relProduct.gsm} GSM
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    {relProduct.categoryName}
                  </span>
                  <h3 className="text-xs font-bold text-zinc-950 truncate group-hover:text-zinc-700">
                    {relProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="font-mono text-xs font-bold text-zinc-950">
                      Rs. {relProduct.price.toLocaleString()}
                    </span>
                    {relProduct.originalPrice && (
                      <span className="font-mono text-[10px] text-zinc-400 line-through">
                        Rs. {relProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal Popup */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-zinc-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="font-display font-extrabold text-lg uppercase text-zinc-950">
                SIZE GUIDE & MEASUREMENTS (INCHES)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-zinc-500 hover:text-black font-mono font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th className="p-2.5 font-bold">SIZE</th>
                    <th className="p-2.5 font-bold">CHEST / WAIST</th>
                    <th className="p-2.5 font-bold">LENGTH</th>
                    <th className="p-2.5 font-bold">SHOULDER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">42" / 28-30"</td>
                    <td className="p-2.5">28.5"</td>
                    <td className="p-2.5">21.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">44" / 31-33"</td>
                    <td className="p-2.5">29.5"</td>
                    <td className="p-2.5">22.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">46" / 34-36"</td>
                    <td className="p-2.5">30.5"</td>
                    <td className="p-2.5">23.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">48" / 37-39"</td>
                    <td className="p-2.5">31.5"</td>
                    <td className="p-2.5">24.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XXL</td>
                    <td className="p-2.5">50" / 40-42"</td>
                    <td className="p-2.5">32.5"</td>
                    <td className="p-2.5">25.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] font-mono text-zinc-500 leading-relaxed">
              * Measurements are in inches. Designed for an intentional relaxed oversized fit. If you want a tailored fit, we recommend sizing down one size.
            </p>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full bg-black text-white py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-zinc-800"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
