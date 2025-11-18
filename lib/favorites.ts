'use client';

import { Flight, Hotel } from '@/types';

const FAVORITES_KEY = 'wanderlens_favorites';

export interface Favorites {
  flights: string[];
  hotels: string[];
}

export function getFavorites(): Favorites {
  if (typeof window === 'undefined') {
    return { flights: [], hotels: [] };
  }

  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) {
    return { flights: [], hotels: [] };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { flights: [], hotels: [] };
  }
}

export function saveFavorites(favorites: Favorites): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFlightFavorite(flightId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.flights.indexOf(flightId);

  if (index > -1) {
    favorites.flights.splice(index, 1);
    saveFavorites(favorites);
    return false;
  } else {
    favorites.flights.push(flightId);
    saveFavorites(favorites);
    return true;
  }
}

export function toggleHotelFavorite(hotelId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.hotels.indexOf(hotelId);

  if (index > -1) {
    favorites.hotels.splice(index, 1);
    saveFavorites(favorites);
    return false;
  } else {
    favorites.hotels.push(hotelId);
    saveFavorites(favorites);
    return true;
  }
}

export function isFlightFavorite(flightId: string): boolean {
  const favorites = getFavorites();
  return favorites.flights.includes(flightId);
}

export function isHotelFavorite(hotelId: string): boolean {
  const favorites = getFavorites();
  return favorites.hotels.includes(hotelId);
}
