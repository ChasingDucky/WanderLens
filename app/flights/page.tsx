'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FlightCard from '@/components/FlightCard';
import PriceTrendChart from '@/components/PriceTrendChart';
import { mockFlights, generatePriceTrend } from '@/lib/mockData';
import { Flight } from '@/types';
import { SlidersHorizontal, ArrowUpDown, Lightbulb, X } from 'lucide-react';

interface FlightFilters {
  maxPrice: number;
  stops: string[];
  airlines: string[];
  departureTime: string[];
  travelClass: string[];
}

function FlightSearchContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';

  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating'>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const [filters, setFilters] = useState<FlightFilters>({
    maxPrice: 5000,
    stops: [],
    airlines: [],
    departureTime: [],
    travelClass: [],
  });

  // Get unique airlines from mock data
  const uniqueAirlines = Array.from(new Set(mockFlights.map(f => f.airline)));

  // Filter flights based on search params and filters
  const filteredFlights = mockFlights.filter((flight) => {
    if (origin && !flight.origin.toLowerCase().includes(origin.toLowerCase())) return false;
    if (destination && !flight.destination.toLowerCase().includes(destination.toLowerCase())) return false;

    // Price filter
    if (flight.price > filters.maxPrice) return false;

    // Stops filter
    if (filters.stops.length > 0) {
      const flightStops = flight.stops === 0 ? 'nonstop' : flight.stops === 1 ? '1stop' : '2plus';
      if (!filters.stops.includes(flightStops)) return false;
    }

    // Airlines filter
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;

    // Departure time filter
    if (filters.departureTime.length > 0) {
      const depHour = new Date(flight.departure).getHours();
      let timeSlot = '';
      if (depHour >= 0 && depHour < 6) timeSlot = 'night';
      else if (depHour >= 6 && depHour < 12) timeSlot = 'morning';
      else if (depHour >= 12 && depHour < 18) timeSlot = 'afternoon';
      else timeSlot = 'evening';
      if (!filters.departureTime.includes(timeSlot)) return false;
    }

    // Travel class filter - map display names to cabinClass values
    if (filters.travelClass.length > 0) {
      const classMap: Record<string, string> = {
        'Economy': 'economy',
        'Premium Economy': 'premium-economy',
        'Business': 'business',
        'First Class': 'first'
      };
      const matchesClass = filters.travelClass.some(filterClass =>
        classMap[filterClass] === flight.cabinClass
      );
      if (!matchesClass) return false;
    }

    return true;
  });

  const toggleFilter = (category: keyof FlightFilters, value: any) => {
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
      maxPrice: 5000,
      stops: [],
      airlines: [],
      departureTime: [],
      travelClass: [],
    });
  };

  const activeFilterCount =
    filters.stops.length +
    filters.airlines.length +
    filters.departureTime.length +
    filters.travelClass.length +
    (filters.maxPrice < 5000 ? 1 : 0);

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
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

  // Generate price trend for the average price
  const averagePrice = sortedFlights.reduce((sum, f) => sum + f.price, 0) / sortedFlights.length || 850;
  const priceTrend = generatePriceTrend(averagePrice);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {origin && destination ? `Flights from ${origin} to ${destination}` : 'Flight Search Results'}
          </h1>
          <p className="text-gray-600">
            Found {sortedFlights.length} flight{sortedFlights.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Max Price: ${filters.maxPrice}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>$0</span>
                      <span>$5000</span>
                    </div>
                  </div>

                  {/* Stops */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Stops</label>
                    <div className="space-y-2">
                      {[
                        { value: 'nonstop', label: 'Non-stop' },
                        { value: '1stop', label: '1 Stop' },
                        { value: '2plus', label: '2+ Stops' },
                      ].map(option => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.stops.includes(option.value)}
                            onChange={() => toggleFilter('stops', option.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Airlines */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Airlines</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uniqueAirlines.map(airline => (
                        <label key={airline} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.airlines.includes(airline)}
                            onChange={() => toggleFilter('airlines', airline)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{airline}</span>
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

                  {/* Travel Class */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Travel Class</label>
                    <div className="space-y-2">
                      {['Economy', 'Premium Economy', 'Business', 'First Class'].map(tClass => (
                        <label key={tClass} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.travelClass.includes(tClass)}
                            onChange={() => toggleFilter('travelClass', tClass)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{tClass}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Recommendation Banner */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-4 flex items-start space-x-3">
              <Lightbulb className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Smart Recommendation</h3>
                <p className="text-sm text-gray-700">
                  Based on price trends, we recommend booking within the next 3-5 days. Prices are expected to increase by 8-12% next week.
                </p>
              </div>
            </div>

            {/* Flight List */}
            {sortedFlights.length > 0 ? (
              <div className="space-y-4">
                {sortedFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={setSelectedFlight}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600">No flights found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Trend */}
            <PriceTrendChart data={priceTrend} />

            {/* Eco Tips */}
            <div className="card bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold text-emerald-900 mb-3">Eco-Friendly Tips</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Choose non-stop flights when possible</li>
                <li>• Look for newer aircraft models</li>
                <li>• Consider carbon offset programs</li>
                <li>• Pack light to reduce fuel consumption</li>
              </ul>
            </div>

            {/* Travel Tips */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Travel Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Book 6-8 weeks in advance for best prices</li>
                <li>✓ Tuesday and Wednesday are cheapest days</li>
                <li>✓ Clear your browser cookies before booking</li>
                <li>✓ Join airline loyalty programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchContent />
    </Suspense>
  );
}
