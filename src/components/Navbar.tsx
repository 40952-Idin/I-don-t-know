import { useState } from 'react';
import { Leaf, PlusCircle, User, ShieldCheck, Calendar } from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  session: UserSession;
  onOpenListModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenMyRentals: () => void;
}

export default function Navbar({ session, onOpenListModal, onScrollToSection, onOpenMyRentals }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTierBadgeColor = () => {
    switch (session.tier) {
      case 'elite-scholar':
        return 'bg-amber-100 text-amber-900 border border-amber-300';
      case 'campus-pass':
        return 'bg-emerald-100 text-emerald-900 border border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const getTierLabel = () => {
    switch (session.tier) {
      case 'elite-scholar': return 'Elite Scholar';
      case 'campus-pass': return 'Campus Pass';
      default: return 'Starter';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white shadow-sm/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex cursor-pointer items-center space-x-2.5"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <span className="font-sans text-xl font-bold tracking-tight text-emerald-900">
              Campu<span className="text-emerald-600">Share</span>
            </span>
            <div className="flex items-center space-x-1">
              <span className="font-mono text-[9px] font-semibold text-emerald-600 tracking-wider uppercase">
                Campus Hub
              </span>
              <ShieldCheck className="h-2.5 w-2.5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <button 
            onClick={() => onScrollToSection('how-it-works')} 
            className="hover:text-emerald-600 transition-colors"
            id="nav-btn-how"
          >
            How It Works
          </button>
          <button 
            onClick={() => onScrollToSection('marketplace')} 
            className="hover:text-emerald-600 transition-colors"
            id="nav-btn-catalog"
          >
            Browse Items
          </button>
          <button 
            onClick={() => onScrollToSection('calculator')} 
            className="hover:text-emerald-600 transition-colors"
            id="nav-btn-calc"
          >
            Earnings Calculator
          </button>
          <button 
            onClick={() => onScrollToSection('trust-safety')} 
            className="hover:text-emerald-600 transition-colors"
            id="nav-btn-trust"
          >
            Trust & FAQs
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {session.rentals.length > 0 && (
            <button
              onClick={onOpenMyRentals}
              className="relative flex items-center space-x-1.5 rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              id="nav-btn-rentals"
            >
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              <span>My Bookings</span>
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                {session.rentals.length}
              </span>
            </button>
          )}

          <button
            onClick={onOpenListModal}
            className="flex items-center space-x-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
            id="nav-btn-list"
          >
            <PlusCircle className="h-4 w-4" />
            <span>List an Item</span>
          </button>

          {session.email ? (
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <div className="flex flex-col items-end">
                <span className="max-w-[110px] truncate font-sans text-xs font-medium text-slate-700">
                  {session.email}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${getTierBadgeColor()}`}>
                  {getTierLabel()}
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                <User className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          ) : (
            <button
              onClick={() => onScrollToSection('waitlist')}
              className="flex items-center space-x-1.5 rounded-xl border border-emerald-600/20 bg-emerald-50/50 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
              id="nav-btn-join"
            >
              <User className="h-4 w-4" />
              <span>Join Waitlist</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          {session.rentals.length > 0 && (
            <button
              onClick={onOpenMyRentals}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200"
              id="mobile-nav-rentals"
            >
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                {session.rentals.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 py-4 space-y-3" id="mobile-menu">
          <button 
            onClick={() => { onScrollToSection('how-it-works'); setMobileMenuOpen(false); }} 
            className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            How It Works
          </button>
          <button 
            onClick={() => { onScrollToSection('marketplace'); setMobileMenuOpen(false); }} 
            className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            Browse Items
          </button>
          <button 
            onClick={() => { onScrollToSection('calculator'); setMobileMenuOpen(false); }} 
            className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            Earnings Calculator
          </button>
          <button 
            onClick={() => { onScrollToSection('trust-safety'); setMobileMenuOpen(false); }} 
            className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            Trust & FAQs
          </button>
          
          <div className="border-t border-slate-100 pt-3 flex flex-col space-y-2">
            <button
              onClick={() => { onOpenListModal(); setMobileMenuOpen(false); }}
              className="flex w-full items-center justify-center space-x-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <PlusCircle className="h-4 w-4" />
              <span>List an Item</span>
            </button>
            
            {session.email ? (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="max-w-[160px] truncate text-xs font-semibold text-slate-800">
                      {session.email}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Status: {getTierLabel()}
                    </span>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${getTierBadgeColor()}`}>
                  {session.tier === 'starter' ? 'Free' : 'Subscriber'}
                </span>
              </div>
            ) : (
              <button
                onClick={() => { onScrollToSection('waitlist'); setMobileMenuOpen(false); }}
                className="flex w-full items-center justify-center space-x-1.5 rounded-xl border border-emerald-600/20 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                <User className="h-4 w-4" />
                <span>Join Waitlist</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
