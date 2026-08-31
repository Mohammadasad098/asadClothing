import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Tag, ShoppingBag, Eye, Shield, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const VideoSection: React.FC = () => {
  const { openProductPage, addToCart } = useCart();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activePin, setActivePin] = useState<string | null>('prod-trouser-01');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const hotspotProducts = [
    {
      id: 'prod-trouser-01',
      title: 'Straight-Leg Pleated Baggy Trouser',
      price: 6490,
      category: 'Baggy Trousers',
      top: '65%',
      left: '52%',
      label: 'Bottom: 340 GSM Pleated Trouser'
    },
    {
      id: 'prod-tee-01',
      title: 'Heavyweight 300 GSM Drop-Shoulder Tee',
      price: 3490,
      category: 'Drop-Shoulder Tops',
      top: '32%',
      left: '48%',
      label: 'Top: 300 GSM Boxy Drop-Shoulder'
    }
  ];

  const selectedProduct = PRODUCTS.find((p) => p.id === activePin) || PRODUCTS[0];

  return (
    <section id="video-campaign-section" className="py-20 bg-[#f8f8fa] text-zinc-900 border-y border-zinc-200 relative overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              CINEMATIC CAMPAIGN
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 uppercase">
              STUDIO IN MOTION
            </h2>
          </div>
          <p className="text-zinc-600 text-sm max-w-md font-normal leading-relaxed">
            Experience how the heavyweight cotton and architectural drape move naturally in real-life settings. Tap the interactive hotspot pins to shop the look directly.
          </p>
        </div>

        {/* Video & Interactive Shoppable Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Video Frame with Interactive Pins */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-300 shadow-xl group min-h-[460px] sm:min-h-[560px]">
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-young-man-sitting-in-a-chair-in-a-studio-41486-large.mp4"
              poster="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Interactive Shoppable Pins on Model */}
            {hotspotProducts.map((pin) => (
              <div
                key={pin.id}
                className="absolute z-20"
                style={{ top: pin.top, left: pin.left }}
              >
                <button
                  id={`video-hotspot-pin-${pin.id}`}
                  onClick={() => setActivePin(pin.id)}
                  className={`group/pin relative flex items-center justify-center p-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activePin === pin.id
                      ? 'bg-white text-black scale-125 ring-4 ring-white/40 shadow-lg'
                      : 'bg-black/80 text-white hover:bg-white hover:text-black'
                  }`}
                  aria-label={pin.label}
                >
                  <Tag className="w-3.5 h-3.5" />
                  
                  {/* Ping Animation */}
                  <span className="absolute -inset-1 rounded-full bg-white/50 animate-ping pointer-events-none opacity-75" />

                  {/* Tooltip Label */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 bg-white text-zinc-900 text-[11px] font-mono px-3 py-1.5 rounded-lg border border-zinc-200 whitespace-nowrap shadow-xl">
                    <span className="font-medium">{pin.label}</span>
                    <span className="font-bold text-black">Rs. {pin.price.toLocaleString()}</span>
                  </div>
                </button>
              </div>
            ))}

            {/* Floating Video Overlay Bar */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <button
                  id="video-play-pause-btn"
                  onClick={togglePlay}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-md border border-zinc-200 text-zinc-900 text-xs font-mono font-bold px-4 py-2.5 rounded-full transition-colors shadow-md cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <button
                  id="video-mute-btn"
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-zinc-200 text-zinc-900 transition-colors shadow-md cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-mono text-white font-medium">
                4K EDITORIAL CAMPAIGN
              </div>
            </div>
          </div>

          {/* Right Column: Active Pin Product Detail Card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Active Shoppable Product Card */}
            <div 
              onClick={() => openProductPage(selectedProduct)}
              className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-lg flex-1 flex flex-col justify-between cursor-pointer hover:border-zinc-400 transition-all"
            >
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-semibold tracking-widest text-zinc-700 uppercase bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
                    TAGGED IN LOOKBOOK
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-medium">
                    {selectedProduct.gsm} GSM FABRIC
                  </span>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <img
                      src={selectedProduct.primaryImage}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-base font-bold text-zinc-950 leading-snug">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-zinc-600 text-xs line-clamp-2">
                      {selectedProduct.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-mono font-extrabold text-zinc-950">
                        Rs. {selectedProduct.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Garment Highlights */}
                <div className="space-y-2.5 py-4 border-y border-zinc-100 text-xs font-mono text-zinc-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                    <span>Fit: {selectedProduct.fit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                    <span>Specs: {selectedProduct.fabricSpecs.split('•')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                    <span>Archival Heavyweight Cotton Construction</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 grid grid-cols-2 gap-3">
                <button
                  id="video-product-add-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(selectedProduct, selectedProduct.sizes[0], undefined);
                  }}
                  className="flex items-center justify-center gap-2 bg-black text-white hover:bg-zinc-800 py-3 rounded-xl font-bold text-xs tracking-wider transition-colors active:scale-95 shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  id="video-product-view-page-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductPage(selectedProduct);
                  }}
                  className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-900 py-3 rounded-xl font-mono text-xs tracking-wider transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>VIEW PAGE</span>
                </button>
              </div>

            </div>

            {/* Guarantee Box */}
            <div className="bg-zinc-100 border border-zinc-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-zinc-600 shadow-sm">
              <Shield className="w-5 h-5 text-zinc-900 shrink-0" />
              <span>Complimentary nationwide exchanges & 7-day hassle-free returns across Pakistan.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
