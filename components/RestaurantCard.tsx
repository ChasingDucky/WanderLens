'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Star, MapPin, Heart, Utensils, Tag, Award } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  badge?: 'michelin' | 'top-rated' | 'budget';
}

export default function RestaurantCard({ restaurant, badge }: RestaurantCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const getPriceLevelSymbol = (level: number) => '$'.repeat(level);

  const getBadgeConfig = (badgeType: string) => {
    switch (badgeType) {
      case 'michelin':
        return { label: '⭐ Michelin', color: 'bg-red-600 text-white' };
      case 'top-rated':
        return { label: '🏆 Top Rated', color: 'bg-yellow-500 text-white' };
      case 'budget':
        return { label: '💰 Great Value', color: 'bg-green-500 text-white' };
      default:
        return null;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    router.push(`/restaurants/${restaurant.id}`);
  };

  const hasMealPackages = restaurant.mealPackages && restaurant.mealPackages.length > 0;
  const popularPackage = restaurant.mealPackages.find(pkg => pkg.popular);

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-500 to-orange-600">
        {/* Badge */}
        {badge && (() => {
          const config = getBadgeConfig(badge);
          if (!config) return null;
          return (
            <div className="absolute top-3 left-3 z-10">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.color} shadow-lg`}>
                {config.label}
              </span>
            </div>
          );
        })()}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Cuisine Label */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full flex items-center space-x-1">
          <Utensils className="w-3 h-3 text-gray-700" />
          <span className="text-xs font-semibold text-gray-700">{restaurant.cuisine}</span>
        </div>
      </div>

      <div className="p-5">
        {/* Title & Rating */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center space-x-2 flex-wrap gap-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">{restaurant.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600">{restaurant.reviewCount.toLocaleString()} reviews</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm font-semibold text-red-600">{getPriceLevelSymbol(restaurant.priceLevel)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {restaurant.description}
        </p>

        {/* Location */}
        <div className="flex items-start space-x-2 mb-4 pb-4 border-b border-gray-100">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{restaurant.city}, {restaurant.country}</span>
        </div>

        {/* Meal Package Highlight */}
        {hasMealPackages && popularPackage && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <Tag className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900">{popularPackage.name}</span>
                  {popularPackage.originalPrice && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                      SAVE {Math.round((1 - popularPackage.price / popularPackage.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-800 line-clamp-1">{popularPackage.description}</p>
                <div className="flex items-baseline space-x-2 mt-1">
                  {popularPackage.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatCurrency(popularPackage.originalPrice, 'USD')}
                    </span>
                  )}
                  <span className="text-sm font-bold text-amber-900">
                    {formatCurrency(popularPackage.price, 'USD')}
                  </span>
                  <span className="text-xs text-amber-700">/ {popularPackage.servings} {popularPackage.servings === 1 ? 'person' : 'people'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {restaurant.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {restaurant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {tag.includes('Michelin') && <Award className="w-3 h-3 mr-1 text-red-600" />}
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={handleCardClick}
          className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all group-hover:scale-105"
        >
          {restaurant.acceptsReservations ? 'Book Table & Packages' : 'View Details'}
        </button>
      </div>
    </div>
  );
}
