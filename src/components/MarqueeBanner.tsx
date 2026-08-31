import React from 'react';
import { Sparkles, Shield, Truck, RotateCcw, Feather, Layers, CheckCircle2 } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const tickerItems1 = [
    { text: '300+ GSM HEAVYWEIGHT COMBED COTTON', highlight: true },
    { text: 'DOUBLE-PLEATED STRAIGHT-LEG BAGGY CUTS', highlight: false },
    { text: 'NO LOGOS — PURE FORM & SILHOUETTE', highlight: true },
    { text: 'NATIONWIDE CASH ON DELIVERY ACROSS PAKISTAN', highlight: false },
    { text: 'PRE-SHRUNK WITH ORGANIC ENZYME WASH', highlight: false },
    { text: 'CUSTOM TONAL HARDWARE & SUITING TWILL', highlight: true },
    { text: '7-DAY HASSLE-FREE EXCHANGES', highlight: false }
  ];

  const tickerItems2 = [
    { text: 'MONOCHROME ARCHIVAL APPAREL 2026', highlight: true },
    { text: 'HEAVY WAFFLE KNIT POLOS', highlight: false },
    { text: '420 GSM SELVEDGE RAW DENIM', highlight: false },
    { text: 'KARACHI • LAHORE • ISLAMABAD • PESHAWAR • QUETTA • MULTAN', highlight: true },
    { text: 'ZERO SHRINKAGE GUARANTEE', highlight: false },
    { text: 'ARCHITECTURAL RELAXED FIT', highlight: true },
    { text: 'FAST DISPATCH WITHIN 24 HOURS', highlight: false }
  ];

  return (
    <section id="brand-marquee-section" className="py-12 bg-white text-zinc-950 border-y border-zinc-200 relative overflow-hidden">
      
      {/* Subtle Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      {/* Top Tag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
          <span>BRAND SPECIFICATIONS & CORE ESSENTIALS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-zinc-500 font-medium">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-black" /> 100% Original</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-black" /> Nationwide Delivery</span>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Track 1 (Left Scrolling Marquee) */}
        <div className="relative overflow-hidden py-3 bg-zinc-950 text-white shadow-md">
          <div className="animate-marquee-slow flex items-center gap-12 font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] whitespace-nowrap select-none">
            {/* Repeated twice for seamless infinite loop */}
            {[...tickerItems1, ...tickerItems1].map((item, idx) => (
              <div key={`track1-${idx}`} className="flex items-center gap-10">
                <span className={item.highlight ? 'text-white' : 'text-zinc-400 font-bold'}>
                  {item.text}
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2 (Right Scrolling Reverse Marquee) */}
        <div className="relative overflow-hidden py-3 bg-zinc-100 border-y border-zinc-200">
          <div className="animate-marquee-reverse-slow flex items-center gap-12 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-800 whitespace-nowrap select-none">
            {/* Repeated twice for seamless infinite loop */}
            {[...tickerItems2, ...tickerItems2].map((item, idx) => (
              <div key={`track2-${idx}`} className="flex items-center gap-10">
                <span className={item.highlight ? 'text-black font-black' : 'text-zinc-600'}>
                  {item.text}
                </span>
                <span className="text-zinc-400 font-mono text-xs">/</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
