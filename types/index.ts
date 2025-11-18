// Core types for WanderLens

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  duration: number; // in minutes
  price: number;
  currency: string;
  stops: number;
  cabinClass: 'economy' | 'premium-economy' | 'business' | 'first';
  rating: number;
  onTimePerformance: number; // percentage
  carbonEmission: number; // kg CO2
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  rating: number;
  stars: number;
  price: number;
  currency: string;
  amenities: string[];
  images: string[];
  distanceToCenter: number; // in km
  reviewScore: number;
  reviewCount: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  popularityScore: number;
  averageTemperature: number;
  bestMonths: string[];
}

export interface Itinerary {
  id: string;
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  restaurants?: Restaurant[];
  trains?: Train[];
  totalCost: number;
  currency: string;
  aiGenerated?: boolean;
  bundleDiscount?: number; // percentage discount for AI bundles
  editable?: boolean;
  tags?: string[];
}

export type MembershipTier = 'standard' | 'silver' | 'gold';

export interface MembershipBenefits {
  tier: MembershipTier;
  name: string;
  displayName: string;
  icon: string;
  color: string;
  aiModel: string;
  discount: number; // percentage
  bookingsRequired: number;
  benefits: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  membershipTier: MembershipTier;
  bookingsCount?: number; // total completed bookings
  preferences?: {
    budgetRange?: string; // e.g., "budget", "mid-range", "luxury"
    travelStyle?: string[]; // e.g., ["adventure", "culture", "relaxation"]
    cuisinePreferences?: string[];
    destinations?: string[];
  };
  travelHistory?: string[]; // past destinations
  joinedDate: Date;
}

export interface AIItineraryRequest {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget?: number;
  preferences?: {
    pace?: 'relaxed' | 'moderate' | 'packed';
    interests?: string[];
    mustHave?: string[]; // e.g., ["michelin-dining", "luxury-hotel"]
  };
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: 'sightseeing' | 'dining' | 'entertainment' | 'shopping' | 'adventure';
  duration: number; // in hours
  price: number;
  rating: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export type AgentType =
  | 'travel-planner'
  | 'destination-expert'
  | 'budget-optimizer'
  | 'culture-guide'
  | 'itinerary-optimizer'
  | 'travel-companion';

export interface AIAgent {
  id: AgentType;
  name: string;
  description: string;
  icon: string;
  systemPrompt: string;
  color: string;
  capabilities: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SearchParams {
  origin?: string;
  destination?: string;
  departDate?: string;
  returnDate?: string;
  passengers?: number;
  cabinClass?: string;
}

export interface PriceTrend {
  date: string;
  price: number;
  prediction?: boolean;
}

export interface Train {
  id: string;
  operator: string; // e.g., "SNCF", "DB", "JR East", "Amtrak"
  trainNumber: string;
  trainType: string; // e.g., "TGV", "ICE", "Shinkansen", "Regional"
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  duration: number; // in minutes
  price: number;
  currency: string;
  class: 'standard' | 'first' | 'business' | 'sleeper';
  amenities: string[]; // e.g., "WiFi", "Dining Car", "Power Outlets"
  seatAvailability: {
    window: number;
    aisle: number;
    total: number;
  };
  rating: number;
  onTimePerformance: number; // percentage
  carbonEmission: number; // kg CO2
  flexibleTicket: boolean; // can change without fee
  refundable: boolean;
}

export interface RailPass {
  id: string;
  name: string;
  region: string; // e.g., "Europe", "Japan", "Switzerland"
  operator: string; // e.g., "Eurail", "JR Group", "SBB"
  description: string;
  imageUrl: string;
  validityDays: number; // how many days the pass is valid
  travelDays: number; // how many days of travel included
  price: number;
  currency: string;
  ageCategory: 'adult' | 'youth' | 'senior' | 'child';
  class: 'first' | 'second';
  features: string[];
  countries: string[]; // countries covered
  benefits: string[]; // extra benefits like free museum entries
  restrictions: string[];
  rating: number;
  reviewCount: number;
  popular: boolean;
}

export interface MealPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // for showing discounts
  items: string[]; // list of dishes included
  servings: number; // number of people
  validDays: string[]; // e.g., ["Monday", "Tuesday", "Wednesday"]
  validTime?: string; // e.g., "Lunch only" or "Dinner only"
  popular?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // e.g., "Appetizers", "Main Course", "Desserts", "Drinks"
  imageUrl?: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  tags?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string; // e.g., "Japanese", "Italian", "French", "Chinese"
  address: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  priceLevel: number; // 1-4 ($ to $$$$)
  images: string[];
  description: string;
  specialties: string[]; // signature dishes
  amenities: string[]; // e.g., "WiFi", "Outdoor Seating", "Private Rooms"
  openingHours: {
    [key: string]: string; // e.g., "Monday": "11:00-22:00"
  };
  acceptsReservations: boolean;
  mealPackages: MealPackage[];
  averageMealPrice: number;
  location: {
    lat: number;
    lng: number;
  };
  tags: string[]; // e.g., "Romantic", "Family-friendly", "Michelin Star"
  // Delivery features (UberEats-style)
  offersDelivery: boolean;
  deliveryFee: number;
  deliveryTime: number; // estimated delivery time in minutes
  minimumOrder: number;
  freeDeliveryThreshold?: number; // free delivery above this amount
  menuItems?: MenuItem[]; // menu for delivery orders
}
