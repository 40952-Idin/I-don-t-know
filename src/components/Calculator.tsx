import { useState } from 'react';
import { DollarSign, Leaf, Sparkles, TrendingUp, Info } from 'lucide-react';

interface CalculatorItem {
  name: string;
  category: string;
  buyPrice: number;
  rentPrice: number;
  co2SavingsLbs: number; // estimated CO2 reduction per shared transaction
}

export default function Calculator() {
  const [calculatorMode, setCalculatorMode] = useState<'lend' | 'rent'>('lend');
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [frequency, setFrequency] = useState(6); // rentals per semester or items needed

  const lendItems: CalculatorItem[] = [
    { name: 'DSLR Camera Rig', category: 'Tech', buyPrice: 499, rentPrice: 12, co2SavingsLbs: 24 },
    { name: 'TI-84 Graphing Calculator', category: 'Academic', buyPrice: 119, rentPrice: 3, co2SavingsLbs: 8 },
    { name: 'Classic Interview Suit', category: 'Apparel', buyPrice: 180, rentPrice: 9, co2SavingsLbs: 18 },
    { name: 'Coleman Camping Tent', category: 'Leisure', buyPrice: 110, rentPrice: 7, co2SavingsLbs: 35 },
    { name: 'Heavy Duty Moving Dolly', category: 'Practical', buyPrice: 65, rentPrice: 4, co2SavingsLbs: 15 },
    { name: 'Organic Chemistry Model Kit', category: 'Academic', buyPrice: 35, rentPrice: 2, co2SavingsLbs: 4 }
  ];

  const currentItem = lendItems[selectedItemIdx];

  // Calculations for Lend & Earn
  // Earnings = rentPrice * 3 days avg rental * frequency times per semester
  const estimatedDaysPerRental = 3;
  const projectedEarnings = currentItem.rentPrice * estimatedDaysPerRental * frequency;
  const projectedCo2Saved = currentItem.co2SavingsLbs * frequency;

  // Calculations for Rent & Save
  const totalRentCost = currentItem.rentPrice * estimatedDaysPerRental;
  const projectedSavings = currentItem.buyPrice - totalRentCost;

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="rounded-3xl bg-slate-900 text-white overflow-hidden relative shadow-2xl shadow-emerald-950/20 border border-slate-800 p-8 sm:p-12 lg:p-16">
        <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-950/40 blur-3xl" />
        <div className="absolute top-0 left-0 -z-10 h-72 w-72 rounded-full bg-teal-950/30 blur-3xl" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Description & Toggles */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="inline-flex items-center px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-800">
              <span>Sustainability Impact Calculator</span>
            </div>

            <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl leading-[1.15]">
              Project Your Campus Savings & Earnings
            </h2>
            
            <p className="font-sans text-sm text-slate-400 leading-relaxed">
              Find out how much money you can generate by lending items sitting in your closet, or see how much money you save by borrowing instead of purchasing new items you only need once.
            </p>

            {/* Mode Toggle Button */}
            <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700/60 w-fit">
              <button
                onClick={() => { setCalculatorMode('lend'); setFrequency(6); }}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  calculatorMode === 'lend'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                id="calc-toggle-lend"
              >
                👥 Lend & Earn Cash
              </button>
              <button
                onClick={() => { setCalculatorMode('rent'); setFrequency(1); }}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  calculatorMode === 'rent'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                id="calc-toggle-rent"
              >
                🛒 Rent & Save Money
              </button>
            </div>

            {/* Selected item list buttons */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Choose Campus Item
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {lendItems.map((itm, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedItemIdx(idx)}
                    className={`rounded-lg p-2 text-[10px] font-bold border transition-all text-center truncate ${
                      selectedItemIdx === idx
                        ? 'bg-emerald-900 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    id={`calc-item-btn-${idx}`}
                  >
                    {itm.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Calculator Sliders and Visual Output Panel */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 space-y-8">
              
              {/* Slider for lending frequency */}
              {calculatorMode === 'lend' ? (
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs font-bold text-slate-300">
                      Rented out how many times per semester?
                    </span>
                    <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-950 border border-emerald-900/60 px-3 py-1 rounded-lg">
                      {frequency} Times
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    id="calc-slider-frequency"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold font-mono">
                    <span>1 TIME</span>
                    <span>5 TIMES</span>
                    <span>10 TIMES</span>
                    <span>15 TIMES</span>
                  </div>
                </div>
              ) : (
                /* Rental frequency info for rent and save */
                <div className="space-y-4 text-left">
                  <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                    <p className="font-sans text-xs text-slate-300">
                      If you buy a new <strong>{currentItem.name}</strong>, you pay the retail price. Borrowing it for a standard exam cycle or weekend event instead saves you massive funds.
                    </p>
                  </div>
                </div>
              )}

              {/* Dynamic Stats Output Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/80 pt-6">
                
                {/* Financial Output Card */}
                <div className="rounded-xl bg-slate-900 border border-slate-800/60 p-5 text-left space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/5 rounded-full blur-xl" />
                  <div className="flex items-center space-x-1 text-xs text-slate-400 font-semibold">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{calculatorMode === 'lend' ? 'Projected Semester Earnings' : 'Dorm Budget Saved'}</span>
                  </div>
                  <p className="font-sans text-3xl font-extrabold text-emerald-400">
                    ${calculatorMode === 'lend' ? projectedEarnings.toFixed(2) : projectedSavings.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                    {calculatorMode === 'lend' 
                      ? `Based on an average ${estimatedDaysPerRental}-day rental rate of $${currentItem.rentPrice}/day.`
                      : `Retail cost of $${currentItem.buyPrice} vs. booking rental cost of $${totalRentCost}.`
                    }
                  </p>
                </div>

                {/* Ecological Output Card */}
                <div className="rounded-xl bg-slate-900 border border-slate-800/60 p-5 text-left space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-teal-500/5 rounded-full blur-xl" />
                  <div className="flex items-center space-x-1 text-xs text-slate-400 font-semibold">
                    <Leaf className="h-3.5 w-3.5 text-teal-400" />
                    <span>Carbon Manufacturing Offset</span>
                  </div>
                  <p className="font-sans text-3xl font-extrabold text-teal-400">
                    {calculatorMode === 'lend' ? projectedCo2Saved : currentItem.co2SavingsLbs} lbs CO₂
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                    Equivalent emissions prevented by avoiding a redundant chemical plastic/electronics purchase.
                  </p>
                </div>

              </div>

              {/* Eco comparison metrics */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 flex items-center space-x-3 text-left">
                <div className="h-9 w-9 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-900/40">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-300">
                    {calculatorMode === 'lend' 
                      ? `Classroom waste reduced: Equivalent to planting ${Math.round(projectedCo2Saved / 10) || 1} campus trees!`
                      : `Saving $${projectedSavings.toFixed(0)} represents over ${Math.round(projectedSavings / 15)} hours of student-work wages saved!`
                    }
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                    LendUni research shows circular sharing decreases single-semester student debt averages.
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
