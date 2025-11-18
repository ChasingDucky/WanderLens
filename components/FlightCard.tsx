'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flight } from '@/types';
import { formatCurrency, formatDuration, formatTime, getAirportName, getCabinClassLabel } from '@/lib/utils';
import { toggleFlightFavorite, isFlightFavorite } from '@/lib/favorites';
import { Plane, Clock, Leaf, TrendingUp, Heart } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isFlightFavorite(flight.id));
  }, [flight.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleFlightFavorite(flight.id);
    setIsFavorite(newState);
  };

  const handleCardClick = () => {
    router.push(`/flights/${flight.id}`);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-50';
    if (rating >= 4.0) return 'text-blue-600 bg-blue-50';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 85) return 'text-green-600';
    if (performance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Flight Info */}
        <div className="flex-1 space-y-4">
          {/* Airline and Flight Number */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleFavoriteClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{flight.airline}</h3>
                <p className="text-sm text-gray-600">{flight.flightNumber}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full ${getRatingColor(flight.rating)}`}>
              <span className="text-sm font-semibold">{flight.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Route and Times */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatTime(flight.departure)}</p>
              <p className="text-sm text-gray-600">{getAirportName(flight.origin)}</p>
              <p className="text-xs text-gray-500">{flight.origin}</p>
            </div>

            <div className="flex-1 px-6">
              <div className="relative">
                <div className="border-t-2 border-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                  <Plane className="w-5 h-5 text-primary-600 rotate-90" />
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">{formatDuration(flight.duration)}</p>
                <p className="text-xs text-gray-500">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatTime(flight.arrival)}</p>
              <p className="text-sm text-gray-600">{getAirportName(flight.destination)}</p>
              <p className="text-xs text-gray-500">{flight.destination}</p>
            </div>
          </div>

          {/* Flight Details */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>{getCabinClassLabel(flight.cabinClass)}</span>
            </div>
            <div className={`flex items-center ${getPerformanceColor(flight.onTimePerformance)}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{flight.onTimePerformance}% on-time</span>
            </div>
            <div className="flex items-center text-emerald-600">
              <Leaf className="w-4 h-4 mr-1" />
              <span>{flight.carbonEmission} kg CO₂</span>
            </div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="lg:text-right space-y-3">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(flight.price, flight.currency)}
            </p>
            <p className="text-sm text-gray-600">per person</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(flight);
            }}
            className="btn-primary w-full lg:w-auto"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
