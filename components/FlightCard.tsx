'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flight } from '@/types';
import { formatCurrency, formatDuration, formatTime, getAirportName, getCabinClassLabel } from '@/lib/utils';
import { toggleFlightFavorite, isFlightFavorite } from '@/lib/favorites';
import { Plane, Clock, Leaf, Heart, ChevronRight } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
  badges?: string[];
}

export default function FlightCard({ flight, onSelect, badges = [] }: FlightCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const getBadgeConfig = (badge: string) => {
    switch (badge) {
      case 'cheapest':
        return { label: '💰 Cheapest', color: 'bg-green-500 text-white' };
      case 'fastest':
        return { label: '⚡ Fastest', color: 'bg-blue-500 text-white' };
      case 'best-value':
        return { label: '⭐ Best Value', color: 'bg-amber-500 text-white' };
      default:
        return null;
    }
  };

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

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>

          <button
            onClick={handleFavoriteClick}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge) => {
              const config = getBadgeConfig(badge);
              if (!config) return null;
              return (
                <span
                  key={badge}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.color} shadow-md`}
                >
                  {config.label}
                </span>
              );
            })}
          </div>
        )}

        {/* Route */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <p className="text-3xl font-bold text-gray-900">{formatTime(flight.departure)}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{flight.origin}</p>
            <p className="text-xs text-gray-500">{getAirportName(flight.origin)}</p>
          </div>

          <div className="flex-1 px-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center w-full mb-1">
                <div className="h-px bg-gray-300 flex-1"></div>
                <Plane className="w-4 h-4 text-gray-400 mx-2" />
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <p className="text-xs text-gray-500 whitespace-nowrap">{formatDuration(flight.duration)}</p>
              <p className="text-xs text-gray-400">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <div className="flex-1 text-right">
            <p className="text-3xl font-bold text-gray-900">{formatTime(flight.arrival)}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{flight.destination}</p>
            <p className="text-xs text-gray-500">{getAirportName(flight.destination)}</p>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{getCabinClassLabel(flight.cabinClass)}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Leaf className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">{flight.carbonEmission}kg CO₂</span>
            </div>

            <div className="inline-flex items-center px-2 py-1 bg-green-50 rounded-lg">
              <span className="text-sm font-semibold text-green-700">{flight.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(flight.price, flight.currency)}
              </p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
