import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Lock, CheckCircle2, LogOut, Package, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser, showToast, wishlist } = useCart();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const userName = name.trim() || email.split('@')[0];
    setUser({
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email
    });
    setIsAuthOpen(false);
    showToast(`Welcome back, ${userName}!`);
  };

  const handleDemoLogin = () => {
    setUser({
      name: 'Mohammad Asad',
      email: 'mohammad.asad@monochrome.studio'
    });
    setIsAuthOpen(false);
    showToast('Signed in as VIP Archival Member');
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Click outside to dismiss */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
            onClick={() => setIsAuthOpen(false)} 
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#121214] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10"
          >
            
            {/* Close Button */}
            <button
              id="close-auth-modal-btn"
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {user ? (
              /* User Profile View when Logged In */
              <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-white/20 flex items-center justify-center font-mono text-lg font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> VIP ARCHIVE MEMBER
                </span>
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <p className="text-xs font-mono text-zinc-400">{user.email}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 border border-white/10 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <Package className="w-3.5 h-3.5 text-white" /> Orders
                </div>
                <div className="text-lg font-bold text-white">2 Delivered</div>
              </div>

              <div className="bg-zinc-900 border border-white/10 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <Heart className="w-3.5 h-3.5 text-white" /> Saved Pieces
                </div>
                <div className="text-lg font-bold text-white">{wishlist.length} Items</div>
              </div>
            </div>

            {/* Membership Perks */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 text-xs font-mono text-zinc-300">
              <div className="text-white font-bold text-[11px] uppercase tracking-wider">
                ACTIVE PRIVILEGES
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Priority 1-Hour Early Access on Drop 05</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Complimentary Express Worldwide Shipping</span>
              </div>
            </div>

            <button
              id="auth-logout-btn"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl text-xs font-mono font-bold transition-colors border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>SIGN OUT</span>
            </button>
          </div>
        ) : (
          /* Sign In / Register Form */
          <div className="space-y-6">
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                MONOCHROME ACCOUNT
              </span>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white">
                {isRegister ? 'JOIN THE ARCHIVE' : 'CLIENT SIGN IN'}
              </h3>
              <p className="text-xs text-zinc-400">
                {isRegister
                  ? 'Create an account for early drop notices and tailored sizing profiles.'
                  : 'Sign in to access your orders, saved items, and VIP drop access.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {isRegister && (
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="Mohammad Asad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/15 text-white text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="client@monochrome.studio"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 text-white text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 text-white text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="auth-submit-btn"
                className="w-full bg-white text-black hover:bg-zinc-200 py-3.5 rounded-xl font-bold font-mono text-xs tracking-wider uppercase transition-colors"
              >
                {isRegister ? 'CREATE ARCHIVAL ACCOUNT' : 'SIGN IN TO ACCOUNT'}
              </button>
            </form>

            {/* 1-Click Demo Login */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                id="demo-login-quick-btn"
                onClick={handleDemoLogin}
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white py-2.5 rounded-xl text-xs font-mono transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>1-Click VIP Demo Login</span>
              </button>
            </div>

            {/* Toggle Sign In / Register */}
            <div className="text-center text-xs font-mono text-zinc-400">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="text-white underline underline-offset-4"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  New to Monochrome?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-white underline underline-offset-4"
                  >
                    Create Account
                  </button>
                </span>
              )}
            </div>

          </div>
        )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
