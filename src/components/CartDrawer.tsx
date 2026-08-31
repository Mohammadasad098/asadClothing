import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    appliedPromo,
    applyPromo,
    removePromo,
    openCheckout,
    openProductPage
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    openCheckout();
  };

  const handleProductClick = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      closeCart();
      openProductPage(prod);
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Smooth Fade */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Container (Sliding in smoothly from Right) */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 240,
                mass: 0.85
              }}
              className="w-full sm:w-[420px] bg-white border-l border-zinc-200 text-zinc-900 shadow-2xl flex flex-col justify-between pointer-events-auto h-full"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-black" />
                  <h2 className="font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-zinc-950">
                    YOUR SHOPPING BAG
                  </h2>
                  <span className="bg-black text-white text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                </div>

                <button
                  id="close-cart-drawer-btn"
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-[#f8f8fa] px-4 sm:px-6 py-3 border-b border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-700">
                    <Truck className="w-3.5 h-3.5 text-black" />
                    {amountNeededForFreeShipping === 0 || appliedPromo === 'FREESHIP' ? (
                      <span className="text-black font-bold">You unlocked FREE Nationwide Delivery!</span>
                    ) : (
                      <span>Add <strong className="text-black">Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for Free Delivery</span>
                    )}
                  </span>
                  <span className="text-zinc-500 font-bold">{freeShippingProgress}%</span>
                </div>

                <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-300 rounded-full"
                    style={{ width: appliedPromo === 'FREESHIP' ? '100%' : `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-zinc-950 uppercase tracking-wider">
                        Your bag is currently empty
                      </h3>
                      <p className="text-xs text-zinc-500 max-w-[240px]">
                        Explore our straight trousers, 300 GSM tees, and waffle knits.
                      </p>
                    </div>
                    <button
                      id="empty-cart-shop-now-btn"
                      onClick={() => {
                        closeCart();
                        const elem = document.getElementById('collection-grid');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-black text-white hover:bg-zinc-800 px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-colors shadow-md cursor-pointer"
                    >
                      EXPLORE THE COLLECTION
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      id={`cart-item-${item.id}`}
                      className="flex gap-4 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-all shadow-xs"
                    >
                      <div 
                        onClick={() => handleProductClick(item.productId)}
                        className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 
                              onClick={() => handleProductClick(item.productId)}
                              className="text-xs sm:text-sm font-bold text-zinc-950 leading-tight truncate cursor-pointer hover:text-zinc-600"
                            >
                              {item.name}
                            </h4>
                            <button
                              id={`remove-cart-item-${item.id}`}
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mt-1">
                            <span>Size: <strong className="text-zinc-900 font-bold">{item.size}</strong></span>
                            <span>•</span>
                            <span className="text-zinc-500">{item.categoryName}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-white border border-zinc-200 rounded-lg shadow-xs">
                            <button
                              id={`decrease-qty-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-zinc-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-mono font-bold text-zinc-950">
                              {item.quantity}
                            </span>
                            <button
                              id={`increase-qty-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-zinc-500 hover:text-black transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs sm:text-sm font-bold text-zinc-950">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Controls */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-zinc-200 bg-[#f8f8fa] space-y-3 sm:space-y-4">
                  
                  {/* Promo Code Input */}
                  <div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-zinc-100 border border-zinc-200 px-3 py-2 rounded-xl text-xs font-mono text-zinc-900">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" /> PROMO: <strong>{appliedPromo}</strong>
                        </span>
                        <button
                          onClick={removePromo}
                          className="text-zinc-500 hover:text-red-500 underline text-[11px] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="PROMO CODE (e.g. MONO15)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 bg-white border border-zinc-200 text-zinc-900 text-xs font-mono px-3 py-2 rounded-xl focus:outline-none focus:border-black uppercase shadow-xs"
                        />
                        <button
                          type="submit"
                          id="apply-promo-btn"
                          className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors shadow-xs cursor-pointer"
                        >
                          APPLY
                        </button>
                      </form>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-500 font-mono mt-1">{promoError}</p>
                    )}
                  </div>

                  {/* Price Calculations in PKR */}
                  <div className="space-y-1.5 text-xs font-mono text-zinc-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-zinc-950 font-bold">Rs. {subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Discount ({appliedPromo})</span>
                        <span>-Rs. {discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <strong className="text-zinc-950">FREE</strong> : `Rs. ${shipping}`}</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-zinc-950 border-t border-zinc-200 pt-2">
                      <span>Estimated Total</span>
                      <span className="text-base">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    id="cart-checkout-proceed-btn"
                    onClick={handleProceedToCheckout}
                    className="w-full bg-black text-white hover:bg-zinc-800 py-3.5 rounded-2xl font-bold font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SAFE CASH ON DELIVERY & ONLINE CHECKOUT</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
