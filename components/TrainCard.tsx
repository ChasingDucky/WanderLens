'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Train } from '@/types';
import { formatCurrency, formatDuration, formatTime } from '@/lib/utils';
import { Train as TrainIcon, Clock, Leaf, Zap, CheckCircle, Armchair } from 'lucide-react';

interface TrainCardProps {
  train: Train;
}

export default function TrainCard({ train }: TrainCardProps) {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState<'window' | 'aisle' | null>(null);

  const handleBookClick = () => {
    router.push(`/booking?type=train&id=${train.id}`);
  };

  const seatAvailableTotal = train.seatAvailability.total;
  const seatPercentage = (seatAvailableTotal / 30) * 100; // Assuming 30 is max capacity

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrainIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{train.operator}</h3>
              <p className="text-sm text-gray-500">{train.trainType}</p>
              <p className="text-xs text-gray-400">{train.trainNumber}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-2 items-end">
            {train.onTimePerformance > 95 && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                <Zap className="w-3 h-3 mr-1" />
                {train.onTimePerformance}% On-Time
              </span>
            )}
            {train.flexibleTicket && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                Flexible
              </span>
            )}
            {train.refundable && (
              <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                Refundable
              </span>
            )}
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <p className="text-3xl font-bold text-gray-900">{formatTime(train.departure)}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{train.origin}</p>
          </div>

          <div className="flex-1 px-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center w-full mb-1">
                <div className="h-px bg-gray-300 flex-1"></div>
                <TrainIcon className="w-4 h-4 text-gray-400 mx-2" />
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <p className="text-xs text-gray-500 whitespace-nowrap">{formatDuration(train.duration)}</p>
              <p className="text-xs text-gray-400 capitalize">{train.class} Class</p>
            </div>
          </div>

          <div className="flex-1 text-right">
            <p className="text-3xl font-bold text-gray-900">{formatTime(train.arrival)}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{train.destination}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {train.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {amenity}
              </span>
            ))}
            {train.amenities.length > 4 && (
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                +{train.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Seat Selection */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Armchair className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-900">Seat Preference</span>
            </div>
            <span className="text-xs text-gray-600">{seatAvailableTotal} seats left</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => setSelectedSeat('window')}
              disabled={train.seatAvailability.window === 0}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedSeat === 'window'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : train.seatAvailability.window > 0
                    ? 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-400'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Window ({train.seatAvailability.window})
            </button>
            <button
              onClick={() => setSelectedSeat('aisle')}
              disabled={train.seatAvailability.aisle === 0}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedSeat === 'aisle'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : train.seatAvailability.aisle > 0
                    ? 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-400'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Aisle ({train.seatAvailability.aisle})
            </button>
          </div>

          {/* Seat Availability Indicator */}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  seatPercentage > 50 ? 'bg-green-500' : seatPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${seatPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {seatPercentage > 50 ? 'Good availability' : seatPercentage > 20 ? 'Limited seats' : 'Almost sold out'}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">On-time: {train.onTimePerformance}%</span>
            </div>

            <div className="flex items-center space-x-1">
              <Leaf className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">{train.carbonEmission}kg CO₂</span>
            </div>

            <div className="inline-flex items-center px-2 py-1 bg-green-50 rounded-lg">
              <span className="text-sm font-semibold text-green-700">{train.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(train.price, train.currency)}
              </p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <button
              onClick={handleBookClick}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
