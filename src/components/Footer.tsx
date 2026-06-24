import React, { useState } from 'react';
import { Leaf, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onJoinWaitlist: (email: string) => void;
  sessionEmail: string | null;
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onJoinWaitlist, sessionEmail, onScrollToSection }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput.toLowerCase().endsWith('.edu')) {
      setErrorMsg('A valid student .edu email is required to join the waitlist.');
      return;
    }

    setErrorMsg('');
    setIsSuccess(true);
    onJoinWaitlist(emailInput.toLowerCase());
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-12 overflow-hidden relative border-t border-slate-800">
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-emerald-950/40 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Call To Action Box (Email Input) */}
        <div id="waitlist" className="bg-gradient-to-tr from-emerald-900 to-teal-900 rounded-3xl p-8 sm:p-12 text-center relative border border-emerald-800/40 shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="absolute -bottom-12 -right-12 h-40 w-40 bg-white/5 rounded-full blur-2xl" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center px-3 py-1 bg-white/10 text-emerald-300 rounded-full text-[11px] font-bold uppercase tracking-wider">
              Student-to-Student Movement
            </div>

            <h3 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Ready to start saving?
            </h3>
            
            <p className="font-sans text-sm text-emerald-100/80 leading-relaxed">
              Join thousands of students making campus life more affordable and sustainable. Sign up today and get free locker access code on launch.
            </p>

            {/* Email Form */}
            {isSuccess || sessionEmail ? (
              <div className="mx-auto max-w-md rounded-2xl bg-white/10 border border-white/20 p-5 flex items-center justify-center space-x-3 text-left">
                <CheckCircle2 className="h-6 w-6 text-emerald-300 shrink-0" />
                <div>
                  <p className="text-xs font-bold">You are on the waitlist! ✓</p>
                  <p className="text-[10px] text-emerald-200">
                    We registered <strong>{sessionEmail || emailInput}</strong>. You will receive an ambassador invite soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="mx-auto max-w-md">
                <div className="relative flex items-center rounded-xl bg-white/10 border border-white/10 p-1 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  <div className="flex items-center pl-3">
                    <Mail className="h-4 w-4 text-emerald-300/80" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your .edu email to join"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-xs font-medium text-white outline-none placeholder-emerald-300/50"
                    id="waitlist-email-input"
                  />
                  <button
                    type="submit"
                    className="group flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
                    id="waitlist-submit"
                  >
                    <span>Join</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-red-300 font-semibold text-xs mt-2 text-left pl-2">{errorMsg}</p>
                )}
                <p className="text-[10px] text-emerald-200/50 text-left pl-2 mt-2 leading-relaxed">
                  * CampuShare strictly requires official verified .edu college credentials to participate in peer-to-peer sharing.
                </p>
              </form>
            )}

          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 text-left border-t border-slate-800 pt-16">
          
          {/* Brand Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-sans text-lg font-bold">
                Campu<span className="text-emerald-500">Share</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Durable peer-to-peer campus rentals that make high-value course equipment, textbooks, and formal apparel accessible to every student budget.
            </p>
            <div className="flex items-center space-x-2 rounded-xl bg-slate-800 p-2 border border-slate-700 w-fit text-[10px] font-semibold text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>100% Verified .EDU Network</span>
            </div>
          </div>

          {/* Catalog shortcuts */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campus Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onScrollToSection('marketplace')} className="hover:text-emerald-500">Academic & Study Sets</button></li>
              <li><button onClick={() => onScrollToSection('marketplace')} className="hover:text-emerald-500">DSLR Cameras & Media</button></li>
              <li><button onClick={() => onScrollToSection('marketplace')} className="hover:text-emerald-500">Suits & Graduation Caps</button></li>
              <li><button onClick={() => onScrollToSection('marketplace')} className="hover:text-emerald-500">Dorm Moving Dollies & Tools</button></li>
            </ul>
          </div>

          {/* Safety Policies */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust & Legals</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onScrollToSection('trust-safety')} className="hover:text-emerald-500">Designated Safe Zones</button></li>
              <li><button onClick={() => onScrollToSection('trust-safety')} className="hover:text-emerald-500">Locker PIN Guidelines</button></li>
              <li><button onClick={() => onScrollToSection('trust-safety')} className="hover:text-emerald-500">Security Escrow Protection</button></li>
              <li><button onClick={() => onScrollToSection('trust-safety')} className="hover:text-emerald-500">Accidental Damage Cover</button></li>
            </ul>
          </div>

          {/* Carbon emissions pledge */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">Green Campus Pledge</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              For every 10 shared rentals completed, CampuShare offsets manufacturing emissions by funding local campus garden carbon sequestration initiatives.
            </p>
            <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs">
              <span>☘ Carbon Neutral Service</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800 pt-8 text-[11px] text-slate-500 text-left">
          <p>© {new Date().getFullYear()} CampuShare Inc. All university rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-300">Terms of Use</span>
            <span className="hover:text-slate-300">Privacy Protocols</span>
            <span className="hover:text-slate-300">Campus Ambassador Program</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
