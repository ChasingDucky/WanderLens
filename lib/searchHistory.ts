// Search history management

export interface FlightSearch {
  id: string;
  origin: string;
  destination: string;
  departDate?: string;
  returnDate?: string;
  passengers?: number;
  timestamp: number;
}

export interface HotelSearch {
  id: string;
  city: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  timestamp: number;
}

export interface SearchHistory {
  flights: FlightSearch[];
  hotels: HotelSearch[];
}

const STORAGE_KEY = 'wanderlens_search_history';
const MAX_HISTORY_ITEMS = 10;

export function getSearchHistory(): SearchHistory {
  if (typeof window === 'undefined') {
    return { flights: [], hotels: [] };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { flights: [], hotels: [] };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { flights: [], hotels: [] };
  }
}

function saveSearchHistory(history: SearchHistory): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function addFlightSearch(search: Omit<FlightSearch, 'id' | 'timestamp'>): void {
  const history = getSearchHistory();

  const newSearch: FlightSearch = {
    ...search,
    id: `flight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };

  // Remove duplicates
  history.flights = history.flights.filter(
    s => !(s.origin === search.origin && s.destination === search.destination)
  );

  // Add to beginning
  history.flights.unshift(newSearch);

  // Keep only last N items
  history.flights = history.flights.slice(0, MAX_HISTORY_ITEMS);

  saveSearchHistory(history);
}

export function addHotelSearch(search: Omit<HotelSearch, 'id' | 'timestamp'>): void {
  const history = getSearchHistory();

  const newSearch: HotelSearch = {
    ...search,
    id: `hotel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };

  // Remove duplicates
  history.hotels = history.hotels.filter(s => s.city !== search.city);

  // Add to beginning
  history.hotels.unshift(newSearch);

  // Keep only last N items
  history.hotels = history.hotels.slice(0, MAX_HISTORY_ITEMS);

  saveSearchHistory(history);
}

export function removeFlightSearch(id: string): void {
  const history = getSearchHistory();
  history.flights = history.flights.filter(s => s.id !== id);
  saveSearchHistory(history);
}

export function removeHotelSearch(id: string): void {
  const history = getSearchHistory();
  history.hotels = history.hotels.filter(s => s.id !== id);
  saveSearchHistory(history);
}

export function clearFlightHistory(): void {
  const history = getSearchHistory();
  history.flights = [];
  saveSearchHistory(history);
}

export function clearHotelHistory(): void {
  const history = getSearchHistory();
  history.hotels = [];
  saveSearchHistory(history);
}

export function clearAllHistory(): void {
  saveSearchHistory({ flights: [], hotels: [] });
}

export function formatSearchDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}
