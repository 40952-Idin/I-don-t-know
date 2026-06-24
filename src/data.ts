import { Item } from './types';

export const INITIAL_ITEMS: Item[] = [
  // --- ACADEMIC & STUDY ---
  {
    id: 'acad-1',
    title: 'TI-84 Plus CE Graphing Calculator',
    category: 'academic',
    description: 'Perfect for Calculus, Physics, or Statistics exams. Fully charged with rechargeable lithium-ion battery, includes USB charging cable.',
    pricePerDay: 3.00,
    condition: 'Excellent',
    owner: {
      name: 'Sarah Jenkins',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.9,
      reviewsCount: 32,
      isVerified: true,
      eduEmail: 's.jenkins@university.edu'
    },
    location: 'Science Library Study Area',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600&auto=format&fit=crop&q=80', // Calculator-adjacent/tech
    isAvailable: true,
    deposit: 15.00,
    specs: ['Color display', 'Rechargeable battery', 'Approved for SAT/ACT/AP', 'Includes slider cover'],
    rentalsCount: 24
  },
  {
    id: 'acad-2',
    title: 'Organic Chemistry Model Kit (Prentice Hall)',
    category: 'academic',
    description: 'Complete molecular model kit with 218 pieces. Essential for visualizing stereochemistry, functional groups, and molecular structures in O-Chem.',
    pricePerDay: 2.00,
    condition: 'Like New',
    owner: {
      name: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.8,
      reviewsCount: 14,
      isVerified: true,
      eduEmail: 'a.rivera@university.edu'
    },
    location: 'Chemistry Hall Lobby (Room 204)',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=600&auto=format&fit=crop&q=80', // Lab/chem
    isAvailable: true,
    deposit: 10.00,
    specs: ['218 molecular atoms/bonds', 'Instructional booklet included', 'Sturdy plastic organizer case'],
    rentalsCount: 8
  },
  {
    id: 'acad-3',
    title: 'Premium Chemistry Lab Coat & Splash Goggles',
    category: 'academic',
    description: 'White unisex lab coat (Size M) meeting all university lab safety requirements. Includes anti-fog splash-proof protection goggles.',
    pricePerDay: 2.50,
    condition: 'Good',
    owner: {
      name: 'CampuShare Hub',
      avatarUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=100&fit=crop&crop=faces&q=80', // Logo placeholder/avatar
      rating: 5.0,
      reviewsCount: 154,
      isVerified: true,
      eduEmail: 'support@campushare.edu'
    },
    location: 'CampuShare Locker Hub (Student Union)',
    isPlatformOwned: true,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80', // Science/Industry
    isAvailable: true,
    deposit: 5.00,
    specs: ['Unisex Size Medium', '100% Breathable Cotton', 'Meets OSHA lab standards', 'Includes anti-scratch goggles'],
    rentalsCount: 92
  },
  {
    id: 'acad-4',
    title: 'Art Supplies Set: Professional Studio Easel & Pastels',
    category: 'academic',
    description: 'Adjustable wooden H-frame desktop art easel, complete with a set of 48 Rembrandt soft pastels and drafting boards. Perfect for studio art projects.',
    pricePerDay: 4.00,
    condition: 'Excellent',
    owner: {
      name: 'Emily Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.9,
      reviewsCount: 19,
      isVerified: true,
      eduEmail: 'e.chen@university.edu'
    },
    location: 'Fine Arts Center Quad',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80', // Art
    isAvailable: true,
    deposit: 20.00,
    specs: ['Solid beechwood easel', 'Adjustable height & angle', 'Rembrandt 48 color pastel set'],
    rentalsCount: 11
  },

  // --- TECH & MEDIA ---
  {
    id: 'tech-1',
    title: 'Canon EOS Rebel T7 DSLR Camera',
    category: 'tech',
    description: 'High-quality 24.1 Megapixel DSLR camera with 18-55mm zoom lens. Ideal for photography coursework, graduation pictures, or student journalism.',
    pricePerDay: 12.00,
    condition: 'Excellent',
    owner: {
      name: 'Marcus Brody',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.9,
      reviewsCount: 41,
      isVerified: true,
      eduEmail: 'm.brody@university.edu'
    },
    location: 'Media Arts Lab Lounge',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80', // Camera
    isAvailable: true,
    deposit: 100.00,
    specs: ['24.1 MP CMOS Sensor', 'Full HD 1080p Video', 'Includes 64GB high-speed SD card', 'Neck strap, carrying bag, and battery charger'],
    rentalsCount: 54
  },
  {
    id: 'tech-2',
    title: 'Anker Nebula Capsule Mini Projector',
    category: 'tech',
    description: 'Soda-can sized smart projector. Cast your screen for dorm movie nights, game tournaments, or group presentations.',
    pricePerDay: 8.00,
    condition: 'Like New',
    owner: {
      name: 'CampuShare Hub',
      avatarUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 5.0,
      reviewsCount: 154,
      isVerified: true,
      eduEmail: 'support@campushare.edu'
    },
    location: 'CampuShare Locker Hub (Student Union)',
    isPlatformOwned: true,
    imageUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80', // Projector/Movie
    isAvailable: true,
    deposit: 50.00,
    specs: ['360° Speaker built-in', '100 ANSI Lumen brightness', '4-hour battery life', 'HDMI, USB, and Screen Mirroring'],
    rentalsCount: 120
  },
  {
    id: 'tech-3',
    title: 'Meta Quest 2 VR Headset (128GB)',
    category: 'tech',
    description: 'Immersive virtual reality headset. Awesome for gaming nights, testing 3D student software, or exploring VR apps.',
    pricePerDay: 15.00,
    condition: 'Excellent',
    owner: {
      name: 'Tyler Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.7,
      reviewsCount: 9,
      isVerified: true,
      eduEmail: 't.vance@university.edu'
    },
    location: 'Engineering Quad (Hall Lobby)',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80', // VR
    isAvailable: true,
    deposit: 80.00,
    specs: ['128GB Storage', 'Two Touch Controllers included', 'Power adapter & charging cable', 'Silicon face-pad protector'],
    rentalsCount: 16
  },
  {
    id: 'tech-4',
    title: 'Heavy Duty Power Bank with USB-C PD',
    category: 'tech',
    description: '26800mAh high capacity portable charger with 45W USB-C Power Delivery. Charges laptops, tablets, and phones simultaneously during study marathons.',
    pricePerDay: 2.00,
    condition: 'Excellent',
    owner: {
      name: 'CampuShare Hub',
      avatarUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 5.0,
      reviewsCount: 154,
      isVerified: true,
      eduEmail: 'support@campushare.edu'
    },
    location: 'CampuShare Locker Hub (Student Union)',
    isPlatformOwned: true,
    imageUrl: 'https://images.unsplash.com/photo-1609592424089-9a764d952678?w=600&auto=format&fit=crop&q=80', // Power bank
    isAvailable: true,
    deposit: 10.00,
    specs: ['26,800mAh high capacity', '45W USB-C output (laptop capable)', 'Three output ports', 'Recharges in 3 hours with PD charger'],
    rentalsCount: 204
  },

  // --- EVENTS & APPAREL ---
  {
    id: 'event-1',
    title: 'Classic Charcoal Slim Suit Jacket & Pants',
    category: 'events',
    description: 'Perfect for career fairs, internship interviews, or banquets. Cleaned professionally between uses. Standard Size 40R jacket / 32W pants.',
    pricePerDay: 9.00,
    condition: 'Excellent',
    owner: {
      name: 'Daniel Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 5.0,
      reviewsCount: 18,
      isVerified: true,
      eduEmail: 'd.kim@university.edu'
    },
    location: 'Business School Courtyard',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80', // Suit
    isAvailable: true,
    deposit: 40.00,
    specs: ['Charcoal Gray Slim Fit', 'Jacket: 40R, Pants: 32W x 30L', 'Poly-rayon stretch blend', 'Includes suit hanger and travel garment bag'],
    rentalsCount: 22
  },
  {
    id: 'event-2',
    title: 'Emerald Green Graduation Gown & Cap Set',
    category: 'events',
    description: 'Official university emerald green graduation regalia. Save money on your big day! Fits heights 5\'7" to 5\'10". Gown is wrinkle-free.',
    pricePerDay: 5.00,
    condition: 'Like New',
    owner: {
      name: 'Vanessa Lopez',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.8,
      reviewsCount: 6,
      isVerified: true,
      eduEmail: 'v.lopez@university.edu'
    },
    location: 'South Campus Quad (near Fountain)',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80', // Graduation
    isAvailable: true,
    deposit: 15.00,
    specs: ['Official university color & style', 'Comfortable matte finish', 'Includes matching cap & black tassel', 'Fits height 5\'7" - 5\'10"'],
    rentalsCount: 5
  },
  {
    id: 'event-3',
    title: 'Themed Party LED Accent Lights & Karaoke Rig',
    category: 'events',
    description: 'Transform your room or venue with 4 smart app-controlled floor up-lights, dynamic sound-activated modes, and a dual-microphone Bluetooth karaoke machine.',
    pricePerDay: 10.00,
    condition: 'Excellent',
    owner: {
      name: 'CampuShare Hub',
      avatarUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 5.0,
      reviewsCount: 154,
      isVerified: true,
      eduEmail: 'support@campushare.edu'
    },
    location: 'CampuShare Locker Hub (Student Union)',
    isPlatformOwned: true,
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80', // Party/Stage
    isAvailable: true,
    deposit: 30.00,
    specs: ['4x RGBWA app-controlled bar spotlights', 'Bluetooth speaker with dual wireless mics', 'Sound-activated strobing mode', 'Extended 20ft extension cords'],
    rentalsCount: 78
  },

  // --- PRACTICAL & LEISURE ---
  {
    id: 'prac-1',
    title: 'Heavy Duty Moving Dolly (Folding)',
    category: 'practical',
    description: 'Moving into a new dorm or apartment? Save your back with this heavy-duty steel moving hand truck. Folds completely flat for storage.',
    pricePerDay: 4.00,
    condition: 'Excellent',
    owner: {
      name: 'CampuShare Hub',
      avatarUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 5.0,
      reviewsCount: 154,
      isVerified: true,
      eduEmail: 'support@campushare.edu'
    },
    location: 'CampuShare Locker Hub (Student Union)',
    isPlatformOwned: true,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80', // Logistics/Moving
    isAvailable: true,
    deposit: 20.00,
    specs: ['Holds up to 330 lbs', 'Lightweight strong alloy steel', 'Telescoping handle adjusts up to 39 inches', 'Folds to 2.2 inches flat'],
    rentalsCount: 145
  },
  {
    id: 'prac-2',
    title: 'Coleman 4-Person Instant Cabin Tent',
    category: 'practical',
    description: 'Perfect for weekend camping trips or student-club retreats. Sets up in under 60 seconds. Rainfly and stakes included.',
    pricePerDay: 7.00,
    condition: 'Excellent',
    owner: {
      name: 'Jordan Miller',
      avatarUrl: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.9,
      reviewsCount: 11,
      isVerified: true,
      eduEmail: 'j.miller@university.edu'
    },
    location: 'West Apartments Parking Lot',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=80', // Camping Tent
    isAvailable: true,
    deposit: 30.00,
    specs: ['Pre-attached poles for 60-second setup', 'WeatherTec system with welded floors', 'Fits a queen airbed', 'Includes packing duffel bag'],
    rentalsCount: 19
  },
  {
    id: 'prac-3',
    title: 'Professional Household Toolkit (130-Piece)',
    category: 'practical',
    description: 'Assemble your IKEA furniture or handle small repairs. Contains hammer, wrenches, sockets, screwdriver, and level.',
    pricePerDay: 3.00,
    condition: 'Good',
    owner: {
      name: 'Sam Peterson',
      avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.6,
      reviewsCount: 22,
      isVerified: true,
      eduEmail: 's.peterson@university.edu'
    },
    location: 'East Hall Common Room',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=600&auto=format&fit=crop&q=80', // Tools
    isAvailable: true,
    deposit: 15.00,
    specs: ['Chrome vanadium steel tools', 'Heavy-duty plastic storage case', 'Precision drivers for tech electronics', 'Includes standard utility blade'],
    rentalsCount: 35
  },
  {
    id: 'prac-4',
    title: 'Official Spikeball Standard Set',
    category: 'practical',
    description: 'A must-have for sunny days on the campus lawn. Includes foldable leg ring, net, 3 balls, ball pump, and backpack storage.',
    pricePerDay: 4.00,
    condition: 'Excellent',
    owner: {
      name: 'Zack Evans',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces&q=80',
      rating: 4.9,
      reviewsCount: 28,
      isVerified: true,
      eduEmail: 'z.evans@university.edu'
    },
    location: 'Athletic Quad / Grass Fields',
    isPlatformOwned: false,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80', // Game/Sports adjacent (Controller/Fun)
    isAvailable: true,
    deposit: 15.00,
    specs: ['Spikeball net ring (foldable)', '3 standard spikeballs included', 'Manual pressure gauge pump', 'Over-the-shoulder cinch backpack'],
    rentalsCount: 52
  }
];

export const INITIAL_FAQS = [
  {
    question: "How do I know the items are clean and safe?",
    answer: "Every peer lender is backed by .edu verification and user ratings. For peer transactions, borrowers inspect items upon meeting. Platform-owned items (marked as CampuShare Hub) are professionally cleaned, sterilized, and tested between every single use."
  },
  {
    question: "What happens if I accidentally damage or lose an item?",
    answer: "No panic! Standard rentals include basic verification, but our 'Campus Pass' and 'Elite Scholar' subscriptions automatically waive platform dispute fees and cover up to $50 and premium value respectively in accidental damage. Always report damages promptly through your Dashboard."
  },
  {
    question: "Where are the designated safe-zones for meeting up?",
    answer: "We designate well-lit, camera-monitored, busy places on campus as safe-zones. Popular locations include the Science Library Lobby, Student Union Main Quad, and the CampuShare Locker Hub next to the campus bookstore."
  },
  {
    question: "How does the security deposit work?",
    answer: "A fully refundable deposit is authorized on your card when you rent an item. The funds are held safely by our platform and automatically released back to you immediately after the lender verifies the item is returned in its original condition."
  },
  {
    question: "Can I list items to make money?",
    answer: "Yes, absolutely! College students save an average of $250/semester and make up to $1,200/year by listing items they only use occasionally (e.g. DSLR cameras, suits, camping tents, heavy calculators)."
  }
];
