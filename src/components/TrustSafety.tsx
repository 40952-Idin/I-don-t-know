import { useState } from 'react';
import { ShieldCheck, Lock, HeartHandshake, HelpCircle, ChevronDown, ChevronUp, Map, MapPin } from 'lucide-react';
import { INITIAL_FAQS } from '../data';

export default function TrustSafety() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: 'Verified Student Profiles',
      description: 'Lenders and renters are strictly verified using university-issued .edu email addresses. Anonymous or external profiles are prohibited.',
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      icon: Lock,
      title: 'Secured Escrow Deposits',
      description: 'Funds and refundable security deposits are authorized and held securely in escrow. They are released only after returns are completed and inspected.',
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      icon: HeartHandshake,
      title: 'Damage Protection Shield',
      description: 'Our standard platform covers dispute resolution, while subscription tiers (Campus Pass) offer up to $50 in structural accidental coverage.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    }
  ];

  const handleToggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const safeZones = [
    { name: 'Science Library Lobby', desc: 'Monitored with 24/7 security cameras near the entrance check-in desk.', hours: '8:00 AM - 11:00 PM' },
    { name: 'Student Union Locker Hub', desc: 'Self-serve electronic lockers located adjacent to the campus bookstore.', hours: '24/7 Access' },
    { name: 'Business School Courtyard', desc: 'Central well-lit meeting pavilion with extensive student seating.', hours: '7:00 AM - 9:00 PM' }
  ];

  return (
    <section id="trust-safety" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
        
        {/* Left column: Trust principles & safety map */}
        <div className="lg:col-span-6 space-y-10 text-left">
          
          <div className="space-y-3">
            <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Security Guarantee
            </div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-[1.15]">
              Borrow with Total Confidence
            </h2>
            <p className="font-sans text-base text-slate-600 leading-relaxed max-w-xl">
              Sharing resources shouldn’t be stressful. We’ve built extensive security protocols directly into the campus loop to protect your items and payments.
            </p>
          </div>

          {/* Features Column */}
          <div className="space-y-6">
            {safetyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex space-x-4 items-start rounded-2xl border border-slate-200/60 bg-white shadow-sm p-5 hover:border-emerald-500/20 transition-all">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${feat.color}`}>
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-base font-bold text-slate-900">{feat.title}</h3>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safe-zones block */}
          <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Map className="h-5 w-5 text-emerald-600" />
              <h3 className="font-sans text-base font-bold text-slate-900">Designated Campus Safe-Zones</h3>
            </div>
            
            <p className="text-xs text-slate-500">
              To make peer swap-hubs hassle-free, meet classmate lenders at these pre-authorized campus locations:
            </p>

            <div className="space-y-3 pt-1">
              {safeZones.map((sz, i) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs">
                  <span className="text-emerald-600 mt-0.5">📍</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-slate-800">{sz.name}</p>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold font-mono text-slate-500">{sz.hours}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{sz.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Accordion FAQs */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          <div className="space-y-3">
            <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Lending Knowledge base
            </div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-[1.2]">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-base text-slate-600 leading-relaxed">
              Everything you need to know about listings, membership subscriptions, damage insurance, and campus lockers.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3" id="faq-accordions">
            {INITIAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen 
                      ? 'border-emerald-500/20 bg-emerald-50/20 shadow-sm' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                  id={`faq-item-${idx}`}
                >
                  {/* Collapsible Trigger Button */}
                  <button
                    onClick={() => handleToggleFaq(idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-sans font-bold text-slate-800 text-sm focus:outline-none"
                    id={`faq-trigger-${idx}`}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className={`rounded-full p-1 bg-slate-100 text-slate-500 transition-transform ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : ''}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Body details */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 border-t border-slate-100/50 mt-1">
                      <p className="font-sans text-xs text-slate-600 leading-relaxed pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Extra Help card */}
          <div className="rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white p-6 shadow-lg shadow-emerald-600/10 space-y-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-white animate-pulse" />
              <h3 className="font-sans text-base font-bold">Have another question?</h3>
            </div>
            <p className="text-xs text-emerald-100 leading-normal">
              Our support team consists of campus ambassadors who can help troubleshoot locker access issues, coordinate returns, or settle peer disputes quickly.
            </p>
            <div className="pt-2">
              <span className="font-mono text-[10px] font-bold text-emerald-200 uppercase tracking-widest block">Ambassador Email Support</span>
              <span className="text-sm font-semibold text-white">support@campushare.edu</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
