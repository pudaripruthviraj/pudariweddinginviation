export type Language = 'en' | 'te';

export interface EventItem {
  id: string;
  titleEn: string;
  titleTe: string;
  dateStrEn: string;
  dateStrTe: string;
  timeEn: string;
  timeTe: string;
  venueEn: string;
  venueTe: string;
  descriptionEn: string;
  descriptionTe: string;
  significanceEn: string;
  significanceTe: string;
  attireEn: string;
  attireTe: string;
  category: 'pre-wedding' | 'ceremony' | 'reception';
  icon: string;
}

export interface GuestRsvp {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  guestCount: number;
  attendingEvents: string[]; // event ids
  dietaryPreference: 'pure-veg' | 'telangana-traditional' | 'jain' | 'no-preference';
  accommodationNeeded: boolean;
  transportAssistance: boolean;
  travelDetails?: string;
  personalNote?: string;
  status: 'confirmed' | 'tentative' | 'declined';
  tableId?: string;
  createdAt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relation: string;
  message: string;
  language: 'en' | 'te';
  likes: number;
  timestamp: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  captionEn: string;
  captionTe: string;
  category: 'couple' | 'haldi' | 'rituals' | 'moments' | 'guest-uploads';
  uploaderName?: string;
  timestamp?: string;
}

export interface RegistryItem {
  id: string;
  titleEn: string;
  titleTe: string;
  categoryEn: string;
  categoryTe: string;
  priceEstimate: number;
  claimed: boolean;
  claimedBy?: string;
  externalLink?: string;
  upiOption?: boolean;
  descriptionEn: string;
  descriptionTe: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  itemEn: string;
  itemTe: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  vendorNotes: string;
}

export interface SeatingTable {
  id: string;
  nameEn: string;
  nameTe: string;
  capacity: number;
  zone: 'vip-mandapam' | 'groom-family' | 'bride-family' | 'friends' | 'dining-hall';
  assignedGuestIds: string[];
}
