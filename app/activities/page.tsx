'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ActivityCard from '@/components/ActivityCard';
import { mockActivities } from '@/lib/mockData';
import { Activity } from '@/types';
import { Sliders, MapPin, DollarSign, Clock, Star, Sparkles } from 'lucide-react';

export default function ActivitiesPage() {
  const searchParams = useSearchParams();
  const destinationParam = searchParams.get('destination') || '';

  const [destination, setDestination] = useState(destinationParam);
  const [filters, setFilters] = useState({
    maxPrice: 300,
    categories: [] as string[],
    minDuration: 0,
    maxDuration: 24,
    minRating: 0,
  });

  // Get unique categories
  const categories = Array.from(new Set(mockActivities.map(a => a.category)));

  // Filter activities
  const filteredActivities = useMemo(() => {
    return mockActivities.filter((activity) => {
      if (destination && !activity.location.address.toLowerCase().includes(destination.toLowerCase()))
        return false;
      if (activity.price > filters.maxPrice) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(activity.category))
        return false;
      if (activity.duration < filters.minDuration || activity.duration > filters.maxDuration)
        return false;
      if (activity.rating < filters.minRating) return false;
      return true;
    });
  }, [destination, filters]);

  // Sort by popularity (rating * price ratio for value)
  const sortedActivities = useMemo(() => {
    return [...filteredActivities].sort((a, b) => {
      // Popular activities (high rating, reasonable price) first
      const scoreA = a.rating / (a.price / 100);
      const scoreB = b.rating / (b.price / 100);
      return scoreB - scoreA;
    });
  }, [filteredActivities]);

  // Featured picks
  const featuredActivities = useMemo(() => {
    return {
      topRated: sortedActivities.filter(a => a.rating >= 4.8).slice(0, 3),
      bestValue: sortedActivities.filter(a => a.price <= 75 && a.rating >= 4.6).slice(0, 3),
      adventure: sortedActivities.filter(a => a.category === 'adventure').slice(0, 3),
    };
  }, [sortedActivities]);

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const resetFilters = () => {
    setFilters({
      maxPrice: 300,
      categories: [],
      minDuration: 0,
      maxDuration: 24,
      minRating: 0,
    });
    setDestination('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-600 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Discover Activities & Experiences</h1>
          </div>
          <p className="text-xl text-white/90">
            Unforgettable tours, dining experiences, and adventures around the world
          </p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5" />
              <input
                type="text"
                placeholder="Search destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-white/70 w-64"
              />
            </div>
            <div className="text-sm">
              {sortedActivities.length} {sortedActivities.length === 1 ? 'activity' : 'activities'} found
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🎯</span> Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{category}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        ({mockActivities.filter(a => a.category === category).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" /> Max Price
                </h3>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$0</span>
                  <span className="font-semibold text-orange-600">${filters.maxPrice}</span>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Duration (hours)
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Min hours</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={filters.minDuration}
                      onChange={(e) => setFilters(prev => ({ ...prev, minDuration: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Max hours</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={filters.maxDuration}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxDuration: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
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
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
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

          {/* Activities List */}
          <div className="flex-1">
            {/* Featured Sections */}
            {!destination && filters.categories.length === 0 && (
              <>
                {/* Top Rated */}
                {featuredActivities.topRated.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <h2 className="text-2xl font-bold text-gray-900">Top Rated Experiences</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {featuredActivities.topRated.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} badge="top-rated" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Value */}
                {featuredActivities.bestValue.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Best Value</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {featuredActivities.bestValue.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} badge="best-value" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Adventure */}
                {featuredActivities.adventure.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Adventure Awaits</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {featuredActivities.adventure.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* All Activities */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {destination || filters.categories.length > 0 ? 'Matching Activities' : 'All Activities'}
              </h2>
            </div>

            {sortedActivities.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
