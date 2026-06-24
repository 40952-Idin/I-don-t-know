import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Leaf, DollarSign, Sparkles } from 'lucide-react';

interface HeroProps {
  onBrowseClick: (searchTerm?: string) => void;
  onListClick: () => void;
}

export default function Hero({ onBrowseClick, onListClick }: HeroProps) {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBrowseClick(searchVal);
  };

  const quickSearches = [
    { label: 'TI-84 Calculator', term: 'Calculator' },
    { label: 'DSLR Camera', term: 'Camera' },
    { label: 'Interviews Suit', term: 'Suit' },
    { label: 'Camping Tent', term: 'Tent' }
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-[#F9FBFA] py-12 sm:py-20 lg:py-24">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-teal-100/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headings & Search */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Student-to-Student Marketplace</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <h1 className="font-sans text-4xl font-bold leading-[1.1] text-slate-900 tracking-tight sm:text-5xl lg:text-6xl">
                Borrow what you need. <span className="text-emerald-600">Share</span> what you don't.
              </h1>
              <p className="max-w-2xl font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
                Save money, reduce waste, and get instant access to textbooks, tech, event wear, and more—rented directly from classmates.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-md focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                <div className="flex items-center pl-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="What do you need for class or this weekend?"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm font-medium text-slate-800 outline-none placeholder-slate-400"
                  id="hero-search-input"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  id="hero-search-submit"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Filter Badges */}
            <div className="space-y-2.5">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Popular Requests on Campus
              </span>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchVal(qs.term);
                      onBrowseClick(qs.term);
                    }}
                    className="rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 transition-all active:scale-95"
                    id={`quick-search-${i}`}
                  >
                    {qs.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Core CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onBrowseClick()}
                className="group flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                id="hero-cta-browse"
              >
                <span>Browse Items</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onListClick}
                className="flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm active:scale-95 transition-all cursor-pointer"
                id="hero-cta-list"
              >
                <span>List an Item</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Mockup Showcase / Eco Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] lg:max-w-none rounded-3xl bg-slate-100 p-2 shadow-2xl shadow-slate-900/10 border border-white">
              
              {/* Product Card Mockup Visual */}
              <div className="overflow-hidden rounded-2xl bg-white border border-slate-100">
                <div className="relative h-64 sm:h-72 w-full bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80"
                    alt="DSLR Camera Student Rental"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-slate-800 border border-slate-100 shadow-sm">
                    ⚡ Instant Booking
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow">
                    $12/day
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      Tech & Media
                    </span>
                    <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs">
                      <span>★</span>
                      <span>4.9</span>
                      <span className="text-slate-400 font-normal">(41 rentals)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-left">
                    <h3 className="font-sans text-lg font-bold text-slate-900">
                      Canon EOS Rebel T7 DSLR Camera
                    </h3>
                    <p className="font-sans text-xs text-slate-500">
                      Owned by Marcus B. • Verified .edu account
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">
                        Library Safe-Zone Pick Up
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Free return cancellation
                    </span>
                  </div>
                </div>

              </div>

              {/* Float Badge 1: Money Earned */}
              <div className="absolute -top-5 -left-5 sm:-left-10 flex items-center space-x-2 rounded-2xl bg-white p-3.5 shadow-lg shadow-slate-900/5 border border-slate-100/80 animate-bounce" style={{ animationDuration: '6s' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wide">Avg. Student Earnings</p>
                  <p className="font-sans text-sm font-bold text-slate-800">$1,200/year</p>
                </div>
              </div>

              {/* Float Badge 2: Green Carbon saved */}
              <div className="absolute -bottom-5 -right-5 sm:-right-8 flex items-center space-x-2 rounded-2xl bg-white p-3.5 shadow-lg shadow-slate-900/5 border border-slate-100/80 animate-bounce" style={{ animationDuration: '8s' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Leaf className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wide">Campus Waste Saved</p>
                  <p className="font-sans text-sm font-bold text-teal-800">4,200 lbs CO2</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges / Quick stats bar */}
      <div className="border-y border-slate-100 bg-slate-50/50 py-8 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 text-center divide-x divide-slate-100">
            <div className="space-y-1">
              <p className="font-sans text-2xl font-extrabold text-slate-900">12,400+</p>
              <p className="font-sans text-xs font-semibold text-slate-500">Successful Swaps</p>
            </div>
            <div className="space-y-1">
              <p className="font-sans text-2xl font-extrabold text-slate-900">$84,000+</p>
              <p className="font-sans text-xs font-semibold text-slate-500">Student Dollars Saved</p>
            </div>
            <div className="space-y-1">
              <p className="font-sans text-2xl font-extrabold text-emerald-600">100%</p>
              <p className="font-sans text-xs font-semibold text-slate-500">Verified .edu Students</p>
            </div>
            <div className="space-y-1">
              <p className="font-sans text-2xl font-extrabold text-slate-900">4.9 ★</p>
              <p className="font-sans text-xs font-semibold text-slate-500">Average Lender Rating</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
