'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { mockRailPasses } from '@/lib/mockData';
import { RailPass } from '@/types';
import { Train, MapPin, Star, Calendar, Users, Sparkles, CheckCircle } from 'lucide-react';

export default function RailPassesPage() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedAgeCategory, setSelectedAgeCategory] = useState<string>('all');

  // Get unique regions
  const regions = ['all', ...Array.from(new Set(mockRailPasses.map(p => p.region)))];

  // Filter rail passes
  const filteredPasses = mockRailPasses.filter(pass => {
    if (selectedRegion !== 'all' && pass.region !== selectedRegion) return false;
    if (selectedAgeCategory !== 'all' && pass.ageCategory !== selectedAgeCategory) return false;
    return true;
  });

  // Sort by popular first
  const sortedPasses = [...filteredPasses].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return b.rating - a.rating;
  });

  const handlePurchase = (passId: string) => {
    router.push(`/booking?type=rail-pass&id=${passId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Train className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Rail Passes</h1>
            </div>
            <p className="text-xl text-purple-100 mb-6">
              Unlimited train travel across regions - the smart way to explore
            </p>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Save up to 50% with flexible rail passes. Perfect for multi-city adventures!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age Category</label>
            <select
              value={selectedAgeCategory}
              onChange={(e) => setSelectedAgeCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Ages</option>
              <option value="youth">Youth (12-27)</option>
              <option value="adult">Adult (28-59)</option>
              <option value="senior">Senior (60+)</option>
              <option value="child">Child (4-11)</option>
            </select>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Why Choose Rail Passes?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-800">
                <div>
                  <strong>💰 Save Money:</strong> Up to 50% cheaper than individual tickets
                </div>
                <div>
                  <strong>🌍 Flexibility:</strong> Unlimited travel on consecutive or flexible days
                </div>
                <div>
                  <strong>🎁 Extra Benefits:</strong> Free museum entries, ferry discounts & more
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rail Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPasses.map((pass) => (
            <div
              key={pass.id}
              className={`group bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                pass.popular ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${pass.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {pass.popular && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{pass.name}</h3>
                  <div className="flex items-center space-x-2 text-white/90 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{pass.region}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4">{pass.description}</p>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">{pass.travelDays} days travel</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700 capitalize">{pass.ageCategory}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm col-span-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-700">{pass.rating.toFixed(1)} ({pass.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">FEATURES:</p>
                  <div className="space-y-1">
                    {pass.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-1">VALID IN:</p>
                  <p className="text-xs text-gray-600">
                    {pass.countries.slice(0, 3).join(', ')}
                    {pass.countries.length > 3 && ` +${pass.countries.length - 3} more`}
                  </p>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${pass.price}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{pass.class} class</p>
                  </div>
                  <button
                    onClick={() => handlePurchase(pass.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${
                      pass.popular
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                        : 'bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600'
                    }`}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Rail Passes Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Pass</h3>
              <p className="text-sm text-gray-600">Select region, duration, and class</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Activate Your Pass</h3>
              <p className="text-sm text-gray-600">Activate on your first travel day</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Board & Travel</h3>
              <p className="text-sm text-gray-600">Show pass and enjoy unlimited travel</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enjoy Benefits</h3>
              <p className="text-sm text-gray-600">Access discounts and free perks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
