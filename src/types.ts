export type ItemCategory = 'academic' | 'tech' | 'events' | 'practical';

export interface Owner {
  name: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  eduEmail: string;
}

export interface Item {
  id: string;
  title: string;
  category: ItemCategory;
  description: string;
  pricePerDay: number;
  condition: 'Like New' | 'Excellent' | 'Good' | 'Fair';
  owner: Owner;
  location: string;
  isPlatformOwned: boolean;
  imageUrl: string;
  isAvailable: boolean;
  deposit: number;
  specs: string[];
  rentalsCount: number;
}

export interface Rental {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: 'active' | 'completed' | 'pending';
  ownerName: string;
  pickupLocation: string;
}

export interface WaitlistEntry {
  email: string;
  signupDate: string;
  membershipTier: 'starter' | 'campus-pass' | 'elite-scholar';
}

export type MembershipTier = 'starter' | 'campus-pass' | 'elite-scholar';

export interface UserSession {
  email: string | null;
  tier: MembershipTier;
  listedItems: Item[];
  rentals: Rental[];
}
