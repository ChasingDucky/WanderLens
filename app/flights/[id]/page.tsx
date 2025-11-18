'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { mockFlights } from '@/lib/mockData';
import { formatCurrency, formatDuration, formatTime, formatDate, getAirportName, getCabinClassLabel } from '@/lib/utils';
import {
  Plane,
  Clock,
  Calendar,
  Users,
  Luggage,
  Wifi,
  Coffee,
  Monitor,
  Utensils,
  MapPin,
  TrendingUp,
  Leaf,
  ArrowLeft,
  Star
} from 'lucide-react';

export default function FlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const flight = mockFlights.find(f => f.id === id);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Not Found</h1>
          <button onClick={() => router.back()} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const amenities = [
    { icon: Wifi, name: 'WiFi', available: true },
    { icon: Coffee, name: 'Refreshments', available: true },
    { icon: Monitor, name: 'Entertainment', available: true },
    { icon: Utensils, name: 'Meal Service', available: flight.cabinClass !== 'economy' },
    { icon: Luggage, name: 'Checked Bag', available: flight.cabinClass !== 'economy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to results</span>
        </button>

        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{flight.airline}</h1>
              <p className="text-lg text-gray-600">Flight {flight.flightNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary-600">
                {formatCurrency(flight.price, flight.currency)}
              </p>
              <p className="text-gray-600">per person</p>
            </div>
          </div>

          {/* Flight Route */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatTime(flight.departure)}</p>
              <p className="text-lg font-medium text-gray-700">{getAirportName(flight.origin)}</p>
              <p className="text-sm text-gray-600">{flight.origin}</p>
              <p className="text-sm text-gray-500 mt-2">{formatDate(flight.departure)}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full">
                <div className="border-t-2 border-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                  <Plane className="w-6 h-6 text-primary-600 rotate-90" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{formatDuration(flight.duration)}</p>
              <p className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">{formatTime(flight.arrival)}</p>
              <p className="text-lg font-medium text-gray-700">{getAirportName(flight.destination)}</p>
              <p className="text-sm text-gray-600">{flight.destination}</p>
              <p className="text-sm text-gray-500 mt-2">{formatDate(flight.arrival)}</p>
            </div>
          </div>

          <button className="btn-primary w-full text-lg py-4">
            Book Now - {formatCurrency(flight.price, flight.currency)}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flight Details */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Flight Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class</p>
                    <p className="font-semibold text-gray-900">{getCabinClassLabel(flight.cabinClass)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">On-Time Performance</p>
                    <p className="font-semibold text-gray-900">{flight.onTimePerformance}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-gray-900">{flight.rating.toFixed(1)}/5.0</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Emissions</p>
                    <p className="font-semibold text-gray-900">{flight.carbonEmission} kg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Onboard Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div
                    key={amenity.name}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      amenity.available ? 'bg-green-50' : 'bg-gray-100'
                    }`}
                  >
                    <amenity.icon
                      className={`w-5 h-5 ${
                        amenity.available ? 'text-green-600' : 'text-gray-400'
                      }`}
                    />
                    <span className={amenity.available ? 'text-gray-900' : 'text-gray-500'}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baggage Policy */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Baggage Policy</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Luggage className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Carry-on Bag</p>
                    <p className="text-sm text-gray-600">1 bag (max 10 kg) included</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Luggage className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Checked Baggage</p>
                    <p className="text-sm text-gray-600">
                      {flight.cabinClass === 'economy'
                        ? '1 bag (max 23 kg) - $35 fee'
                        : '2 bags (max 23 kg each) included'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Price Breakdown */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-medium">{formatCurrency(flight.price * 0.8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">{formatCurrency(flight.price * 0.2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(flight.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Why Book This Flight */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Why Book This Flight?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ {flight.onTimePerformance}% on-time arrival rate</li>
                <li>✓ Highly rated by passengers ({flight.rating}/5)</li>
                <li>✓ {flight.stops === 0 ? 'Direct flight - no layovers' : 'Competitive pricing'}</li>
                <li>✓ Flexible booking options available</li>
              </ul>
            </div>

            {/* Environmental Impact */}
            <div className="card bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Environmental Impact</h3>
              <p className="text-sm text-gray-700 mb-3">
                This flight will emit approximately {flight.carbonEmission} kg of CO₂.
              </p>
              <button className="text-sm text-emerald-700 font-semibold hover:text-emerald-800">
                Offset your carbon footprint →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
