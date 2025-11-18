'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HotelCard from '@/components/HotelCard';
import { mockHotels } from '@/lib/mockData';
import { Hotel } from '@/types';
import { SlidersHorizontal, ArrowUpDown, Award, TrendingDown } from 'lucide-react';

interface HotelFilters {
  maxPrice: number;
  minStars: number;
  minRating: number;
  maxDistance: number;
  amenities: string[];
}

function HotelSearchContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';

  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const [filters, setFilters] = useState<HotelFilters>({
    maxPrice: 1000,
    minStars: 0,
    minRating: 0,
    maxDistance: 20,
    amenities: [],
  });

  // Get all unique amenities
  const allAmenities = Array.from(
    new Set(mockHotels.flatMap(hotel => hotel.amenities))
  ).sort();

  // Common amenities to show first
  const popularAmenities = ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Parking', 'Room Service', 'Bar'];

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      maxPrice: 1000,
      minStars: 0,
      minRating: 0,
      maxDistance: 20,
      amenities: [],
    });
  };

  // Filter hotels
  const filteredHotels = mockHotels.filter((hotel) => {
    if (city && !hotel.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (hotel.price > filters.maxPrice) return false;
    if (hotel.stars < filters.minStars) return false;
    if (hotel.reviewScore < filters.minRating) return false;
    if (hotel.distanceToCenter > filters.maxDistance) return false;

    // Check amenities
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        hotel.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  const activeFilterCount =
    (filters.maxPrice < 1000 ? 1 : 0) +
    (filters.minStars > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxDistance < 20 ? 1 : 0) +
    filters.amenities.length;

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.reviewScore - a.reviewScore;
      case 'distance':
        return a.distanceToCenter - b.distanceToCenter;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {city ? `Hotels in ${city}` : 'Hotel Search Results'}
          </h1>
          <p className="text-gray-600">
            Found {sortedHotels.length} hotel{sortedHotels.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Max Price: {filters.maxPrice === 1000 ? '$1000+' : `$${filters.maxPrice}`}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>$50</span>
                  <span>$1000+</span>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Star Rating
                </label>
                <div className="space-y-2">
                  {[0, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setFilters(prev => ({ ...prev, minStars: stars }))}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        filters.minStars === stars
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {stars === 0 ? 'All Hotels' : `${stars}+ Stars`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Score Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Minimum Review Score: {filters.minRating === 0 ? 'Any' : filters.minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Any</span>
                  <span>10.0</span>
                </div>
              </div>

              {/* Distance Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Max Distance to Center: {filters.maxDistance === 20 ? '20+ km' : `${filters.maxDistance} km`}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={filters.maxDistance}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 km</span>
                  <span>20+ km</span>
                </div>
              </div>

              {/* Amenities Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Amenities {filters.amenities.length > 0 && `(${filters.amenities.length})`}
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {popularAmenities.filter(a => allAmenities.includes(a)).map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Controls */}
            <div className="flex items-center justify-between card">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="price">Lowest Price</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Closest to Center</option>
              </select>
            </div>

            {/* Best Deal Banner */}
            {sortedHotels.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Great Value!</h3>
                  <p className="text-sm text-gray-700">
                    We found {sortedHotels.filter(h => h.price < 200).length} hotels under $200/night with ratings above 8.0
                  </p>
                </div>
              </div>
            )}

            {/* Hotel List */}
            {sortedHotels.length > 0 ? (
              <div className="space-y-4">
                {sortedHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onSelect={setSelectedHotel}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600">No hotels found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HotelSearchContent />
    </Suspense>
  );
}
