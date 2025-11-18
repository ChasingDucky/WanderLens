'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import RestaurantCard from '@/components/RestaurantCard';
import { mockRestaurants } from '@/lib/mockData';
import { Utensils, MapPin, DollarSign, Star, Filter, TrendingUp, Award } from 'lucide-react';

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') || '';

  const [city, setCity] = useState(cityParam);
  const [filters, setFilters] = useState({
    priceLevel: 4, // Max price level ($ to $$$$)
    cuisines: [] as string[],
    minRating: 0,
    features: [] as string[],
  });

  // Get unique cuisines
  const cuisines = Array.from(new Set(mockRestaurants.map(r => r.cuisine)));

  // Popular features
  const features = ['Michelin Star', 'Reservations', '24/7', 'Outdoor Seating', 'Family-Friendly'];

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter((restaurant) => {
      if (city && !restaurant.city.toLowerCase().includes(city.toLowerCase()))
        return false;
      if (restaurant.priceLevel > filters.priceLevel) return false;
      if (filters.cuisines.length > 0 && !filters.cuisines.includes(restaurant.cuisine))
        return false;
      if (restaurant.rating < filters.minRating) return false;
      if (filters.features.length > 0) {
        const hasFeature = filters.features.some(feature =>
          restaurant.tags.some(tag => tag.toLowerCase().includes(feature.toLowerCase())) ||
          restaurant.amenities.some(amenity => amenity.toLowerCase().includes(feature.toLowerCase()))
        );
        if (!hasFeature) return false;
      }
      return true;
    });
  }, [city, filters]);

  // Sort by rating and review count
  const sortedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    });
  }, [filteredRestaurants]);

  // Featured sections
  const featuredRestaurants = useMemo(() => {
    return {
      michelin: sortedRestaurants.filter(r => r.tags.some(tag => tag.includes('Michelin'))).slice(0, 3),
      budgetFriendly: sortedRestaurants.filter(r => r.priceLevel <= 2 && r.rating >= 4.4).slice(0, 3),
      topRated: sortedRestaurants.filter(r => r.rating >= 4.7).slice(0, 3),
    };
  }, [sortedRestaurants]);

  const handleCuisineToggle = (cuisine: string) => {
    setFilters(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceLevel: 4,
      cuisines: [],
      minRating: 0,
      features: [],
    });
    setCity('');
  };

  const getPriceLevelSymbol = (level: number) => {
    return '$'.repeat(level);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-600 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Utensils className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Discover Restaurants</h1>
          </div>
          <p className="text-xl text-white/90 mb-6">
            Book tables and order meal packages from world-class restaurants
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5" />
              <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-white/70 w-64"
              />
            </div>
            <div className="text-sm">
              {sortedRestaurants.length} {sortedRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Price Level Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" /> Price Level
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  {[1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFilters(prev => ({ ...prev, priceLevel: level }))}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                        filters.priceLevel >= level
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {getPriceLevelSymbol(level)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {filters.priceLevel === 1 && 'Budget-friendly (under $20)'}
                  {filters.priceLevel === 2 && 'Moderate ($20-50)'}
                  {filters.priceLevel === 3 && 'Upscale ($50-100)'}
                  {filters.priceLevel === 4 && 'Fine dining ($100+)'}
                </p>
              </div>

              {/* Cuisine Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Cuisine Type</h3>
                <div className="space-y-2">
                  {cuisines.map((cuisine) => (
                    <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.cuisines.includes(cuisine)}
                        onChange={() => handleCuisineToggle(cuisine)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{cuisine}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        ({mockRestaurants.filter(r => r.cuisine === cuisine).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Features</h3>
                <div className="space-y-2">
                  {features.map((feature) => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[4.8, 4.5, 4.0, 0].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.minRating === rating}
                        onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">
                        {rating === 0 ? 'Any rating' : `${rating}+ stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Restaurants List */}
          <div className="flex-1">
            {/* Featured Sections */}
            {!city && filters.cuisines.length === 0 && (
              <>
                {/* Michelin Starred */}
                {featuredRestaurants.michelin.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <Award className="w-5 h-5 text-red-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Michelin Starred</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {featuredRestaurants.michelin.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} badge="michelin" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Rated */}
                {featuredRestaurants.topRated.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <h2 className="text-2xl font-bold text-gray-900">Top Rated</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {featuredRestaurants.topRated.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} badge="top-rated" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget Friendly */}
                {featuredRestaurants.budgetFriendly.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Budget-Friendly Favorites</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {featuredRestaurants.budgetFriendly.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} badge="budget" />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* All Restaurants */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {city || filters.cuisines.length > 0 ? 'Matching Restaurants' : 'All Restaurants'}
              </h2>
            </div>

            {sortedRestaurants.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
