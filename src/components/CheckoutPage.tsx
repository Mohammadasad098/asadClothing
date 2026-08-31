import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Receipt,
  HelpCircle,
  Tag,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    freeShippingThreshold,
    clearCart,
    user,
    closeCheckout,
    openProductPage
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Shipping Form State
  const [firstName, setFirstName] = useState(user ? user.name.split(' ')[0] : 'Hamza');
  const [lastName, setLastName] = useState(user ? user.name.split(' ')[1] || 'Malik' : 'Malik');
  const [email, setEmail] = useState(user ? user.email : 'hamza.malik@example.com');
  const [phone, setPhone] = useState('0300 1234567');
  const [address, setAddress] = useState('House 14-B, Street 5, Phase 6 DHA');
  const [apartment, setApartment] = useState('Floor 2, Apt 4');
  const [city, setCity] = useState('Lahore');
  const [postalCode, setPostalCode] = useState('54000');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [saveInfo, setSaveInfo] = useState(true);

  // Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet' | 'ibft'>('cod');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardName, setCardName] = useState('HAMZA MALIK');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('420');
  const [walletPhone, setWalletPhone] = useState('0300 1234567');
  const [walletProvider, setWalletProvider] = useState<'jazzcash' | 'easypaisa' | 'nayapay'>('jazzcash');

  // Promo Code in Checkout
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Confirmed Order State
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [confirmedDate, setConfirmedDate] = useState<string>('');
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  const [finalPayable, setFinalPayable] = useState<number>(total);

  // Mobile Order Summary Accordion
  const [isOrderSummaryOpenMobile, setIsOrderSummaryOpenMobile] = useState(false);

  const deliveryCost = deliveryMethod === 'express' ? 450 : shipping;
  const currentTotal = subtotal - discount + deliveryCost;

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

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !address || !city) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `MONO-PK-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setConfirmedDate(new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }));
    setOrderedItems([...cart]);
    setFinalPayable(currentTotal);
    setStep('confirmation');
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If cart is empty and user is not on confirmation step
  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-zinc-950 mb-2">
          YOUR SHOPPING BAG IS EMPTY
        </h2>
        <p className="text-sm font-mono text-zinc-500 max-w-md mb-8">
          Add trousers, drop-shoulder tees, or knitwear to proceed with your express checkout.
        </p>
        <button
          id="checkout-empty-return-btn"
          onClick={closeCheckout}
          className="bg-black text-white hover:bg-zinc-800 px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO STORE</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-20">
      
      {/* Checkout Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <button
            id="checkout-back-to-shop-btn"
            onClick={closeCheckout}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">RETURN TO SHOP</span>
            <span className="sm:hidden">SHOP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-black uppercase">
              MONOCHROME.
            </span>
            <span className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded border border-zinc-200 hidden md:inline">
              CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">256-BIT ENCRYPTED</span>
          </div>

        </div>
      </header>

      {/* Main Checkout View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Step Indicator Progress Bar */}
        {step !== 'confirmation' && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto mb-2 text-xs font-mono">
              <div className={`flex items-center gap-2 font-bold ${step === 'details' ? 'text-black' : 'text-zinc-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'details' ? 'bg-black text-white' : 'bg-zinc-200 text-zinc-700'}`}>1</span>
                <span>SHIPPING DETAILS</span>
              </div>
              <div className="h-[1px] w-12 sm:w-20 bg-zinc-300" />
              <div className={`flex items-center gap-2 font-bold ${step === 'payment' ? 'text-black' : 'text-zinc-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-black text-white' : 'bg-zinc-200 text-zinc-700'}`}>2</span>
                <span>PAYMENT METHOD</span>
              </div>
              <div className="h-[1px] w-12 sm:w-20 bg-zinc-300" />
              <div className="flex items-center gap-2 text-zinc-400 font-bold">
                <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-xs">3</span>
                <span className="hidden sm:inline">ORDER PLACED</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Accordion Toggle for Order Summary */}
        {step !== 'confirmation' && (
          <div className="lg:hidden mb-6 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => setIsOrderSummaryOpenMobile(!isOrderSummaryOpenMobile)}
              className="w-full p-4 flex items-center justify-between text-xs font-mono font-bold bg-zinc-50 border-b border-zinc-200"
            >
              <span className="flex items-center gap-2 text-zinc-900">
                <ShoppingBag className="w-4 h-4" />
                <span>{isOrderSummaryOpenMobile ? 'HIDE' : 'SHOW'} ORDER SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)} ITEMS)</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-950">Rs. {currentTotal.toLocaleString()}</span>
                {isOrderSummaryOpenMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {isOrderSummaryOpenMobile && (
              <div className="p-4 space-y-4 bg-zinc-50/50">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs font-mono">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-lg border border-zinc-200" />
                    <div className="flex-1">
                      <div className="font-bold text-zinc-950">{item.name}</div>
                      <div className="text-zinc-500">Size: {item.size} • Qty: {item.quantity}</div>
                      <div className="font-bold mt-1 text-black">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Main Form Area */}
          <div className={`space-y-8 ${step === 'confirmation' ? 'lg:col-span-12' : 'lg:col-span-7'}`}>
            
            {/* STEP 1: Shipping Details Form */}
            {step === 'details' && (
              <form onSubmit={handleProceedToPayment} className="space-y-8">
                
                {/* 1. Contact Information */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div>
                      <h2 className="text-base font-bold uppercase tracking-wider text-zinc-950">
                        1. CONTACT INFORMATION
                      </h2>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
                        We will send SMS tracking updates and your digital invoice.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="youremail@example.com"
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        PHONE NUMBER (FOR RIDER SMS) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0300 1234567"
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Destination Address */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div>
                      <h2 className="text-base font-bold uppercase tracking-wider text-zinc-950">
                        2. DELIVERY DESTINATION (PAKISTAN)
                      </h2>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
                        Direct doorstep delivery across all cities & regions in Pakistan.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Hamza"
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Malik"
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                      COMPLETE STREET ADDRESS & HOUSE / PLOT NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House 14-B, Street 5, Phase 6 DHA"
                      className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        APARTMENT / SUITE
                      </label>
                      <input
                        type="text"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="Floor 2, Apt 4"
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        CITY *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      >
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Abbottabad">Abbottabad</option>
                        <option value="Bahawalpur">Bahawalpur</option>
                        <option value="Sargodha">Sargodha</option>
                        <option value="Sukkur">Sukkur</option>
                        <option value="Other City">Other City (All Pakistan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                        POSTAL CODE
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="54000"
                        className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1.5 uppercase">
                      DELIVERY INSTRUCTIONS / LANDMARK (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Near commercial market, ring bell twice"
                      className="w-full bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs p-3.5 rounded-xl focus:outline-none focus:border-black font-mono transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="save-info-checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-4 h-4 rounded text-black border-zinc-300 focus:ring-black"
                    />
                    <label htmlFor="save-info-checkbox" className="text-xs font-mono text-zinc-600 cursor-pointer">
                      Save this delivery information for faster checkout next time
                    </label>
                  </div>
                </div>

                {/* 3. Delivery Method Selection */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-100 pb-3">
                    3. SELECT SHIPPING METHOD
                  </h2>

                  <div className="space-y-3">
                    <label
                      onClick={() => setDeliveryMethod('standard')}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliveryMethod === 'standard'
                          ? 'border-black bg-zinc-50 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery-method"
                          checked={deliveryMethod === 'standard'}
                          onChange={() => setDeliveryMethod('standard')}
                          className="w-4 h-4 text-black focus:ring-black"
                        />
                        <div>
                          <div className="text-xs font-mono font-bold text-zinc-950">
                            STANDARD NATIONWIDE COURIER (TRAX / TCS / LEOPARDS)
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500">
                            Estimated delivery: 2 - 4 business days
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-xs font-bold text-zinc-950">
                        {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `Rs. ${shipping}`}
                      </div>
                    </label>

                    <label
                      onClick={() => setDeliveryMethod('express')}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliveryMethod === 'express'
                          ? 'border-black bg-zinc-50 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery-method"
                          checked={deliveryMethod === 'express'}
                          onChange={() => setDeliveryMethod('express')}
                          className="w-4 h-4 text-black focus:ring-black"
                        />
                        <div>
                          <div className="text-xs font-mono font-bold text-zinc-950">
                            PRIORITY VIP AIR DISPATCH (MAJOR CITIES)
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500">
                            Next-day dispatch for Karachi, Lahore & Islamabad
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-xs font-bold text-zinc-950">
                        Rs. 450
                      </div>
                    </label>
                  </div>
                </div>

                {/* Continue to Payment Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="checkout-proceed-payment-step-btn"
                    className="w-full bg-black text-white hover:bg-zinc-800 py-4 rounded-2xl font-bold font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 shadow-xl active:scale-95 cursor-pointer"
                  >
                    <span>CONTINUE TO PAYMENT METHOD</span>
                    <span className="opacity-70">•</span>
                    <span>Rs. {currentTotal.toLocaleString()}</span>
                  </button>
                </div>

              </form>
            )}

            {/* STEP 2: Payment Method Options */}
            {step === 'payment' && (
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                
                {/* Review Address Bar */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xs flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">SHIP TO:</span>
                    <span className="font-bold text-zinc-950">{firstName} {lastName}</span>
                    <span className="text-zinc-600 block">{address}, {city} ({phone})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-black font-bold underline hover:text-zinc-600 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Payment Selection Box */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  
                  <div className="border-b border-zinc-100 pb-4">
                    <h2 className="text-base font-bold uppercase tracking-wider text-zinc-950">
                      CHOOSE PAYMENT METHOD
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      All transactions are secure and encrypted.
                    </p>
                  </div>

                  {/* Payment Tabs / Radio Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* COD */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === 'cod'
                          ? 'border-black bg-zinc-50 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-choice"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 w-4 h-4 text-black focus:ring-black"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono font-bold text-zinc-950 flex items-center gap-1.5">
                          <Truck className="w-4 h-4" />
                          <span>Cash on Delivery (COD)</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500">
                          Pay cash to the rider at delivery in {city}.
                        </p>
                      </div>
                    </div>

                    {/* Debit / Credit Card */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === 'card'
                          ? 'border-black bg-zinc-50 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-choice"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="mt-1 w-4 h-4 text-black focus:ring-black"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono font-bold text-zinc-950 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4" />
                          <span>Debit / Credit Card</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500">
                          Visa, MasterCard, UnionPay, PayPak.
                        </p>
                      </div>
                    </div>

                    {/* Mobile Wallet */}
                    <div
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === 'wallet'
                          ? 'border-black bg-zinc-50 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-choice"
                        checked={paymentMethod === 'wallet'}
                        onChange={() => setPaymentMethod('wallet')}
                        className="mt-1 w-4 h-4 text-black focus:ring-black"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono font-bold text-zinc-950 flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4" />
                          <span>JazzCash / EasyPaisa / NayaPay</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500">
                          Instant mobile transfer & Raast ID.
                        </p>
                      </div>
                    </div>

                    {/* Online Bank Transfer */}
                    <div
                      onClick={() => setPaymentMethod('ibft')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === 'ibft'
                          ? 'border-black bg-zinc-50 shadow-xs'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-choice"
                        checked={paymentMethod === 'ibft'}
                        onChange={() => setPaymentMethod('ibft')}
                        className="mt-1 w-4 h-4 text-black focus:ring-black"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono font-bold text-zinc-950 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          <span>Direct Bank Transfer (IBFT)</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500">
                          Meezan, HBL, Bank Alfalah, SCB.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* COD Sub-details */}
                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2 text-xs font-mono text-zinc-700">
                      <div className="flex items-center gap-2 font-bold text-zinc-950">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>Cash on Delivery Confirmed</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Please keep the exact amount of <strong>Rs. {currentTotal.toLocaleString()}</strong> ready in cash for the courier rider upon delivery to <strong>{address}, {city}</strong>.
                      </p>
                    </div>
                  )}

                  {/* Card Form Sub-details */}
                  {paymentMethod === 'card' && (
                    <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1 uppercase">
                          CARD NUMBER
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 0000 0000 0000"
                          className="w-full bg-white border border-zinc-300 text-zinc-950 text-xs p-3 rounded-xl focus:outline-none focus:border-black font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1 uppercase">
                            EXPIRATION (MM/YY)
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full bg-white border border-zinc-300 text-zinc-950 text-xs p-3 rounded-xl focus:outline-none focus:border-black font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1 uppercase">
                            SECURITY CODE (CVC)
                          </label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            className="w-full bg-white border border-zinc-300 text-zinc-950 text-xs p-3 rounded-xl focus:outline-none focus:border-black font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1 uppercase">
                          NAME ON CARD
                        </label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="CARDHOLDER FULL NAME"
                          className="w-full bg-white border border-zinc-300 text-zinc-950 text-xs p-3 rounded-xl focus:outline-none focus:border-black font-mono uppercase"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mobile Wallet Form Sub-details */}
                  {paymentMethod === 'wallet' && (
                    <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-4 text-xs font-mono">
                      <div className="flex gap-2">
                        {(['jazzcash', 'easypaisa', 'nayapay'] as const).map((prov) => (
                          <button
                            type="button"
                            key={prov}
                            onClick={() => setWalletProvider(prov)}
                            className={`flex-1 py-2 px-3 rounded-xl border font-bold capitalize text-xs transition-colors cursor-pointer ${
                              walletProvider === prov ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200'
                            }`}
                          >
                            {prov}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-zinc-700 mb-1 uppercase">
                          REGISTERED MOBILE WALLET NUMBER
                        </label>
                        <input
                          type="tel"
                          required
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          placeholder="0300 1234567"
                          className="w-full bg-white border border-zinc-300 text-zinc-950 text-xs p-3 rounded-xl focus:outline-none focus:border-black font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-zinc-500">
                        An instant approve notification prompt will appear on your smartphone to verify payment of Rs. {currentTotal.toLocaleString()}.
                      </p>
                    </div>
                  )}

                  {/* IBFT Sub-details */}
                  {paymentMethod === 'ibft' && (
                    <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3 text-xs font-mono text-zinc-800">
                      <div className="font-bold text-black uppercase">OFFICIAL MONOCHROME STUDIO ACCOUNT:</div>
                      <div className="p-3 bg-white border border-zinc-200 rounded-xl space-y-1">
                        <div><strong>Bank:</strong> Meezan Bank Ltd (DHA Lahore Branch)</div>
                        <div><strong>Title:</strong> MONOCHROME STUDIO APPAREL PVT LTD</div>
                        <div><strong>Account / IBAN:</strong> PK89 MEZN 0012 3456 7890 0101</div>
                      </div>
                      <p className="text-[11px] text-zinc-500">
                        Please transfer the total amount and share the transaction screenshot on our WhatsApp support (+92 300 0000000).
                      </p>
                    </div>
                  )}

                </div>

                {/* Back to Address & Final Confirm Order Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-black font-bold cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK TO SHIPPING DETAILS</span>
                  </button>

                  <button
                    type="submit"
                    id="checkout-final-place-order-btn"
                    className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 px-10 py-4 rounded-2xl font-bold font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 shadow-xl active:scale-95 cursor-pointer"
                  >
                    <span>PLACE & CONFIRM ORDER</span>
                    <span className="opacity-70">•</span>
                    <span>Rs. {currentTotal.toLocaleString()}</span>
                  </button>
                </div>

              </form>
            )}

            {/* STEP 3: Order Confirmation Full Page State */}
            {step === 'confirmation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-md text-center max-w-2xl mx-auto space-y-8"
              >
                
                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-emerald-600 uppercase tracking-widest font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ORDER PLACED & DISPATCH QUEUED
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-zinc-950 pt-2">
                    SHUKRIYA! YOUR ORDER IS CONFIRMED
                  </h1>
                  <p className="text-xs font-mono text-zinc-500">
                    Order Reference ID: <strong className="text-zinc-950 font-bold text-sm">{confirmedOrderId}</strong>
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl text-left space-y-4 text-xs font-mono">
                  
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                    <span className="flex items-center gap-2 text-zinc-950 font-bold text-sm">
                      <Receipt className="w-4 h-4" /> MONOCHROME DIGITAL INVOICE
                    </span>
                    <span className="text-zinc-500">{confirmedDate}</span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {orderedItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-zinc-700">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded-lg border border-zinc-200" />
                          <div>
                            <span className="font-bold text-zinc-950 block">{item.name}</span>
                            <span className="text-zinc-500 text-[11px]">Size: {item.size} • Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-zinc-950">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown in Receipt */}
                  <div className="border-t border-zinc-200 pt-3 space-y-1 text-zinc-600">
                    <div className="flex justify-between">
                      <span>Delivery Method</span>
                      <span>{deliveryMethod === 'express' ? 'VIP Priority Air (Rs. 450)' : 'Standard Nationwide (FREE)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Chosen</span>
                      <span className="uppercase font-bold text-zinc-900">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-zinc-950 pt-2 border-t border-zinc-200">
                      <span>Total Amount Paid / Payable</span>
                      <span>Rs. {finalPayable.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Delivery Location Note */}
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200 text-[11px] text-zinc-600 space-y-1">
                    <div className="text-zinc-900 font-bold">Delivery Address:</div>
                    <div>{firstName} {lastName} ({phone})</div>
                    <div>{address}, {apartment ? `${apartment}, ` : ''}{city}</div>
                    <div className="text-emerald-600 font-bold pt-1">
                      Estimated Dispatch: Next 24 Hours • SMS Tracking will follow
                    </div>
                  </div>

                </div>

                {/* Return to Shop CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="checkout-confirmation-continue-btn"
                    onClick={closeCheckout}
                    className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 px-8 py-4 rounded-full font-bold font-mono text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
                  >
                    CONTINUE EXPLORING MONOCHROME
                  </button>
                </div>

              </motion.div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Promo Sidebar */}
          {step !== 'confirmation' && (
            <div className="hidden lg:block lg:col-span-5 sticky top-24 space-y-6">
              
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-zinc-950">
                    BAG SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)} ITEMS)
                  </h3>
                  <button
                    onClick={closeCheckout}
                    className="text-xs font-mono text-zinc-500 hover:text-black underline cursor-pointer"
                  >
                    Edit Bag
                  </button>
                </div>

                {/* Product Scroll List */}
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-zinc-950 truncate">{item.name}</h4>
                        <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                          <span>Size: <strong className="text-zinc-900">{item.size}</strong></span>
                          <span className="mx-1.5">•</span>
                          <span>{item.categoryName}</span>
                        </div>
                        <div className="font-mono text-xs font-bold text-zinc-950 mt-1">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="border-t border-zinc-100 pt-4">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl text-xs font-mono text-emerald-800">
                      <span className="flex items-center gap-2 font-bold">
                        <Tag className="w-3.5 h-3.5" /> PROMO: {appliedPromo}
                      </span>
                      <button
                        onClick={removePromo}
                        className="text-emerald-700 hover:text-red-600 underline text-[11px] font-bold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="DISCOUNT CODE (e.g. MONO15)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 bg-zinc-50 border border-zinc-300 text-zinc-950 text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-black uppercase transition-colors"
                        />
                        <button
                          type="submit"
                          id="checkout-apply-promo-btn"
                          className="bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          APPLY
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-red-500 font-mono mt-1">{promoError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-zinc-100 pt-4 space-y-2 text-xs font-mono text-zinc-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-950 font-bold">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Nationwide Shipping</span>
                    <span>
                      {deliveryCost === 0 ? (
                        <strong className="text-emerald-600 font-bold">FREE</strong>
                      ) : (
                        `Rs. ${deliveryCost}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-zinc-950 border-t border-zinc-200 pt-3">
                    <span className="uppercase">TOTAL PAYABLE</span>
                    <span className="text-base">Rs. {currentTotal.toLocaleString()}</span>
                  </div>
                </div>

              </div>

              {/* Trust Features Strip */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-xs space-y-3 text-xs font-mono text-zinc-600">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                  <span>300 GSM Heavyweight Archival Combed Cotton</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-black shrink-0" />
                  <span>Fast Nationwide Dispatch Across Pakistan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-black shrink-0" />
                  <span>WhatsApp Concierge & Helpline: +92 300 0000000</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
