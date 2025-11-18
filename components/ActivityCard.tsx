'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Activity } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Clock, MapPin, Star, Heart, Users, Camera, Utensils, ShoppingBag, Compass } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  badge?: 'top-rated' | 'best-value' | 'popular';
}

export default function ActivityCard({ activity, badge }: ActivityCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sightseeing':
        return <Camera className="w-5 h-5" />;
      case 'dining':
        return <Utensils className="w-5 h-5" />;
      case 'entertainment':
        return <Users className="w-5 h-5" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5" />;
      case 'adventure':
        return <Compass className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sightseeing':
        return 'from-blue-500 to-cyan-600';
      case 'dining':
        return 'from-rose-500 to-pink-600';
      case 'entertainment':
        return 'from-purple-500 to-indigo-600';
      case 'shopping':
        return 'from-green-500 to-emerald-600';
      case 'adventure':
        return 'from-orange-500 to-amber-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getBadgeConfig = (badgeType: string) => {
    switch (badgeType) {
      case 'top-rated':
        return { label: '⭐ Top Rated', color: 'bg-yellow-500 text-white' };
      case 'best-value':
        return { label: '💰 Best Value', color: 'bg-green-500 text-white' };
      case 'popular':
        return { label: '🔥 Popular', color: 'bg-orange-500 text-white' };
      default:
        return null;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    router.push(`/activities/${activity.id}`);
  };

  // Extract city from address
  const getCity = (address: string) => {
    const parts = address.split(',');
    return parts[parts.length - 1].trim();
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(activity.category)} opacity-90`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">
              {getCategoryIcon(activity.category)}
            </div>
          </div>
        </div>

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

        {/* Category Label */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full flex items-center space-x-1">
          <span className="text-xs font-semibold text-gray-700 capitalize">{activity.category}</span>
        </div>
      </div>

      <div className="p-5">
        {/* Title & Rating */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {activity.name}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">{activity.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {activity.duration < 1
                  ? `${Math.round(activity.duration * 60)}m`
                  : `${activity.duration}h`}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {activity.description}
        </p>

        {/* Location */}
        <div className="flex items-start space-x-2 mb-4 pb-4 border-b border-gray-100">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{getCity(activity.location.address)}</span>
        </div>

        {/* Price & Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xs text-gray-500">From</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(activity.price, 'USD')}
              </span>
            </div>
            <span className="text-xs text-gray-500">per person</span>
          </div>
          <button
            onClick={handleCardClick}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all group-hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
