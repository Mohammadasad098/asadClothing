import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { MarqueeBanner } from './components/MarqueeBanner';
import { VideoSection } from './components/VideoSection';
import { CategoriesBanner } from './components/CategoriesBanner';
import { ProductGrid } from './components/ProductGrid';
import { ReviewSection } from './components/ReviewSection';
import { BrandEthos } from './components/BrandEthos';
import { CommunityGallery } from './components/CommunityGallery';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutPage } from './components/CheckoutPage';
import { CheckCircle2, Info } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toast } = useCart();
  if (!toast || !toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
      <div className="flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 text-xs font-mono font-bold">
        {toast.type === 'info' ? (
          <Info className="w-4 h-4 text-zinc-300 shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

const MainLayout: React.FC = () => {
  const { selectedProductPage, closeProductPage, isCheckoutOpen } = useCart();

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] flex flex-col selection:bg-black selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {isCheckoutOpen ? (
          <CheckoutPage />
        ) : selectedProductPage ? (
          <ProductDetailPage
            key={selectedProductPage.id}
            product={selectedProductPage}
            onBack={closeProductPage}
          />
        ) : (
          <>
            {/* 1. First Section: High-Concept Editorial Hero Slider with Slow Cinematic Transitions */}
            <HeroSlider />

            {/* 2. New Dedicated Infinite Marquee Animation Section */}
            <MarqueeBanner />

            {/* 3. Category Bento Showcases: Straight-Leg Baggy Trousers, Drop-Shoulder Tees, Polos */}
            <CategoriesBanner />

            {/* 4. Complete Product Collection with Hover Image Switch, Filters & Sort */}
            <ProductGrid />

            {/* 5. Brand Ethos & Quality Specs */}
            <BrandEthos />

            {/* 6. Interactive Cinematic Lookbook Video Section with Shoppable Hotspots */}
            <VideoSection />

            {/* 7. Dot-Design Styled Review & Rating Section */}
            <ReviewSection />

            {/* 8. Community Fit Gallery (#MONOCHROMESTUDIO) */}
            <CommunityGallery />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays, Modals & Side Drawers */}
      <CartDrawer />
      <ProductModal />
      <SearchModal />
      <AuthModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
