import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { HERO_SLIDES, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const HeroSlider: React.FC = () => {
  const { setSelectedCategory, openProductPage, addToCart } = useCart();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const SLIDE_DURATION = 8000; // ms (slower, cinematic pace)
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Progress Bar & Auto-Advance
  useEffect(() => {
    if (!isPlaying) return;

    const intervalStep = 50;
    const increment = (intervalStep / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((oldIndex) => (oldIndex + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlideIndex]);

  // Reset progress when slide changes manually
  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    goToSlide((currentSlideIndex + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleCtaClick = () => {
    if (currentSlide.categoryTarget) {
      setSelectedCategory(currentSlide.categoryTarget);
    }
    const elem = document.getElementById('collection-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredProductObj = PRODUCTS.find((p) => p.id === currentSlide.featuredProduct);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen bg-[#09090b] text-white flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Visual Layer: Slow Smooth Transitions */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1800ms] ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 pointer-events-none scale-105 z-0'
            } transform`}
          >
            {slide.type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={slide.videoUrl}
                  poster={slide.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
                <img
                  src={slide.poster}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />
              </div>
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center brightness-90 transition-transform duration-[8000ms] ease-out scale-105"
              />
            )}

            {/* High-Contrast Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-dot-pattern opacity-10" />
          </div>
        ))}
      </div>

      {/* Grid Overlay Line Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Editorial Headline & Meta */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tag Badge */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-mono font-bold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3 h-3 text-white animate-pulse" />
                {currentSlide.tag}
              </span>
              <span className="text-zinc-200 text-xs font-mono font-medium tracking-widest drop-shadow">
                EDITION 04 / 2026
              </span>
            </div>

            {/* Main Bold Display Title */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-zinc-300 font-semibold drop-shadow">
                {currentSlide.subtitle}
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold uppercase tracking-tight text-white leading-[1.02] sm:leading-[0.95] drop-shadow-2xl break-words">
                {currentSlide.title}
              </h1>
            </div>

            {/* Editorial Description */}
            <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed line-clamp-3 sm:line-clamp-none drop-shadow">
              {currentSlide.description}
            </p>

            {/* CTAs and Slide Interaction buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-cta-btn"
                onClick={handleCtaClick}
                className="group flex items-center gap-3 bg-black text-white hover:bg-zinc-800 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-xl hover:shadow-2xl border border-white/20"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {featuredProductObj && (
                <button
                  id="hero-quick-view-btn"
                  onClick={() => openProductPage(featuredProductObj)}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-zinc-900 px-5 py-3.5 rounded-full font-mono font-semibold text-xs tracking-wider transition-all duration-200 shadow-md backdrop-blur-md"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-700" />
                  <span>VIEW PIECE (Rs. {featuredProductObj.price.toLocaleString()})</span>
                </button>
              )}

              {/* Video Slide Audio Toggle */}
              {currentSlide.type === 'video' && (
                <button
                  id="hero-video-audio-btn"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3.5 rounded-full bg-white/80 hover:bg-white text-zinc-900 backdrop-blur-md border border-white/40 transition-colors shadow-sm"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-black" />}
                </button>
              )}

              {/* Play/Pause Autoplay Control */}
              <button
                id="hero-autoplay-toggle-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3.5 rounded-full bg-white/80 hover:bg-white text-zinc-900 backdrop-blur-md border border-white/40 transition-colors shadow-sm"
                aria-label={isPlaying ? 'Pause slider' : 'Play slider'}
                title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-zinc-600" /> : <Play className="w-4 h-4 text-black" />}
              </button>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-zinc-800 text-xs font-mono font-semibold">
              <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-black" /> 300+ GSM Heavyweight
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-black" /> Premium Materials
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-black" /> Free Shipping Across Pakistan
              </span>
            </div>

          </div>

          {/* Right Column: Featured Product Card */}
          {featuredProductObj && (
            <div className="lg:col-span-4 hidden sm:block">
              <div 
                onClick={() => openProductPage(featuredProductObj)}
                className="bg-white/95 backdrop-blur-xl border border-zinc-200 p-4 rounded-2xl shadow-2xl hover:border-zinc-400 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <img
                      src={featuredProductObj.primaryImage}
                      alt={featuredProductObj.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 bg-black text-white text-[9px] font-mono px-1 py-0.5 rounded">
                      {featuredProductObj.gsm} GSM
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                      FEATURED PIECE
                    </span>
                    <h2 className="text-sm font-bold text-zinc-950 truncate">
                      {featuredProductObj.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-zinc-950">
                        Rs. {featuredProductObj.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <button
                        id="hero-quick-add-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(featuredProductObj, featuredProductObj.sizes[0], undefined);
                        }}
                        className="bg-black text-white hover:bg-zinc-800 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors font-mono cursor-pointer"
                      >
                        + QUICK ADD
                      </button>
                      <span className="text-zinc-600 hover:text-black text-[11px] font-mono underline underline-offset-4">
                        VIEW PAGE →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Slider Progress & Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-zinc-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Numerical Slide Counter & Progress Bars */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-bold tracking-widest text-zinc-950">
              0{currentSlideIndex + 1}
            </span>

            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  id={`hero-slide-dot-${idx}`}
                  onClick={() => goToSlide(idx)}
                  className="group relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{ width: idx === currentSlideIndex ? '60px' : '24px' }}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className="absolute inset-0 bg-zinc-300 group-hover:bg-zinc-400" />
                  {idx === currentSlideIndex && (
                    <div
                      className="absolute inset-y-0 left-0 bg-black rounded-full transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs text-zinc-500 tracking-widest">
              / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Slide Arrow Controls */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
            <button
              id="hero-prev-btn"
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-900 transition-colors shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="hero-next-btn"
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-900 transition-colors shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
