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
  totalCost: number;
  currency: string;
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
