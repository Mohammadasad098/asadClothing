import React from 'react';
import { ArrowUp, Globe, Shield, Instagram, Twitter, Youtube, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, closeProductPage } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: string) => {
    closeProductPage();
    setSelectedCategory(cat);
    const elem = document.getElementById('collection-grid');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSectionNav = (sectionId: string) => {
    closeProductPage();
    const elem = document.getElementById(sectionId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f8f8fa] text-zinc-900 border-t border-zinc-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-zinc-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black tracking-[0.2em] text-zinc-950 uppercase">
                MONOCHROME
              </span>
              <span className="text-[10px] font-mono border border-zinc-300 bg-white px-2 py-0.5 rounded text-zinc-700 font-bold shadow-xs">
                PAKISTAN
              </span>
            </div>

            <p className="text-zinc-600 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
              Minimalist clothing brand in Pakistan. Featuring straight-leg baggy trousers, 300+ GSM heavyweight drop-shoulder t-shirts, and textured polos in monochrome tones.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-colors shadow-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-colors shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Silhouettes */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-600">
              <li>
                <button
                  onClick={() => handleCategoryNav('all')}
                  className="hover:text-black transition-colors text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('trousers')}
                  className="hover:text-black transition-colors text-left"
                >
                  Baggy & Straight Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('drop-shoulder')}
                  className="hover:text-black transition-colors text-left"
                >
                  Drop Shoulder Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('polos')}
                  className="hover:text-black transition-colors text-left"
                >
                  Waffle Knit Polos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('hoodies-outerwear')}
                  className="hover:text-black transition-colors text-left"
                >
                  Heavyweight Hoodies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-600">
              <li><a href="#" className="hover:text-black transition-colors">Nationwide Delivery & COD</a></li>
              <li><a href="#" className="hover:text-black transition-colors">7-Day Easy Exchange Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Size Guide & Fit Advice</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Washing & Care Instructions</a></li>
              <li>
                <button
                  onClick={() => handleSectionNav('reviews-section')}
                  className="hover:text-black transition-colors text-left"
                >
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand Info */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
              OUR PROMISE
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-600">
              <li><a href="#" className="hover:text-black transition-colors">300+ GSM Pure Combed Cotton</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Heavyweight Interlock Fabric</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Designed & Produced in Pakistan</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cash On Delivery Nationwide</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          
          <div className="flex items-center gap-4">
            <span>© 2026 MONOCHROME APPAREL PAKISTAN. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-700 font-medium">
              <Globe className="w-3.5 h-3.5" />
              <span>PAKISTAN / PKR (Rs.)</span>
            </div>

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer text-zinc-700 font-bold"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
