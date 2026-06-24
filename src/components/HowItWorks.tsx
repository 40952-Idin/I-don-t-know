import { useState } from 'react';
import { Search, MapPin, CheckCircle, Smartphone, Lock, ShieldCheck, HelpCircle } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Search & Reserve',
      tagline: 'Instant Booking',
      description: 'Find the item you need on your campus and select your rental dates.',
      icon: Search,
      details: [
        'Filter items by category, condition, and distance from your dorm.',
        'Choose specific single days or full-semester rental blocks.',
        'Submit a secure booking request. Peer lenders respond in minutes.'
      ],
      simulationTitle: 'Simulated Step 1: Browse & Book',
      simulationContent: (
        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
            <span className="text-xs font-bold text-slate-400 font-mono">STEP 1 LIVE PREVIEW</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">Available Near You</span>
          </div>
          <p className="text-xs font-bold text-slate-800">Booking Calendar Selection</p>
          <div className="grid grid-cols-7 gap-1.5 my-3 text-center text-[10px] font-bold">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
              <span key={idx} className="text-slate-400">{d}</span>
            ))}
            {Array.from({ length: 14 }).map((_, idx) => {
              const day = idx + 1;
              const isSelected = day >= 4 && day <= 6;
              return (
                <span
                  key={idx}
                  className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>
          <div className="rounded-lg bg-emerald-50 p-3 text-[11px] text-emerald-800 font-medium">
            <strong>Rental Period:</strong> 3 Days selected (Jun 4th - Jun 6th)<br />
            <strong>Total Cost:</strong> $9.00 (Standard) • <span className="underline">$9.00 $0.00 service fee</span>
          </div>
        </div>
      )
    },
    {
      number: '02',
      title: 'Pick Up & Use',
      tagline: 'Safe Exchange',
      description: 'Meet the lender at a designated campus safe-zone or collect it from a campus locker.',
      icon: MapPin,
      details: [
        'Meet at verified, camera-monitored campus safe-zones.',
        'Access 24/7 automated lock-boxes located in the Student Union.',
        'Inspect the item upon exchange to ensure it fits the descriptions.'
      ],
      simulationTitle: 'Simulated Step 2: Safe Pickup',
      simulationContent: (
        <div className="rounded-xl border border-slate-100 bg-slate-900 text-white p-5 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-xs font-bold text-emerald-400 font-mono">LOCKER HUB INTEGRATION</span>
            <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Locker #04 Activated</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Your Safe Pick-Up Location</p>
                <p className="text-sm font-bold">Student Union Hall Locker Hub</p>
              </div>
              <Lock className="h-8 w-8 text-emerald-400" />
            </div>
            <div className="rounded-lg bg-slate-800 p-3 text-center border border-slate-700">
              <p className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">Enter Digital PIN on Screen</p>
              <p className="font-mono text-2xl font-black text-emerald-400 tracking-widest mt-1">4 9 2 0 1</p>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              💡 Open the locker, inspect the TI-84 Plus, and confirm pickup inside the app to start your rental timer.
            </p>
          </div>
        </div>
      )
    },
    {
      number: '03',
      title: 'Return',
      tagline: 'Simple Handover',
      description: 'Bring the item back in its original condition when your rental period ends.',
      icon: CheckCircle,
      details: [
        'Drop off with the classmate or leave it in a designated locker.',
        'The lender reviews the condition and signs off on the return.',
        'Your fully authorized deposit is instantly refunded to your payment card.'
      ],
      simulationTitle: 'Simulated Step 3: Verified Return',
      simulationContent: (
        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
            <span className="text-xs font-bold text-slate-400 font-mono">DUE DATE CHECKLIST</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-800">Return Ready</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2 text-xs">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />
              <div>
                <p className="font-bold text-slate-800">Cables and Accessories included</p>
                <p className="text-[10px] text-slate-500">Includes original cover & chargers</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 text-xs">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />
              <div>
                <p className="font-bold text-slate-800">Item cleaned and sterilized</p>
                <p className="text-[10px] text-slate-500">Wiped and prepped for the next student</p>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 text-center text-xs border border-slate-100 mt-2">
              <span className="text-emerald-700 font-bold">✓ Authorization Released</span>
              <p className="text-[10px] text-slate-500 mt-0.5">Your fully authorization deposit of $15.00 has been returned.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="bg-white border-y border-slate-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            Safe-Zone Exchange Loop
          </div>
          <h3 className="font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-[1.15]">
            How CampuShare Works
          </h3>
          <p className="font-sans text-base text-slate-600 leading-relaxed">
            We streamline student-to-student sharing. Safe, convenient, and built with campus guidelines in mind.
          </p>
        </div>

        {/* Steps Grid and Interactive Display */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Timeline Selector Column */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex cursor-pointer items-start space-x-4 rounded-2xl p-5 border text-left transition-all ${
                    isActive
                      ? 'border-emerald-200 bg-white shadow-md shadow-emerald-900/5'
                      : 'border-transparent bg-transparent hover:bg-white/60 hover:border-slate-200'
                  }`}
                  id={`how-step-btn-${idx}`}
                >
                  {/* Step Icon Accent */}
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Step Description */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        STEP {st.number} • {st.tagline}
                      </span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <h4 className="font-sans text-lg font-bold text-slate-900">
                      {st.title}
                    </h4>
                    <p className="font-sans text-sm text-slate-600 leading-normal">
                      {st.description}
                    </p>

                    {/* Expand Details if Active */}
                    {isActive && (
                      <ul className="mt-3.5 space-y-2 text-xs text-slate-500 list-disc list-inside">
                        {st.details.map((d, dIdx) => (
                          <li key={dIdx} className="leading-relaxed">{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simulated Mobile Mockup Display Column */}
          <div className="lg:col-span-6">
            <div className="mx-auto max-w-[360px] rounded-3xl bg-slate-900 p-3 shadow-xl border border-slate-800">
              <div className="overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 px-4 py-5 space-y-4">
                
                {/* Simulated Phone Top Bar */}
                <div className="flex items-center justify-between text-slate-400 px-1 text-[10px] font-bold font-mono">
                  <span>CampuShare App</span>
                  <div className="flex items-center space-x-1">
                    <Smartphone className="h-3 w-3" />
                    <span>Lobby WiFi</span>
                  </div>
                </div>

                {/* Simulated Screen Body */}
                <div className="space-y-4">
                  <h4 className="font-sans text-sm font-bold text-slate-800 text-left border-b border-slate-200/60 pb-1.5">
                    {steps[activeStep].simulationTitle}
                  </h4>
                  {steps[activeStep].simulationContent}
                </div>

                {/* Safe zone pledge notice */}
                <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-3 flex items-start space-x-2 text-left text-[11px] text-teal-900 leading-relaxed">
                  <ShieldCheck className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Campus Safe Pledge:</strong> All transactions are conducted in designated public locations with cameras and student check-ins.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
