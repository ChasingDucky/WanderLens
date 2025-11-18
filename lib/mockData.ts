import { Flight, Hotel, Destination, PriceTrend } from '@/types';

// Mock flight data
export const mockFlights: Flight[] = [
  {
    id: 'FL001',
    airline: 'United Airlines',
    flightNumber: 'UA889',
    origin: 'SFO',
    destination: 'NRT',
    departure: new Date('2025-12-15T10:30:00'),
    arrival: new Date('2025-12-16T14:45:00'),
    duration: 675,
    price: 850,
    currency: 'USD',
    stops: 0,
    cabinClass: 'economy',
    rating: 4.2,
    onTimePerformance: 82,
    carbonEmission: 920,
  },
  {
    id: 'FL002',
    airline: 'ANA',
    flightNumber: 'NH7',
    origin: 'SFO',
    destination: 'NRT',
    departure: new Date('2025-12-15T11:00:00'),
    arrival: new Date('2025-12-16T15:30:00'),
    duration: 690,
    price: 920,
    currency: 'USD',
    stops: 0,
    cabinClass: 'economy',
    rating: 4.5,
    onTimePerformance: 89,
    carbonEmission: 900,
  },
  {
    id: 'FL003',
    airline: 'Delta',
    flightNumber: 'DL283',
    origin: 'LAX',
    destination: 'CDG',
    departure: new Date('2025-12-20T18:00:00'),
    arrival: new Date('2025-12-21T14:30:00'),
    duration: 630,
    price: 1200,
    currency: 'USD',
    stops: 0,
    cabinClass: 'economy',
    rating: 4.3,
    onTimePerformance: 85,
    carbonEmission: 1050,
  },
  {
    id: 'FL004',
    airline: 'Emirates',
    flightNumber: 'EK215',
    origin: 'JFK',
    destination: 'DXB',
    departure: new Date('2025-12-18T22:30:00'),
    arrival: new Date('2025-12-19T19:45:00'),
    duration: 795,
    price: 1450,
    currency: 'USD',
    stops: 0,
    cabinClass: 'business',
    rating: 4.8,
    onTimePerformance: 91,
    carbonEmission: 1200,
  },
];

// Mock hotel data
export const mockHotels: Hotel[] = [
  {
    id: 'HT001',
    name: 'Grand Hyatt Tokyo',
    address: '6-10-3 Roppongi, Minato-ku',
    city: 'Tokyo',
    country: 'Japan',
    rating: 4.5,
    stars: 5,
    price: 280,
    currency: 'USD',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    distanceToCenter: 2.5,
    reviewScore: 8.9,
    reviewCount: 3420,
  },
  {
    id: 'HT002',
    name: 'Hotel Gracery Shinjuku',
    address: '1-19-1 Kabukicho, Shinjuku-ku',
    city: 'Tokyo',
    country: 'Japan',
    rating: 4.2,
    stars: 4,
    price: 180,
    currency: 'USD',
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Concierge'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    distanceToCenter: 1.2,
    reviewScore: 8.5,
    reviewCount: 2156,
  },
  {
    id: 'HT003',
    name: 'Hôtel Plaza Athénée',
    address: '25 Avenue Montaigne',
    city: 'Paris',
    country: 'France',
    rating: 4.8,
    stars: 5,
    price: 950,
    currency: 'USD',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Butler Service', 'Michelin Restaurant'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    distanceToCenter: 0.8,
    reviewScore: 9.4,
    reviewCount: 1876,
  },
  {
    id: 'HT004',
    name: 'Generator Paris',
    address: '9-11 Place du Colonel Fabien',
    city: 'Paris',
    country: 'France',
    rating: 3.9,
    stars: 3,
    price: 85,
    currency: 'USD',
    amenities: ['WiFi', 'Bar', 'Terrace', 'Lounge'],
    images: ['https://images.unsplash.com/photo-1455587734955-081b22074882'],
    distanceToCenter: 3.5,
    reviewScore: 7.8,
    reviewCount: 892,
  },
];

// Mock destination data
export const mockDestinations: Destination[] = [
  {
    id: 'DEST001',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis blending traditional culture with cutting-edge technology',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    popularityScore: 9.5,
    averageTemperature: 16,
    bestMonths: ['March', 'April', 'May', 'October', 'November'],
  },
  {
    id: 'DEST002',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, famous for art, fashion, gastronomy, and culture',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    popularityScore: 9.7,
    averageTemperature: 12,
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
  },
  {
    id: 'DEST003',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, rice terraces, and spiritual culture',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    popularityScore: 9.2,
    averageTemperature: 27,
    bestMonths: ['April', 'May', 'June', 'July', 'August', 'September'],
  },
  {
    id: 'DEST004',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, offering world-class dining, shopping, and entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    popularityScore: 9.6,
    averageTemperature: 13,
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
  },
  {
    id: 'DEST005',
    name: 'Dubai',
    country: 'UAE',
    description: 'Futuristic city with luxury shopping, ultramodern architecture, and desert adventures',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    popularityScore: 9.0,
    averageTemperature: 27,
    bestMonths: ['November', 'December', 'January', 'February', 'March'],
  },
  {
    id: 'DEST006',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Mediterranean gem with stunning architecture, beaches, and vibrant culture',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    popularityScore: 9.3,
    averageTemperature: 16,
    bestMonths: ['May', 'June', 'September', 'October'],
  },
];

// Mock price trend data generator
export const generatePriceTrend = (basePrice: number, days: number = 30): PriceTrend[] => {
  const trends: PriceTrend[] = [];
  const today = new Date();

  for (let i = -days; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    // Create realistic price fluctuation
    const variance = Math.sin(i / 7) * 100 + Math.random() * 80;
    const price = Math.round(basePrice + variance);

    trends.push({
      date: date.toISOString().split('T')[0],
      price,
      prediction: i > 0,
    });
  }

  return trends;
};

// Helper function to search flights
export const searchFlights = (origin?: string, destination?: string): Flight[] => {
  return mockFlights.filter(flight => {
    if (origin && !flight.origin.toLowerCase().includes(origin.toLowerCase())) return false;
    if (destination && !flight.destination.toLowerCase().includes(destination.toLowerCase())) return false;
    return true;
  });
};

// Helper function to search hotels
export const searchHotels = (city?: string, maxPrice?: number): Hotel[] => {
  return mockHotels.filter(hotel => {
    if (city && !hotel.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (maxPrice && hotel.price > maxPrice) return false;
    return true;
  });
};
