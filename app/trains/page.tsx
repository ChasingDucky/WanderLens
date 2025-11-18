'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TrainCard from '@/components/TrainCard';
import { mockTrains } from '@/lib/mockData';
import { Train } from '@/types';
import { SlidersHorizontal, ArrowUpDown, Lightbulb, Train as TrainIcon } from 'lucide-react';

interface TrainFilters {
  maxPrice: number;
  trainClass: string[];
  operators: string[];
  amenities: string[];
  departureTime: string[];
}

function TrainSearchContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';

  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating'>('price');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<TrainFilters>({
    maxPrice: 200,
    trainClass: [],
    operators: [],
    amenities: [],
    departureTime: [],
  });

  // Get unique operators
  const uniqueOperators = Array.from(new Set(mockTrains.map(t => t.operator)));

  // Filter trains
  const filteredTrains = mockTrains.filter((train) => {
    if (origin && !train.origin.toLowerCase().includes(origin.toLowerCase())) return false;
    if (destination && !train.destination.toLowerCase().includes(destination.toLowerCase())) return false;
    if (train.price > filters.maxPrice) return false;
    if (filters.trainClass.length > 0 && !filters.trainClass.includes(train.class)) return false;
    if (filters.operators.length > 0 && !filters.operators.includes(train.operator)) return false;

    if (filters.departureTime.length > 0) {
      const depHour = new Date(train.departure).getHours();
      let timeSlot = '';
      if (depHour >= 0 && depHour < 6) timeSlot = 'night';
      else if (depHour >= 6 && depHour < 12) timeSlot = 'morning';
      else if (depHour >= 12 && depHour < 18) timeSlot = 'afternoon';
      else timeSlot = 'evening';
      if (!filters.departureTime.includes(timeSlot)) return false;
    }

    return true;
  });

  // Sort trains
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return a.duration - b.duration;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const toggleFilter = (category: keyof TrainFilters, value: any) => {
    setFilters(prev => {
      const current = prev[category];
      if (Array.isArray(current)) {
        const newArray = current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value];
        return { ...prev, [category]: newArray };
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      maxPrice: 200,
      trainClass: [],
      operators: [],
      amenities: [],
      departureTime: [],
    });
  };

  const activeFilterCount =
    filters.trainClass.length +
    filters.operators.length +
    filters.amenities.length +
    filters.departureTime.length +
    (filters.maxPrice < 200 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {origin && destination ? `Trains from ${origin} to ${destination}` : 'Train Search Results'}
          </h1>
          <p className="text-gray-600">
            Found {sortedTrains.length} train{sortedTrains.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="font-medium">
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </span>
              </button>

              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-5 h-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="price">Lowest Price</option>
                  <option value="duration">Shortest Duration</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Filter Results</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Max Price: ${filters.maxPrice}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="10"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>

                  {/* Train Class */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Travel Class</label>
                    <div className="space-y-2">
                      {['standard', 'first', 'business', 'sleeper'].map(tClass => (
                        <label key={tClass} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.trainClass.includes(tClass)}
                            onChange={() => toggleFilter('trainClass', tClass)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">{tClass}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Operators */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Train Operators</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uniqueOperators.map(operator => (
                        <label key={operator} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.operators.includes(operator)}
                            onChange={() => toggleFilter('operators', operator)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{operator}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Departure Time */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Departure Time</label>
                    <div className="space-y-2">
                      {[
                        { value: 'morning', label: 'Morning (6AM - 12PM)' },
                        { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
                        { value: 'evening', label: 'Evening (6PM - 12AM)' },
                        { value: 'night', label: 'Night (12AM - 6AM)' },
                      ].map(option => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.departureTime.includes(option.value)}
                            onChange={() => toggleFilter('departureTime', option.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Eco Benefits Banner */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Eco-Friendly Travel</h3>
                <p className="text-sm text-gray-700">
                  Trains produce up to 80% less CO₂ than flying. Choose train travel for a greener journey!
                </p>
              </div>
            </div>

            {/* Train List */}
            {sortedTrains.length > 0 ? (
              <div className="space-y-4">
                {sortedTrains.map((train) => (
                  <TrainCard key={train.id} train={train} />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600">No trains found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Rail Pass Promotion */}
            <div className="card bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <TrainIcon className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-purple-900">Save with Rail Passes</h3>
              </div>
              <p className="text-sm text-purple-800 mb-4">
                Planning multiple train journeys? Unlimited travel passes can save you up to 50%!
              </p>
              <a
                href="/rail-passes"
                className="btn-primary w-full text-center block"
              >
                Explore Rail Passes
              </a>
            </div>

            {/* Travel Tips */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Train Travel Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Book early for best prices</li>
                <li>✓ Arrive 15-30 minutes before departure</li>
                <li>✓ Validate tickets before boarding</li>
                <li>✓ Check for seat reservation requirements</li>
                <li>✓ Consider flexible tickets for changes</li>
              </ul>
            </div>

            {/* Amenities Guide */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Onboard Amenities</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📶</span>
                  <span>WiFi - Stay connected onboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔌</span>
                  <span>Power Outlets - Charge your devices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🍽️</span>
                  <span>Dining Car - Meals and refreshments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🛏️</span>
                  <span>Reclining Seats - Extra comfort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrainsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrainSearchContent />
    </Suspense>
  );
}
