'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FlightCard from '@/components/FlightCard';
import PriceTrendChart from '@/components/PriceTrendChart';
import { mockFlights, generatePriceTrend } from '@/lib/mockData';
import { Flight } from '@/types';
import { SlidersHorizontal, ArrowUpDown, Lightbulb } from 'lucide-react';

function FlightSearchContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';

  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating'>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // Filter flights based on search params
  const filteredFlights = mockFlights.filter((flight) => {
    if (origin && !flight.origin.toLowerCase().includes(origin.toLowerCase())) return false;
    if (destination && !flight.destination.toLowerCase().includes(destination.toLowerCase())) return false;
    return true;
  });

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
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="font-medium">Filters</span>
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
