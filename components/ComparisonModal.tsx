'use client';

import { Flight, Hotel } from '@/types';
import { X, Check, Minus } from 'lucide-react';
import { formatCurrency, formatDuration, formatTime, getCabinClassLabel } from '@/lib/utils';

interface ComparisonModalProps {
  items: (Flight | Hotel)[];
  type: 'flight' | 'hotel';
  onClose: () => void;
}

export default function ComparisonModal({ items, type, onClose }: ComparisonModalProps) {
  if (items.length === 0) return null;

  const isFlights = type === 'flight';
  const flights = items as Flight[];
  const hotels = items as Hotel[];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Compare {isFlights ? 'Flights' : 'Hotels'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {isFlights ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flights.map((flight) => (
                <div key={flight.id} className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{flight.airline}</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="font-bold text-primary-600">
                        {formatCurrency(flight.price, flight.currency)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{formatDuration(flight.duration)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure</span>
                      <span className="font-medium">{formatTime(flight.departure)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival</span>
                      <span className="font-medium">{formatTime(flight.arrival)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Stops</span>
                      <span className="font-medium">
                        {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Class</span>
                      <span className="font-medium">{getCabinClassLabel(flight.cabinClass)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">{flight.rating.toFixed(1)}/5</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">On-time %</span>
                      <span className="font-medium">{flight.onTimePerformance}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">CO₂ Emission</span>
                      <span className="font-medium">{flight.carbonEmission} kg</span>
                    </div>
                  </div>

                  <button className="btn-primary w-full mt-4">
                    Select Flight
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{hotel.name}</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="font-bold text-primary-600">
                        {formatCurrency(hotel.price, hotel.currency)}/night
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Stars</span>
                      <span className="font-medium">{hotel.stars} ⭐</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Review Score</span>
                      <span className="font-medium">{hotel.reviewScore.toFixed(1)}/10</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviews</span>
                      <span className="font-medium">{hotel.reviewCount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">{hotel.distanceToCenter.toFixed(1)} km</span>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-600 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary w-full mt-4">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
