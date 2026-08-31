import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review } from '../types';
import { PRODUCTS } from '../data/products';
import { REVIEWS_DATA } from '../data/reviews';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color?: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;

  // Product Full Page Navigation (Opens Dedicated Full Page)
  selectedProductPage: Product | null;
  openProductPage: (product: Product) => void;
  closeProductPage: () => void;

  // Dedicated Full Checkout Page Navigation
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;

  orderConfirmation: {
    orderId: string;
    items: CartItem[];
    total: number;
    shippingAddress: any;
    date: string;
  } | null;
  setOrderConfirmation: (order: any) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Toast
  toast: { message: string; visible: boolean; type?: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;

  // Global Filter State & Navigation
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Live reviews state
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Free shipping threshold in PKR (Rs. 4,990)
const FREE_SHIPPING_THRESHOLD = 4990;
const STANDARD_SHIPPING = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('monochrome_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('monochrome_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductPage, setSelectedProductPage] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('monochrome_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean; type?: 'success' | 'info' } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);

  useEffect(() => {
    try {
      localStorage.setItem('monochrome_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('monochrome_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('monochrome_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('monochrome_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const openProductPage = (product: Product) => {
    setSelectedProductPage(product);
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductPage = () => {
    setSelectedProductPage(null);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setSelectedProductPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    size: string,
    color?: { name: string; hex: string },
    quantity: number = 1
  ) => {
    const itemUniqueId = `${product.id}-${size}`;
    const itemColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : { name: 'Black', hex: '#18181b' });
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemUniqueId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemUniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemUniqueId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.primaryImage,
          size,
          color: itemColor,
          quantity,
          categoryName: product.categoryName
        };
        return [...prev, newItem];
      }
    });

    // Auto-open side drawer when added as requested by user
    setIsCartOpen(true);
    showToast(`Added ${product.name} (${size}) to bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setDiscountPercent(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to saved wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MONO15' || cleanCode === 'PAK15') {
      setAppliedPromo(cleanCode);
      setDiscountPercent(15);
      showToast('15% Discount applied successfully!', 'success');
      return { success: true, message: '15% VIP Discount Applied' };
    }
    if (cleanCode === 'DROP20') {
      setAppliedPromo(cleanCode);
      setDiscountPercent(20);
      showToast('20% Drop Discount applied!', 'success');
      return { success: true, message: '20% Drop Discount Applied' };
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedPromo(cleanCode);
      setDiscountPercent(0);
      showToast('Free Nationwide Express Delivery Applied!', 'success');
      return { success: true, message: 'Free Shipping Promo Applied' };
    }
    return { success: false, message: 'Invalid code. Try MONO15 or PAK15' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    showToast('Promo code removed', 'info');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  
  const isFreeShipPromo = appliedPromo === 'FREESHIP';
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 || isFreeShipPromo ? 0 : STANDARD_SHIPPING;
  const total = Math.max(0, subtotal - discount + shipping);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuickView = (product: Product) => {
    // Navigate directly to the full product page as requested
    openProductPage(product);
  };
  const closeQuickView = () => setQuickViewProduct(null);

  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const created: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedBuyer: true,
      helpfulCount: 1
    };
    setReviews((prev) => [created, ...prev]);
    showToast('Thank you! Your review has been added.');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        promoCode: appliedPromo || '',
        appliedPromo,
        applyPromo,
        removePromo,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,

        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,

        selectedProductPage,
        openProductPage,
        closeProductPage,

        quickViewProduct,
        openQuickView,
        closeQuickView,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,

        isAuthOpen,
        setIsAuthOpen,
        user,
        setUser,

        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        closeCheckout,
        orderConfirmation,
        setOrderConfirmation,

        wishlist,
        toggleWishlist,
        isWishlisted,

        toast,
        showToast,

        selectedCategory,
        setSelectedCategory,

        reviews,
        addReview
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
