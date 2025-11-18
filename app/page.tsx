import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';
import DestinationCard from '@/components/DestinationCard';
import RecommendationsSection from '@/components/RecommendationsSection';
import { mockDestinations } from '@/lib/mockData';
import { UserProfile } from '@/types';
import { Sparkles, TrendingUp, Leaf, Users, Star } from 'lucide-react';

// Mock user for personalized recommendations - in production this would come from auth
const mockUser: UserProfile = {
  id: 'USER001',
  name: 'John Doe',
  email: 'john@example.com',
  membershipTier: 'gold', // Gold member gets personalized recommendations
  preferences: {
    budgetRange: 'mid-range',
    travelStyle: ['culture', 'food'],
    cuisinePreferences: ['Japanese', 'French'],
    destinations: ['Tokyo', 'Paris'],
  },
  travelHistory: ['New York', 'London'],
  joinedDate: new Date('2023-01-15'),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Simplified */}
      <div className="bg-gray-50 pt-32 pb-20 -mt-px">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plan your perfect trip
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search flights, hotels, and activities all in one place
            </p>
          </div>

          {/* Search Form */}
          <div className="w-full max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <RecommendationsSection user={mockUser} />

      {/* Inspiration Section */}
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Popular Destinations
          </h2>
          <p className="text-gray-600">
            Explore trending destinations
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-3 mb-12 flex-wrap gap-2">
          {['All', 'Beaches', 'Mountains', 'Cities', 'Culture'].map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 mb-4">
                <Sparkles className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-sm text-gray-600">
                AI-powered suggestions
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 mb-4">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Price Tracking</h3>
              <p className="text-sm text-gray-600">
                Predictive pricing alerts
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 mb-4">
                <Leaf className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Sustainable Travel</h3>
              <p className="text-sm text-gray-600">
                Eco-friendly options
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 mb-4">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Shared Planning</h3>
              <p className="text-sm text-gray-600">
                Collaborate with ease
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-2">
              Trusted by thousands of travelers
            </h3>
            <p className="text-xl text-gray-600">
              Join our community and start planning your perfect trip today
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">WanderLens</h3>
            <p className="text-gray-400 mb-4">
              Your intelligent travel companion for seamless journey planning
            </p>
            <p className="text-sm text-gray-500">
              © 2025 WanderLens. Built with Next.js and TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
