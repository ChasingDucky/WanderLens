import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';
import DestinationCard from '@/components/DestinationCard';
import { mockDestinations } from '@/lib/mockData';
import { Sparkles, TrendingUp, Leaf, Users, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Airbnb Style */}
      <div className="relative h-[600px] -mt-px">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')] bg-cover bg-center opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Not sure where to go?
              <br />
              <span className="text-4xl md:text-6xl">Perfect.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
              Discover amazing destinations and experiences around the world
            </p>
          </div>

          {/* Search Form */}
          <div className="w-full max-w-4xl">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Inspiration for your next trip
          </h2>
          <p className="text-xl text-gray-600">
            Explore trending destinations and unique experiences
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-2">
          {['All', 'Beaches', 'Mountains', 'Cities', 'Culture'].map((category) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                category === 'All'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered suggestions tailored to your preferences
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Price Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Know when to book with predictive pricing
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Travel</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose eco-friendly options for your journey
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Shared Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborate with friends and family easily
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
