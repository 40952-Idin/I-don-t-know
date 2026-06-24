import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, HelpCircle, X } from 'lucide-react';
import { MembershipTier } from '../types';

interface PricingProps {
  currentTier: MembershipTier;
  onSelectTier: (tier: MembershipTier) => void;
  sessionEmail: string | null;
  onScrollToSection: (id: string) => void;
}

export default function Pricing({ currentTier, onSelectTier, sessionEmail, onScrollToSection }: PricingProps) {
  const [subscribingTier, setSubscribingTier] = useState<MembershipTier | null>(null);
  const [eduEmail, setEduEmail] = useState(sessionEmail || '');
  const [paymentStep, setPaymentStep] = useState(1); // 1: Email verify/confirm, 2: Success

  const tiers = [
    {
      id: 'starter' as MembershipTier,
      name: 'Pay-Per-Use',
      sub: 'The Starter Pack',
      price: '$0',
      period: 'Forever Free',
      bestFor: 'Best for: One-off needs (e.g., renting a calculator for an exam or a toolkit for moving weekend).',
      features: [
        'Standard student email verification',
        '24/7 student ambassador support',
        'Basic peer dispute protection',
        'Standard $1.99 platform fee per swap'
      ],
      cta: 'Current Plan',
      isPopular: false,
      accentColor: 'border-slate-200 hover:border-slate-300 bg-white text-slate-900'
    },
    {
      id: 'campus-pass' as MembershipTier,
      name: 'Campus Pass',
      sub: 'The Semester Subscription',
      price: '$14.99',
      period: 'Per Semester',
      bestFor: 'Best for: Active students who frequently need academic or event resources.',
      features: [
        'All Starter package features',
        '⚡ $0 platform service fees (unlimited rentals)',
        'Priority booking access during finals week',
        'Up to $50 structural damage liability coverage'
      ],
      cta: 'Subscribe for Semester',
      isPopular: true,
      accentColor: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white text-emerald-800'
    },
    {
      id: 'elite-scholar' as MembershipTier,
      name: 'Elite Scholar',
      sub: 'The Year-Round Subscription',
      price: '$29.99',
      period: 'Per Year',
      bestFor: 'Best for: Students looking for maximum savings and premium insurance protection.',
      features: [
        'All Campus Pass package features',
        '⚡ $0 platform service fees (unlimited rentals)',
        'Unlimited FREE 1-day rentals on basic items',
        'Premium insurance coverage for high-value tech',
        'Exclusive premium lender highlight status'
      ],
      cta: 'Subscribe for Year',
      isPopular: false,
      accentColor: 'border-amber-400 hover:border-amber-500 bg-white text-amber-900'
    }
  ];

  const handleStartSubscription = (tierId: MembershipTier) => {
    if (tierId === 'starter') {
      onSelectTier('starter');
      return;
    }
    setSubscribingTier(tierId);
    setPaymentStep(1);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduEmail.toLowerCase().endsWith('.edu')) {
      alert('A valid college .edu email is required to activate premium subscriptions.');
      return;
    }
    
    setPaymentStep(2);
    setTimeout(() => {
      onSelectTier(subscribingTier!);
    }, 1200);
  };

  const handleCloseModal = () => {
    setSubscribingTier(null);
    setPaymentStep(1);
  };

  return (
    <section id="pricing" className="bg-transparent py-20 sm:py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            Flexible Membership Plans
          </div>
          <h3 className="font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-[1.15]">
            Choose Your Campus Savings Tier
          </h3>
          <p className="font-sans text-base text-slate-600 leading-relaxed">
            Whether you need a scientific calculator for a single Calculus exam or want unlimited free textbook swaps all year long, we have a plan for you.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto" id="pricing-grid">
          {tiers.map((t) => {
            const isActive = currentTier === t.id;
            return (
              <div
                key={t.id}
                className={`flex flex-col justify-between rounded-3xl border p-6 text-left relative transition-all duration-300 ${t.accentColor} ${
                  isActive ? 'shadow-lg shadow-emerald-950/5 scale-[1.01]' : 'shadow-sm'
                }`}
                id={`price-card-${t.id}`}
              >
                {/* Popular Overlay */}
                {t.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                    ★ Most Popular Plan ★
                  </span>
                )}

                {/* Card Top */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest">{t.sub}</span>
                    <h4 className="font-sans text-xl font-extrabold">{t.name}</h4>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="font-sans text-4xl font-black">{t.price}</span>
                    <span className="text-xs font-semibold text-slate-500">/{t.period}</span>
                  </div>

                  <p className="font-sans text-xs text-slate-500 leading-relaxed min-h-[48px] border-b border-slate-100 pb-4">
                    {t.bestFor}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3.5 text-xs text-slate-600 pt-2">
                    {t.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Action */}
                <button
                  type="button"
                  onClick={() => handleStartSubscription(t.id)}
                  className={`mt-8 w-full rounded-2xl py-3 text-xs font-bold text-center border transition-all active:scale-[0.98] cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 border-transparent text-slate-400 cursor-default'
                      : t.isPopular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-md'
                        : 'bg-slate-900 hover:bg-emerald-700 text-white border-transparent'
                  }`}
                  id={`price-btn-${t.id}`}
                >
                  {isActive ? 'Your Active Plan ✓' : t.cta}
                </button>

              </div>
            );
          })}
        </div>

        {/* Quick assurance */}
        <p className="text-xs text-slate-400 mt-10 max-w-md mx-auto text-center font-medium">
          💡 Cancel any subscription with 1 click in your dashboard. Unused periods are pro-rated and refunded back to your card.
        </p>

      </div>

      {/* Subscription Checkout Modal Overlay */}
      {subscribingTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-left">
            
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h4 className="font-sans text-lg font-bold text-slate-900">Activate Premium Plan</h4>
                <p className="font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">
                  Secured Student checkout
                </p>
              </div>
              <button onClick={handleCloseModal} className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {paymentStep === 1 ? (
              <form onSubmit={handleConfirmSubscription} className="p-6 space-y-4">
                
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {subscribingTier === 'campus-pass' ? 'Semester Campus Pass' : 'Elite Scholar Annual Pass'}
                    </p>
                    <p className="text-[10px] text-slate-500">Includes all $0 service fee permissions</p>
                  </div>
                  <span className="font-sans text-lg font-black text-slate-900">
                    {subscribingTier === 'campus-pass' ? '$14.99' : '$29.99'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Enter Verified .edu Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., studentName@university.edu"
                    value={eduEmail}
                    onChange={(e) => setEduEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                    id="sub-checkout-email"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mock Card Details (Verification purposes)</label>
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-500 flex items-center justify-between">
                    <span>••••  ••••  ••••  4242</span>
                    <span className="font-mono text-[10px]">12 / 29</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer mt-2"
                  id="sub-confirm-btn"
                >
                  Pay & Activate
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-normal">
                  By clicking activate, you agree to our terms. Funds are processed securely. Your premium membership applies instantly.
                </p>

              </form>
            ) : (
              <div className="p-6 text-center space-y-4 py-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-pulse">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-slate-900">Activating your membership...</h4>
                  <p className="text-xs text-slate-400 mt-1">Configuring zero-fee permissions across listings.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
