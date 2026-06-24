import React, { useState, useEffect } from 'react';
import { X, Calendar, ShieldCheck, CreditCard, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { Item, Rental, UserSession } from '../types';

interface CheckoutModalProps {
  item: Item | null;
  session: UserSession;
  onClose: () => void;
  onCompleteRental: (rental: Rental) => void;
}

export default function CheckoutModal({ item, session, onClose, onCompleteRental }: CheckoutModalProps) {
  const [days, setDays] = useState(3);
  const [emailInput, setEmailInput] = useState(session.email || '');
  const [eduError, setEduError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('');
  const [newRentalObject, setNewRentalObject] = useState<Rental | null>(null);

  useEffect(() => {
    if (session.email) {
      setEmailInput(session.email);
    }
  }, [session.email]);

  if (!item) return null;

  // Pricing calculations
  const basePrice = item.pricePerDay * days;
  
  // Service fees based on membership tier
  const hasZeroServiceFee = session.tier === 'campus-pass' || session.tier === 'elite-scholar';
  const serviceFee = hasZeroServiceFee ? 0.00 : 1.99;

  // Elite Scholar discount - 1 day free rental for basic items (pricePerDay capped at $4.00)
  const isElite = session.tier === 'elite-scholar';
  const itemDiscount = (isElite && days > 1) ? Math.min(item.pricePerDay, 4.00) : 0.00;

  const totalCost = basePrice + serviceFee - itemDiscount;
  const deposit = item.deposit;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify .edu email format
    if (!emailInput.toLowerCase().endsWith('.edu')) {
      setEduError('Please enter a valid .edu college email address.');
      return;
    }

    setEduError('');

    // Generate random locker PIN or pickup pin
    const pinCode = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedPin(pinCode);

    // Date formatting
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + days);

    const formattedToday = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedReturn = returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newRental: Rental = {
      id: `rent-${Math.floor(1000 + Math.random() * 9000)}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.imageUrl,
      startDate: formattedToday,
      endDate: formattedReturn,
      totalPrice: totalCost.toFixed(2),
      status: 'active',
      ownerName: item.owner.name,
      pickupLocation: item.location
    };

    setNewRentalObject(newRental);
    setBookingSuccess(true);
  };

  const handleConfirmFinish = () => {
    if (newRentalObject) {
      onCompleteRental(newRentalObject);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100/80 animate-in fade-in zoom-in-95 duration-200"
        id="checkout-modal-container"
      >
        
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="text-left">
            <h3 className="font-sans text-xl font-extrabold text-slate-900">
              {bookingSuccess ? 'Booking Authorized!' : 'Reserve on Campus'}
            </h3>
            <p className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">
              {bookingSuccess ? 'Pickup Code Issued' : 'Instant Security Hold'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
            id="checkout-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Screen */}
        {bookingSuccess ? (
          <div className="p-6 space-y-6 text-center">
            
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-sans text-lg font-bold text-slate-900">Your reservation is confirmed!</h4>
              <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                Lender has been notified. Meet at the designated swap location below or retrieve it using your locker PIN.
              </p>
            </div>

            {/* Pickup Details Card */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-4 text-left">
              
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 font-mono">CAMPUS TRANSACTION LOG</span>
                </div>
                <span className="text-xs font-bold text-slate-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                  Paid: ${totalCost.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2.5">
                  <span className="text-emerald-600 mt-0.5">📦</span>
                  <div>
                    <p className="text-[11px] text-slate-400">Reserved Resource</p>
                    <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-slate-400">Designated Pick-up Zone</p>
                    <p className="text-xs font-bold text-slate-800">{item.location}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Meet lender or collect from Hub Locker</p>
                  </div>
                </div>

                {/* Pin Code display */}
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 text-center mt-2">
                  <p className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                    Locker Box / Pickup Authorization PIN
                  </p>
                  <p className="font-mono text-3xl font-black tracking-widest text-emerald-400 mt-1">
                    {generatedPin.split('').join(' ')}
                  </p>
                </div>
              </div>

            </div>

            {/* Done button */}
            <button
              onClick={handleConfirmFinish}
              className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer"
              id="checkout-confirm-finish"
            >
              Add to My Schedule & Finish
            </button>

          </div>
        ) : (
          /* Checkout booking form */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
            
            {/* Product summary block */}
            <div className="flex items-center space-x-4 bg-slate-50 border border-slate-100 p-3 rounded-2xl">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-16 w-16 rounded-xl object-cover border border-slate-100"
              />
              <div className="text-left flex-1 min-w-0">
                <span className="text-[9px] font-bold text-emerald-600 font-mono uppercase tracking-wider">
                  {item.category.toUpperCase()} RENTAL
                </span>
                <h4 className="font-sans text-xs font-bold text-slate-800 truncate">
                  {item.title}
                </h4>
                <p className="font-sans text-[11px] text-slate-500">
                  Lender: {item.owner.name} • ★ {item.owner.rating}
                </p>
              </div>
            </div>

            {/* Days Selector */}
            <div className="space-y-2.5 text-left">
              <label className="font-sans text-xs font-bold text-slate-700">
                How many days do you need this?
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                  id="checkout-day-dec"
                >
                  -
                </button>
                <div className="flex-1 rounded-xl border border-slate-200 h-10 flex items-center justify-center font-bold text-slate-800 text-sm">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </div>
                <button
                  type="button"
                  onClick={() => setDays(Math.min(30, days + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                  id="checkout-day-inc"
                >
                  +
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                Max rental limit is 30 days for peer-to-peer items.
              </p>
            </div>

            {/* Student edu Verification input */}
            <div className="space-y-2.5 text-left">
              <div className="flex items-center justify-between">
                <label className="font-sans text-xs font-bold text-slate-700">
                  Student Verification Email
                </label>
                <span className="text-[10px] font-bold text-emerald-600 font-mono">
                  REQUIRED .EDU
                </span>
              </div>
              <input
                type="email"
                placeholder="enterYourName@university.edu"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={!!session.email}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
                id="checkout-email-input"
              />
              {eduError && (
                <p className="text-[11px] text-red-600 font-semibold">{eduError}</p>
              )}
              {!session.email && (
                <p className="text-[10px] text-slate-400 leading-normal">
                  💡 Using your .edu email here will automatically register you on our waitlist with Starter access.
                </p>
              )}
            </div>

            {/* Membership discount active callout */}
            {hasZeroServiceFee && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100/60 p-3.5 text-left text-xs text-emerald-900 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Active Campus Pass / Elite Member Perks</p>
                  <p className="text-[10px] text-emerald-700 mt-0.5 leading-normal">
                    ✓ Your service fee ($1.99) is fully waived.<br />
                    {isElite && days > 1 && `✓ One-day free rental discount applied (-$${Math.min(item.pricePerDay, 4.00).toFixed(2)})!`}
                  </p>
                </div>
              </div>
            )}

            {/* Receipts Details Section */}
            <div className="space-y-2 border-t border-slate-100 pt-4 text-left text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Daily rate (${item.pricePerDay.toFixed(2)} × {days} days)</span>
                <span className="font-medium text-slate-800">${basePrice.toFixed(2)}</span>
              </div>
              
              {itemDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-medium">
                  <span>Elite Scholar Free Day Reward</span>
                  <span>-${itemDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600">
                <span>Platform Service Fee</span>
                {serviceFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">Waived</span>
                ) : (
                  <span className="font-medium text-slate-800">${serviceFee.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-slate-600 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-1">
                  <span>Fully Refundable Security Hold</span>
                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-400" title="Returned immediately after handback">Deposit</span>
                </div>
                <span className="font-medium text-slate-800">${deposit.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-sans text-sm font-bold text-slate-800">Total authorized today</span>
                <div className="text-right">
                  <span className="font-sans text-base font-extrabold text-slate-900">${totalCost.toFixed(2)}</span>
                  <p className="text-[9px] text-slate-400">Card will be pre-authorized</p>
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-all active:scale-[0.98] cursor-pointer"
                id="checkout-form-submit"
              >
                <CreditCard className="h-4 w-4" />
                <span>Confirm & Authorize Deposit</span>
              </button>
              
              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Encrypted 256-bit Student Escrow Protection</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
