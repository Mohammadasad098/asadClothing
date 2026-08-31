import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const { applyPromo, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribed(true);
    showToast('VIP Drop Access confirmed! Code MONO15 ready.', 'success');
  };

  const handleApplyVipCode = () => {
    applyPromo('MONO15');
  };

  return (
    <section className="py-20 bg-[#f8f8fa] text-zinc-900 border-t border-zinc-200 relative overflow-hidden">
      
      {/* Dot Pattern Canvas */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-md relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-zinc-100 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono tracking-widest uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            VIP ARCHIVE MEMBERSHIP
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-zinc-950">
              UNLOCK 15% OFF YOUR FIRST ORDER
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-normal">
              Receive confidential 1-hour early access notifications for limited capsule releases and archival restocks. Zero spam, ever.
            </p>
          </div>

          {isSubscribed ? (
            <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl max-w-md mx-auto space-y-3 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-mono text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>YOU'RE ON THE VIP LIST</span>
              </div>
              <p className="text-xs text-zinc-600">
                Use your private archival discount code at checkout:
              </p>
              <div className="flex items-center justify-between bg-white border border-zinc-200 px-4 py-2.5 rounded-xl font-mono text-sm shadow-xs">
                <span className="font-bold text-zinc-950">MONO15</span>
                <button
                  onClick={handleApplyVipCode}
                  className="bg-black text-white hover:bg-zinc-800 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                >
                  AUTO-APPLY TO CART
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs pl-11 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black font-mono placeholder-zinc-400 shadow-xs"
                />
              </div>

              <button
                type="submit"
                id="newsletter-submit-btn"
                className="bg-black text-white hover:bg-zinc-800 px-6 py-3.5 rounded-2xl font-bold font-mono text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-md"
              >
                <span>JOIN LIST</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-mono text-zinc-500">
            <span>• Immediate 15% code</span>
            <span>• Priority drop access</span>
            <span>• Unsubscribe anytime</span>
          </div>

        </div>
      </div>
    </section>
  );
};
