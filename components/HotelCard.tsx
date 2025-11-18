'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Hotel } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { toggleHotelFavorite, isHotelFavorite } from '@/lib/favorites';
import { MapPin, Star, Heart } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  onSelect?: (hotel: Hotel) => void;
}

export default function HotelCard({ hotel, onSelect }: HotelCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isHotelFavorite(hotel.id));
  }, [hotel.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleHotelFavorite(hotel.id);
    setIsFavorite(newState);
  };

  const handleCardClick = () => {
    router.push(`/hotels/${hotel.id}`);
  };

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 9.0) return 'bg-green-600';
    if (score >= 8.0) return 'bg-blue-600';
    if (score >= 7.0) return 'bg-yellow-600';
    return 'bg-orange-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9.0) return 'Exceptional';
    if (score >= 8.0) return 'Excellent';
    if (score >= 7.0) return 'Very Good';
    return 'Good';
  };

  return (
    <div className="card hover:shadow-lg transition-shadow p-0 overflow-hidden cursor-pointer" onClick={handleCardClick}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hotel Image */}
        <div className="md:col-span-1 h-64 md:h-auto relative overflow-hidden">
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg shadow-lg">
            <div className="flex items-center space-x-1">
              {renderStars(hotel.stars)}
            </div>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Hotel Info */}
        <div className="md:col-span-2 p-6 md:pl-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{hotel.city}, {hotel.country}</span>
                </div>
                <p className="text-sm text-gray-600">{hotel.distanceToCenter.toFixed(1)} km from city center</p>
              </div>

              {/* Review Score */}
              <div className="text-right">
                <div className={`${getScoreColor(hotel.reviewScore)} text-white px-3 py-2 rounded-lg mb-1`}>
                  <span className="text-lg font-bold">{hotel.reviewScore.toFixed(1)}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{getScoreLabel(hotel.reviewScore)}</p>
                <p className="text-xs text-gray-600">{hotel.reviewCount.toLocaleString()} reviews</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 5).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 5 && (
                <span className="text-xs text-gray-600 px-2 py-1">
                  +{hotel.amenities.length - 5} more
                </span>
              )}
            </div>

            {/* Price and Action */}
            <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(hotel.price, hotel.currency)}
                </p>
                <p className="text-sm text-gray-600">per night</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(hotel);
                }}
                className="btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
