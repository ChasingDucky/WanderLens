import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';
import DestinationCard from '@/components/DestinationCard';
import { mockDestinations } from '@/lib/mockData';
import { Sparkles, TrendingUp, Leaf, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 max-w-3xl mx-auto">
              Smart travel planning with AI-powered recommendations, price predictions, and personalized itineraries
            </p>
          </div>

          <SearchForm />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose WanderLens?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Recommendations</h3>
            <p className="text-gray-600">
              Personalized suggestions based on your preferences and travel history
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Predictions</h3>
            <p className="text-gray-600">
              Know the best time to book with our advanced price forecasting
            </p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly Options</h3>
            <p className="text-gray-600">
              See carbon emissions and choose sustainable travel options
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborative Planning</h3>
            <p className="text-gray-600">
              Share and plan trips together with friends and family
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Popular Destinations
          </h2>
          <p className="text-gray-600 mb-8">
            Discover the world&apos;s most amazing places
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
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
