'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, Flight, Hotel, Activity, Restaurant } from '@/types';
import { mockFlights, mockHotels, mockActivities, mockRestaurants } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { Sparkles, MapPin, Calendar, TrendingDown, Plane, Hotel as HotelIcon, Utensils, ChevronRight, Star } from 'lucide-react';

interface RecommendedPackage {
  id: string;
  title: string;
  destination: string;
  duration: number;
  thumbnail: string;
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  restaurants: Restaurant[];
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  tags: string[];
  matchReason: string;
}

interface RecommendationsSectionProps {
  user: UserProfile;
}

export default function RecommendationsSection({ user }: RecommendationsSectionProps) {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<RecommendedPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const generateRecommendations = useCallback(() => {
    setLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const packages: RecommendedPackage[] = [];

      // Recommendation 1: Based on cuisine preferences (Japanese)
      if (user.preferences?.cuisinePreferences?.includes('Japanese')) {
        const tokyoFlights = mockFlights.filter(f => f.destination.includes('Tokyo')).slice(0, 2);
        const tokyoHotels = mockHotels.filter(h => h.city === 'Tokyo').slice(0, 1);
        const tokyoActivities = mockActivities.filter(a => a.location.address.includes('Tokyo')).slice(0, 4);
        const tokyoRestaurants = mockRestaurants.filter(r => r.city === 'Tokyo' && r.cuisine === 'Japanese').slice(0, 3);

        const originalPrice =
          tokyoFlights.reduce((sum, f) => sum + f.price, 0) +
          tokyoHotels.reduce((sum, h) => sum + h.price * 5, 0) +
          tokyoActivities.reduce((sum, a) => sum + a.price, 0) +
          tokyoRestaurants.reduce((sum, r) => sum + r.averageMealPrice * 2, 0);

        packages.push({
          id: 'REC001',
          title: '5-Day Tokyo Culinary Adventure',
          destination: 'Tokyo, Japan',
          duration: 5,
          thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
          flights: tokyoFlights,
          hotels: tokyoHotels,
          activities: tokyoActivities,
          restaurants: tokyoRestaurants,
          originalPrice,
          discountedPrice: originalPrice * 0.85,
          savings: originalPrice * 0.15,
          tags: ['Japanese Cuisine', 'Culture', 'City Life'],
          matchReason: 'Based on your love for Japanese cuisine'
        });
      }

      // Recommendation 2: Based on travel style (culture)
      if (user.preferences?.travelStyle?.includes('culture')) {
        const parisFlights = mockFlights.filter(f => f.destination.includes('Paris')).slice(0, 2);
        const parisHotels = mockHotels.filter(h => h.city === 'Paris').slice(0, 1);
        const parisActivities = mockActivities.filter(a => a.location.address.includes('Paris')).slice(0, 5);
        const parisRestaurants = mockRestaurants.filter(r => r.city === 'Paris' && r.cuisine === 'French').slice(0, 3);

        const originalPrice =
          parisFlights.reduce((sum, f) => sum + f.price, 0) +
          parisHotels.reduce((sum, h) => sum + h.price * 6, 0) +
          parisActivities.reduce((sum, a) => sum + a.price, 0) +
          parisRestaurants.reduce((sum, r) => sum + r.averageMealPrice * 2, 0);

        packages.push({
          id: 'REC002',
          title: '6-Day Paris Cultural Immersion',
          destination: 'Paris, France',
          duration: 6,
          thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
          flights: parisFlights,
          hotels: parisHotels,
          activities: parisActivities,
          restaurants: parisRestaurants,
          originalPrice,
          discountedPrice: originalPrice * 0.85,
          savings: originalPrice * 0.15,
          tags: ['Culture', 'Art', 'Fine Dining'],
          matchReason: 'Perfect for cultural exploration enthusiasts'
        });
      }

      // Recommendation 3: Based on budget range (mid-range)
      if (user.preferences?.budgetRange === 'mid-range') {
        const nyFlights = mockFlights.filter(f => f.destination.includes('New York')).slice(0, 2);
        const nyHotels = mockHotels.filter(h => h.city === 'New York').slice(0, 1);
        const nyActivities = mockActivities.filter(a => a.location.address.includes('New York')).slice(0, 4);
        const nyRestaurants = mockRestaurants.filter(r => r.city === 'New York').slice(0, 3);

        const originalPrice =
          nyFlights.reduce((sum, f) => sum + f.price, 0) +
          nyHotels.reduce((sum, h) => sum + h.price * 4, 0) +
          nyActivities.reduce((sum, a) => sum + a.price, 0) +
          nyRestaurants.reduce((sum, r) => sum + r.averageMealPrice * 2, 0);

        packages.push({
          id: 'REC003',
          title: '4-Day New York City Experience',
          destination: 'New York, USA',
          duration: 4,
          thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
          flights: nyFlights,
          hotels: nyHotels,
          activities: nyActivities,
          restaurants: nyRestaurants,
          originalPrice,
          discountedPrice: originalPrice * 0.85,
          savings: originalPrice * 0.15,
          tags: ['Urban', 'Entertainment', 'Food'],
          matchReason: 'Tailored to your mid-range budget'
        });
      }

      setRecommendations(packages.slice(0, 3)); // Show top 3 recommendations
      setLoading(false);
    }, 800);
  }, [user]);

  useEffect(() => {
    // Generate personalized recommendations based on user profile
    generateRecommendations();
  }, [generateRecommendations]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-900">Generating your personalized recommendations...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                AI-Curated Just for You
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Based on your preferences for{' '}
              <span className="font-semibold text-purple-700">
                {user.preferences?.cuisinePreferences?.join(', ')}
              </span>{' '}
              cuisine and{' '}
              <span className="font-semibold text-purple-700">
                {user.preferences?.travelStyle?.join(', ')}
              </span>{' '}
              experiences. Book now and save 15%!
            </p>
          </div>
          <button
            onClick={() => router.push('/ai-planner')}
            className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            <span>Create Custom Plan</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {recommendations.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => router.push('/ai-planner')}
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-20" />
                <div className="absolute top-3 right-3 z-10">
                  <div className="px-3 py-1.5 bg-red-500 text-white rounded-full flex items-center space-x-1 shadow-lg">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-bold">SAVE 15%</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <div className="px-3 py-1.5 bg-purple-600/90 backdrop-blur-sm text-white rounded-lg text-xs font-semibold">
                    {pkg.matchReason}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {pkg.title}
                </h3>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{pkg.destination}</span>
                  <span className="text-gray-400">•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{pkg.duration} days</span>
                </div>

                {/* Included Items */}
                <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <Plane className="w-3 h-3" />
                    <span>{pkg.flights.length} flights</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <HotelIcon className="w-3 h-3" />
                    <span>{pkg.hotels.length} hotel</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <Star className="w-3 h-3" />
                    <span>{pkg.activities.length} activities</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <Utensils className="w-3 h-3" />
                    <span>{pkg.restaurants.length} restaurants</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {pkg.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(pkg.discountedPrice, 'USD')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(pkg.originalPrice, 'USD')}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">
                    Save {formatCurrency(pkg.savings, 'USD')} with AI bundle discount
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/ai-planner');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all group-hover:scale-105"
                >
                  View & Customize
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden text-center">
          <button
            onClick={() => router.push('/ai-planner')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            <span>Create Custom Plan</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
