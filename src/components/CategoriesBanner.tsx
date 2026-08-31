import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CategoriesBanner: React.FC = () => {
  const { setSelectedCategory } = useCart();

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    const elem = document.getElementById('collection-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#fafafa] text-zinc-900 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-2 block font-semibold">
              CURATED SILHOUETTES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 uppercase">
              ARCHIVE PILLARS
            </h2>
          </div>
          <p className="text-zinc-600 text-sm max-w-md font-normal">
            Three fundamental wardrobe building blocks: straight wide-leg trousers, relaxed drop-shoulder tees, and textured resort polos.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Straight-Leg Baggy Trousers */}
          <div
            id="category-card-trousers"
            onClick={() => handleCategorySelect('trousers')}
            className="group relative h-[480px] rounded-3xl overflow-hidden cursor-pointer border border-zinc-200 bg-zinc-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
              alt="Straight-Leg Baggy Trousers"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="bg-white/90 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-zinc-900 font-bold px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                340 GSM SUITING & RAW SELVEDGE
              </span>
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
                CATEGORY 01
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase">
                STRAIGHT-LEG & BAGGY
              </h3>
              <p className="text-xs text-zinc-200 line-clamp-2">
                Double-pleated tailoring, deep side pockets, and relaxed ankle drape.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono font-bold text-white group-hover:underline underline-offset-4">
                  EXPLORE TROUSERS →
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Drop-Shoulder Tees */}
          <div
            id="category-card-tees"
            onClick={() => handleCategorySelect('drop-shoulder')}
            className="group relative h-[480px] rounded-3xl overflow-hidden cursor-pointer border border-zinc-200 bg-zinc-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
              alt="Drop Shoulder T-Shirts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="bg-white/90 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-zinc-900 font-bold px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                300 GSM HEAVYWEIGHT
              </span>
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
                CATEGORY 02
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase">
                DROP-SHOULDER TEES
              </h3>
              <p className="text-xs text-zinc-200 line-clamp-2">
                Heavyweight organic cotton, tight rib mock necks, and architectural boxy sleeves.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono font-bold text-white group-hover:underline underline-offset-4">
                  EXPLORE TEES →
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Polos & Knits */}
          <div
            id="category-card-polos"
            onClick={() => handleCategorySelect('polos')}
            className="group relative h-[480px] rounded-3xl overflow-hidden cursor-pointer border border-zinc-200 bg-zinc-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src="https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=800&auto=format&fit=crop"
              alt="Polos and Knits"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="bg-white/90 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-zinc-900 font-bold px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                3D WAFFLE & INTERLOCK
              </span>
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
                CATEGORY 03
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase">
                POLOS & KNITS
              </h3>
              <p className="text-xs text-zinc-200 line-clamp-2">
                Open Johnny collars, thermal waffle textures, and relaxed minimal fits.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono font-bold text-white group-hover:underline underline-offset-4">
                  EXPLORE POLOS →
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
