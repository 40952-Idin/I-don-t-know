import { useState, useEffect } from 'react';
import { INITIAL_ITEMS } from './data';
import { Item, Rental, UserSession, MembershipTier } from './types';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Marketplace from './components/Marketplace';
import CheckoutModal from './components/CheckoutModal';
import ListWizard from './components/ListWizard';
import Calculator from './components/Calculator';
import TrustSafety from './components/TrustSafety';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

// Icons
import { Calendar, ShieldCheck, Check, Sparkles, X, Heart, MessageSquare } from 'lucide-react';

export default function App() {
  // Catalog items state (seeded from INITIAL_ITEMS + loaded from localStorage)
  const [items, setItems] = useState<Item[]>([]);
  
  // User Session (waitlisted email, active tier, bookings)
  const [session, setSession] = useState<UserSession>({
    email: null,
    tier: 'starter',
    listedItems: [],
    rentals: []
  });

  // UI state managers
  const [selectedItemForRent, setSelectedItemForRent] = useState<Item | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [myRentalsOpen, setMyRentalsOpen] = useState(false);
  
  // Notification Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'premium' } | null>(null);

  // Initialize data and load from localStorage
  useEffect(() => {
    // 1. Load listings
    const savedItems = localStorage.getItem('campushare_items');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        setItems(INITIAL_ITEMS);
      }
    } else {
      setItems(INITIAL_ITEMS);
    }

    // 2. Load User Session
    const savedSession = localStorage.getItem('campushare_session');
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch (e) {
        // use default
      }
    }
  }, []);

  // Save items state to localStorage when updated
  const saveItemsToLocal = (newItems: Item[]) => {
    setItems(newItems);
    localStorage.setItem('campushare_items', JSON.stringify(newItems));
  };

  // Save session to localStorage when updated
  const saveSessionToLocal = (newSession: UserSession) => {
    setSession(newSession);
    localStorage.setItem('campushare_session', JSON.stringify(newSession));
  };

  // Trigger temporary notification toast
  const showToast = (message: string, type: 'success' | 'info' | 'premium' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // --- ACTIONS ---

  // Scroll smoothly to a section ID
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-search and scroll down to marketplace
  const handleBrowseItems = (searchWord?: string) => {
    if (searchWord !== undefined) {
      setSearchTerm(searchWord);
    }
    handleScrollToSection('marketplace');
  };

  // Register .edu email on waitlist
  const handleJoinWaitlist = (email: string) => {
    const updatedSession: UserSession = {
      ...session,
      email: email,
      tier: session.tier === 'starter' ? 'starter' : session.tier
    };
    saveSessionToLocal(updatedSession);
    showToast(`Welcome! Registered ${email} on the priority waitlist.`, 'success');
  };

  // Choose / Upgrade Membership Tier
  const handleSelectTier = (tier: MembershipTier) => {
    let email = session.email;
    if (!email) {
      // Assign default demo email if none entered
      email = 'demo.student@university.edu';
    }

    const updatedSession: UserSession = {
      ...session,
      email: email,
      tier: tier
    };
    saveSessionToLocal(updatedSession);

    const tierLabel = tier === 'campus-pass' ? 'Campus Pass' : tier === 'elite-scholar' ? 'Elite Scholar' : 'Starter';
    showToast(`Upgrade Complete! Your profile is now active on the ${tierLabel} plan.`, 'premium');
  };

  // Publish a new Peer Listing
  const handleAddListing = (newItem: Item) => {
    // 1. Add to main items list
    const updatedItems = [newItem, ...items];
    saveItemsToLocal(updatedItems);

    // 2. Add to user session listed items
    const updatedSession: UserSession = {
      ...session,
      email: newItem.owner.eduEmail,
      listedItems: [newItem, ...session.listedItems]
    };
    saveSessionToLocal(updatedSession);
    setIsListModalOpen(false);
    showToast(`Published! "${newItem.title}" is now active in the campus catalog.`, 'success');
  };

  // Finish booking and lock transaction
  const handleCompleteRental = (newRental: Rental) => {
    // 1. Add to user session active rentals
    const updatedSession: UserSession = {
      ...session,
      email: session.email || newRental.ownerName.toLowerCase().replace(' ', '.') + '@university.edu',
      rentals: [newRental, ...session.rentals]
    };
    saveSessionToLocal(updatedSession);

    // 2. Mark item as temporarily rented out (unavailable) in main list
    const updatedItems = items.map(itm => {
      if (itm.id === newRental.itemId) {
        return { ...itm, isAvailable: false, rentalsCount: itm.rentalsCount + 1 };
      }
      return itm;
    });
    saveItemsToLocal(updatedItems);

    setSelectedItemForRent(null);
    setMyRentalsOpen(true); // Open schedule automatically to show receipt
    showToast(`Rental authorized! Escrow deposit held securely.`, 'success');
  };

  // Cancel/complete booking return and release holds
  const handleReturnItem = (rentalId: string, itemId: string) => {
    // 1. Set rental status to completed
    const updatedRentals = session.rentals.map(rent => {
      if (rent.id === rentalId) {
        return { ...rent, status: 'completed' as const };
      }
      return rent;
    });
    
    const updatedSession: UserSession = {
      ...session,
      rentals: updatedRentals
    };
    saveSessionToLocal(updatedSession);

    // 2. Mark item as available again
    const updatedItems = items.map(itm => {
      if (itm.id === itemId) {
        return { ...itm, isAvailable: true };
      }
      return itm;
    });
    saveItemsToLocal(updatedItems);

    showToast('Item returned! Escrow security deposit has been fully released.', 'success');
  };

  const getTierBannerDetails = () => {
    if (session.tier === 'campus-pass') {
      return { label: 'Campus Pass active', desc: 'Enjoying unlimited $0 platform service fees this semester.' };
    }
    if (session.tier === 'elite-scholar') {
      return { label: 'Elite Scholar active', desc: 'Unlimited $0 service fees, 1-day free rental discounts, and high-value tech protection.' };
    }
    return null;
  };

  const premiumBanner = getTierBannerDetails();

  return (
    <div className="min-h-screen bg-[#F9FBFA] font-sans antialiased text-slate-800">
      
      {/* 1. Global Premium Membership Notification Banner */}
      {premiumBanner && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs px-4 py-2.5 text-center flex items-center justify-center space-x-2 shadow-sm font-semibold relative animate-fade-in" id="premium-notif-banner">
          <Sparkles className="h-4 w-4 text-emerald-200 shrink-0" />
          <span>
            <strong>{premiumBanner.label}</strong>: {premiumBanner.desc}
          </span>
          <button 
            onClick={() => {
              const updatedSession = { ...session, tier: 'starter' as const };
              saveSessionToLocal(updatedSession);
              showToast('Subscription downgraded to standard.', 'info');
            }}
            className="underline hover:text-emerald-100 text-[10px] pl-3 border-l border-white/20 ml-2"
            title="Downgrade to Starter package"
          >
            Downgrade Plan
          </button>
        </div>
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        session={session}
        onOpenListModal={() => setIsListModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenMyRentals={() => setMyRentalsOpen(true)}
      />

      {/* 3. Main Sections */}
      <main>
        
        {/* Hero Banner Section */}
        <Hero
          onBrowseClick={handleBrowseItems}
          onListClick={() => setIsListModalOpen(true)}
        />

        {/* How Timeline Section */}
        <HowItWorks />

        {/* Interactive Marketplace Catalog Section */}
        <Marketplace
          items={items}
          onRentClick={(item) => setSelectedItemForRent(item)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Earnings & carbon slider calculator */}
        <Calculator />

        {/* Trust FAQ Accordions & Safe-Zones Section */}
        <TrustSafety />

        {/* Pricing Subscriptions Packages Section */}
        <Pricing
          currentTier={session.tier}
          onSelectTier={handleSelectTier}
          sessionEmail={session.email}
          onScrollToSection={handleScrollToSection}
        />

      </main>

      {/* 4. CTA Waitlist Form & Links Footer */}
      <Footer
        onJoinWaitlist={handleJoinWaitlist}
        sessionEmail={session.email}
        onScrollToSection={handleScrollToSection}
      />

      {/* --- FLOATING OVERLAYS & MODALS --- */}

      {/* A. Bottom-Sheet / Centered Modal for Rental Booking Checkout */}
      {selectedItemForRent && (
        <CheckoutModal
          item={selectedItemForRent}
          session={session}
          onClose={() => setSelectedItemForRent(null)}
          onCompleteRental={handleCompleteRental}
        />
      )}

      {/* B. Multi-step Item Listing Wizard Overlay */}
      {isListModalOpen && (
        <ListWizard
          onClose={() => setIsListModalOpen(false)}
          onAddListing={handleAddListing}
          sessionEmail={session.email}
        />
      )}

      {/* C. Interactive "My Bookings" Slide-Over Schedule Panel */}
      {myRentalsOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10" id="my-bookings-drawer">
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setMyRentalsOpen(false)} />
          
          <div className="relative w-screen max-w-md bg-white shadow-2xl border-l border-slate-100 flex flex-col justify-between animate-slide-in">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6 text-left">
              <div>
                <h3 className="font-sans text-lg font-bold text-slate-900">My Campus Bookings</h3>
                <p className="font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">
                  Locker PINs & Active Returns
                </p>
              </div>
              <button
                onClick={() => setMyRentalsOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body Listings */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {session.rentals.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <span className="text-4xl">🗓</span>
                  <p className="text-sm font-semibold text-slate-700">No rentals scheduled yet</p>
                  <p className="text-xs text-slate-400 max-w-[200px] mx-auto">
                    Browse books, graphing calculators, and camping tents on our campus list.
                  </p>
                  <button
                    onClick={() => { setMyRentalsOpen(false); handleScrollToSection('marketplace'); }}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    Explore Resources
                  </button>
                </div>
              ) : (
                /* List of bookings */
                <div className="space-y-4 text-left">
                  {session.rentals.map((rent) => {
                    const isActive = rent.status === 'active';
                    return (
                      <div
                        key={rent.id}
                        className={`rounded-2xl border p-4 space-y-3.5 transition-all ${
                          isActive 
                            ? 'border-emerald-200 bg-emerald-50/10 shadow-sm'
                            : 'border-slate-100 bg-slate-50/50 grayscale'
                        }`}
                        id={`booking-card-${rent.id}`}
                      >
                        {/* Status tag */}
                        <div className="flex items-center justify-between text-xs">
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold border uppercase tracking-wider ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}>
                            {isActive ? '● Renting Now' : '✓ Safely Returned'}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 font-bold">{rent.id.toUpperCase()}</span>
                        </div>

                        {/* Title details */}
                        <div className="flex items-center space-x-3">
                          <img
                            src={rent.itemImage}
                            alt={rent.itemTitle}
                            className="h-12 w-12 rounded-lg object-cover border border-slate-100"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-sans text-xs font-bold text-slate-800 truncate">{rent.itemTitle}</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Owned by: {rent.ownerName}</p>
                          </div>
                        </div>

                        {/* Schedule & Pick-up instructions */}
                        <div className="text-xs space-y-1.5 border-t border-slate-100 pt-3">
                          <div className="flex justify-between text-slate-500">
                            <span>Pickup date:</span>
                            <span className="font-semibold text-slate-700">{rent.startDate}</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>Return date:</span>
                            <span className="font-semibold text-slate-700">{rent.endDate}</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>Total cost paid:</span>
                            <span className="font-bold text-slate-800">${rent.totalPrice}</span>
                          </div>
                        </div>

                        {/* Locker pickup instructions */}
                        {isActive && (
                          <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-center text-white space-y-1">
                            <p className="font-mono text-[8px] font-bold text-emerald-400 uppercase tracking-widest">
                              Campus Locker Access PIN
                            </p>
                            <p className="font-mono text-xl font-bold text-emerald-400 tracking-wider">
                              4 9 2 0 1
                            </p>
                            <span className="text-[9px] text-slate-400 font-medium block">
                              📍 Location: {rent.pickupLocation}
                            </span>
                          </div>
                        )}

                        {/* Mark Returned simulation controller button */}
                        {isActive && (
                          <button
                            onClick={() => handleReturnItem(rent.id, rent.itemId)}
                            className="w-full rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                            id={`booking-return-btn-${rent.id}`}
                          >
                            Mark Returned & Release Escrow Hold
                          </button>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Drawer Footer safety pledge */}
            <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-2 text-left">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero Waste Security Escrow</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Refundable security holds are authorized and kept securely. Once a return is verified by the peer lender, your hold is instantly released back to your bank account.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* D. Elegant Global Interactivity Notification Toast system */}
      {toast && (
        <div 
          className={`fixed bottom-5 left-5 z-50 flex items-center space-x-3 rounded-2xl px-5 py-4 border shadow-xl animate-bounce-short max-w-sm text-left ${
            toast.type === 'premium'
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-white text-slate-800 border-emerald-100'
          }`}
          id="global-toast-notification"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100/60">
            <Check className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-sans text-xs font-bold leading-snug">
              {toast.type === 'premium' ? '⚡ Premium Upgrade Authorized' : '✓ Operation Success'}
            </p>
            <p className="font-sans text-[11px] text-slate-500 leading-snug mt-0.5">
              {toast.message}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
