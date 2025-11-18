'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HotelCard from '@/components/HotelCard';
import { mockHotels } from '@/lib/mockData';
import { Hotel } from '@/types';
import { SlidersHorizontal, ArrowUpDown, Award, TrendingDown } from 'lucide-react';

function HotelSearchContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';

  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minStars, setMinStars] = useState<number>(0);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Filter hotels
  const filteredHotels = mockHotels.filter((hotel) => {
    if (city && !hotel.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (hotel.price > maxPrice) return false;
    if (hotel.stars < minStars) return false;
    return true;
  });

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <div className="card sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: {maxPrice === 1000 ? '$1000+' : `$${maxPrice}`}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$50</span>
                  <span>$1000+</span>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Stars
                </label>
                <div className="space-y-2">
                  {[0, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setMinStars(stars)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        minStars === stars
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {stars === 0 ? 'All Hotels' : `${stars}+ Stars`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setMaxPrice(1000);
                  setMinStars(0);
                }}
                className="w-full btn-secondary text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
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
                  onClick={() => {
                    setMaxPrice(1000);
                    setMinStars(0);
                  }}
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
