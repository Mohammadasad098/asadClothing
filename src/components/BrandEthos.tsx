import React from 'react';
import { Layers, Shield, Sparkles, RefreshCw, Feather, Scissors } from 'lucide-react';

export const BrandEthos: React.FC = () => {
  const pillars = [
    {
      icon: Layers,
      title: '300–480 GSM DENSITY',
      desc: 'Engineered with extreme yarn density. Holds a sculptural boxy drape without clinging, wash after wash.'
    },
    {
      icon: Scissors,
      title: 'ARCHITECTURAL DRAPE',
      desc: 'Drop shoulders set 3 inches below the clavicle with deep pleated straight-leg trouser cuts that pool naturally over footwear.'
    },
    {
      icon: Feather,
      title: 'ENZYME PRE-WASHED',
      desc: 'Zero shrinkage guarantee. Every single piece is garment-dyed and pre-washed with organic softening enzymes.'
    },
    {
      icon: Shield,
      title: 'MONOCHROMATIC PURITY',
      desc: 'Strict color palette of Onyx Black, Slate Grey, and Chalk White for effortless capsule layering.'
    }
  ];

  return (
    <section className="py-20 bg-white text-zinc-900 border-t border-zinc-200 relative overflow-hidden">
      
      {/* Subtle Dot Matrix Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Ticker / Running Marquee Bar */}
        <div className="border-y border-zinc-200 py-4 mb-16 overflow-hidden relative bg-zinc-50/50">
          <div className="flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-600 uppercase">
            <span className="text-black font-extrabold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-black" /> ARCHIVAL STREETWEAR SPECIFICATION
            </span>
            <span>•</span>
            <span>HEAVYWEIGHT COMBED COTTON</span>
            <span>•</span>
            <span>JAPANESE SELVEDGE DENIM</span>
            <span>•</span>
            <span>DOUBLE FRONT PLEATS</span>
            <span>•</span>
            <span>3D WAFFLE KNIT POLOS</span>
            <span>•</span>
            <span>BOX-FIT DROP SHOULDER</span>
            <span>•</span>
            <span className="text-black font-bold">MONOCHROME STUDIO 2026</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2 font-semibold">
            DESIGN PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-zinc-950 uppercase tracking-tight">
            NO LOGOS. PURE PROPORTION & WEIGHT.
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f8f8fa] border border-zinc-200 hover:border-zinc-400 rounded-3xl p-6 space-y-4 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors shadow-sm">
                <item.icon className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-950">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
