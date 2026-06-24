import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Camera } from 'lucide-react';
import { Item, ItemCategory } from '../types';

interface ListWizardProps {
  onClose: () => void;
  onAddListing: (newItem: Item) => void;
  sessionEmail: string | null;
}

export default function ListWizard({ onClose, onAddListing, sessionEmail }: ListWizardProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('academic');
  const [price, setPrice] = useState('3.00');
  const [deposit, setDeposit] = useState('15.00');
  const [condition, setCondition] = useState<'Like New' | 'Excellent' | 'Good' | 'Fair'>('Excellent');
  const [location, setLocation] = useState('Science Library Lobby');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState('');
  const [ownerName, setOwnerName] = useState('Alex P.');
  const [eduEmail, setEduEmail] = useState(sessionEmail || '');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedTemplateImg, setSelectedTemplateImg] = useState('calculator');
  const [isSuccess, setIsSuccess] = useState(false);

  // Curated Unsplash images based on standard student listings
  const templateImages: { [key: string]: { label: string; url: string } } = {
    calculator: {
      label: 'Scientific Calculator',
      url: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600&auto=format&fit=crop&q=80'
    },
    camera: {
      label: 'DSLR Camera',
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'
    },
    textbook: {
      label: 'Academic Textbook',
      url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80'
    },
    suit: {
      label: 'Suits & Apparel',
      url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80'
    },
    tent: {
      label: 'Camping & Leisure',
      url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=80'
    },
    tools: {
      label: 'Hardware & Tools',
      url: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=600&auto=format&fit=crop&q=80'
    }
  };

  const safeZones = [
    'Science Library Lobby',
    'Student Union Main Quad',
    'Business School Courtyard',
    'East Hall Common Room',
    'Fine Arts Center Quad',
    'Campus Locker Hub (Bookstore)'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eduEmail.toLowerCase().endsWith('.edu')) {
      alert('Valid .edu student email is required to list peer items on CampuShare.');
      return;
    }

    // Determine image
    const finalImageUrl = customImageUrl.trim() !== '' 
      ? customImageUrl 
      : templateImages[selectedTemplateImg].url;

    // Split specs by commas
    const processedSpecs = specs.trim() !== ''
      ? specs.split(',').map(s => s.trim())
      : ['Campus pickup', 'Student verified'];

    const newItem: Item = {
      id: `peer-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      category,
      description: description.trim() || `High-quality student resources listed in ${category} category.`,
      pricePerDay: parseFloat(price) || 2.00,
      condition,
      owner: {
        name: ownerName.trim(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80',
        rating: 5.0,
        reviewsCount: 1,
        isVerified: true,
        eduEmail: eduEmail.toLowerCase()
      },
      location,
      isPlatformOwned: false,
      imageUrl: finalImageUrl,
      isAvailable: true,
      deposit: parseFloat(deposit) || 10.00,
      specs: processedSpecs,
      rentalsCount: 0
    };

    onAddListing(newItem);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100/80 animate-in fade-in zoom-in-95 duration-200"
        id="list-wizard-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="text-left">
            <h3 className="font-sans text-xl font-extrabold text-slate-900">
              {isSuccess ? 'Listing Live!' : 'Lend on Campus'}
            </h3>
            <p className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">
              {isSuccess ? 'Circular economy added' : 'Earn extra student cash'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
            id="list-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success display */
          <div className="p-6 space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-sans text-lg font-bold text-slate-900">Your item is now listed!</h4>
              <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                Classmates searching for this category will see your listing. We will notify you via <strong>{eduEmail}</strong> as soon as a student requests a booking.
              </p>
            </div>

            {/* Simulated Earnings Callout */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-left space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800">Projected Earnings Insight</span>
              </div>
              <p className="text-xs text-emerald-900 leading-normal">
                Based on current campus demand, renting this out just <strong>5 times</strong> this semester will yield <strong>${(parseFloat(price) * 15).toFixed(2)}</strong> and prevent redundant student purchases!
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer"
              id="list-done-btn"
            >
              Back to Marketplace
            </button>
          </div>
        ) : (
          /* Form display */
          <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-left">
            
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Join our student circular loop. Earn money from items sitting in your closet, and reduce redundant campus manufacturing.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">What are you listing?</label>
              <input
                type="text"
                placeholder="e.g., TI-84 Plus CE, Graduation Gown, Spikeball set"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                id="list-title"
              />
            </div>

            {/* Grid for Category, Condition */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                  id="list-category"
                >
                  <option value="academic">📚 Academic & Study</option>
                  <option value="tech">📷 Tech & Media</option>
                  <option value="events">👔 Events & Apparel</option>
                  <option value="practical">⛺ Practical & Leisure</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                  id="list-condition"
                >
                  <option value="Like New">Like New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>

            {/* Grid for Price and Deposit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Daily Price ($)</label>
                <input
                  type="number"
                  step="0.50"
                  min="0.50"
                  max="50.00"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                  id="list-price"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Refundable Deposit ($)</label>
                <input
                  type="number"
                  step="1.00"
                  min="0"
                  max="200"
                  required
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                  id="list-deposit"
                />
              </div>
            </div>

            {/* Safe zone pickup */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Designated Campus Exchange Safe-Zone</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                id="list-location"
              >
                {safeZones.map((sz, i) => (
                  <option key={i} value={sz}>{sz}</option>
                ))}
              </select>
            </div>

            {/* Specs & Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Specifications (comma separated list)</label>
              <input
                type="text"
                placeholder="e.g., Includes leather case, Rechargeable battery, 1080p output"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                id="list-specs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Item Description</label>
              <textarea
                placeholder="e.g., Used this organic chemistry model kit for one semester. Clean, 100% complete set of molecular bonds."
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                id="list-desc"
              />
            </div>

            {/* Smart Image Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Select High-Quality Catalog Cover Image</label>
              <div className="grid grid-cols-3 gap-2 border border-slate-100 p-2.5 rounded-2xl bg-slate-50/50">
                {Object.keys(templateImages).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedTemplateImg(key);
                      setCustomImageUrl('');
                    }}
                    className={`rounded-lg p-1.5 text-[10px] font-bold border text-center truncate cursor-pointer transition-colors ${
                      selectedTemplateImg === key && customImageUrl === ''
                        ? 'bg-emerald-600 text-white border-transparent'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                    id={`list-img-template-${key}`}
                  >
                    {templateImages[key].label}
                  </button>
                ))}
              </div>
              
              <div className="relative pt-1">
                <input
                  type="text"
                  placeholder="Or paste a custom image URL directly (optional)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                  id="list-custom-img"
                />
              </div>
            </div>

            {/* Profile Credentials Verification block */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your First Name</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                    id="list-owner-name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Verified student .edu email</label>
                  <input
                    type="email"
                    required
                    placeholder="s.name@university.edu"
                    value={eduEmail}
                    onChange={(e) => setEduEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                    id="list-edu-email"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                Lenders are strictly required to use verified university emails. Your email is kept secure and only shown to verified renters.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 active:scale-[0.98] transition-all cursor-pointer mt-2"
              id="list-submit-btn"
            >
              Verify .edu & Publish Listing
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[9px] text-slate-400 text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Includes standard peer items damage liability up to $150</span>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
