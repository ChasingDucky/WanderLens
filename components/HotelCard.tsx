'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Hotel } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { toggleHotelFavorite, isHotelFavorite } from '@/lib/favorites';
import { MapPin, Star, Heart, Wifi, Coffee, Dumbbell } from 'lucide-react';

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

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, any> = {
      WiFi: Wifi,
      Restaurant: Coffee,
      Gym: Dumbbell,
    };
    return iconMap[amenity] || null;
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          className="object-cover"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow transition-shadow"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Star Rating Badge */}
        {hotel.stars > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-white rounded text-xs font-medium">
            {hotel.stars}★
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Location */}
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{hotel.city}, {hotel.country}</span>
        </div>

        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
          {hotel.name}
        </h3>

        {/* Amenities */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          {hotel.amenities.slice(0, 3).map((amenity, index) => {
            const Icon = getAmenityIcon(amenity);
            return (
              <div key={index} className="flex items-center space-x-1">
                {Icon && <Icon className="w-3 h-3" />}
                <span>{amenity}</span>
              </div>
            );
          })}
          {hotel.amenities.length > 3 && (
            <span className="text-gray-400">+{hotel.amenities.length - 3} more</span>
          )}
        </div>

        {/* Rating and Distance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900">{hotel.reviewScore.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">({hotel.reviewCount} reviews)</span>
          </div>
          <span className="text-xs text-gray-500">{hotel.distanceToCenter}km to center</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-1 pt-1">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(hotel.price, hotel.currency)}
          </span>
          <span className="text-sm text-gray-500">night</span>
        </div>
      </div>
    </div>
  );
}
