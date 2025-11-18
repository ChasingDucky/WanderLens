'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { formatCurrency } from '@/lib/utils';
import { mockFlights, mockHotels, mockActivities, mockRestaurants, mockTrains } from '@/lib/mockData';
import { MembershipTier, UserProfile } from '@/types';
import { Sparkles, Calendar, Users, DollarSign, Plane, Hotel as HotelIcon, Utensils, Zap, Award, Lock, Crown, CheckCircle, TrendingDown } from 'lucide-react';

// Mock user - in production this would come from auth
const mockUser: UserProfile = {
  id: 'USER001',
  name: 'John Doe',
  email: 'john@example.com',
  membershipTier: 'standard', // Change to 'gold' to test gold member features
  preferences: {
    budgetRange: 'mid-range',
    travelStyle: ['culture', 'food'],
    cuisinePreferences: ['Japanese', 'French'],
    destinations: ['Tokyo', 'Paris'],
  },
  travelHistory: ['New York', 'London'],
  joinedDate: new Date('2023-01-15'),
};

export default function AIPlannePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 3000,
    pace: 'moderate' as 'relaxed' | 'moderate' | 'packed',
    interests: [] as string[],
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const isGoldMember = mockUser.membershipTier === 'gold';

  const interestOptions = ['Culture', 'Food', 'Adventure', 'Relaxation', 'Shopping', 'Nature', 'Nightlife'];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const generateItinerary = () => {
    if (!isGoldMember) {
      setShowUpgradePrompt(true);
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const numDays = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24));

      // Smart selection based on user preferences
      const selectedFlights = mockFlights.filter(f =>
        f.destination.toLowerCase().includes(formData.destination.toLowerCase())
      ).slice(0, 2);

      const selectedHotels = mockHotels.filter(h =>
        h.city.toLowerCase().includes(formData.destination.toLowerCase())
      ).slice(0, 1);

      const selectedActivities = mockActivities.filter(a =>
        a.location.address.toLowerCase().includes(formData.destination.toLowerCase())
      ).slice(0, numDays * 2);

      const selectedRestaurants = mockRestaurants.filter(r =>
        r.city.toLowerCase().includes(formData.destination.toLowerCase())
      ).slice(0, numDays);

      const flightsCost = selectedFlights.reduce((sum, f) => sum + f.price, 0);
      const hotelsCost = selectedHotels.reduce((sum, h) => sum + h.price, 0) * numDays;
      const activitiesCost = selectedActivities.reduce((sum, a) => sum + a.price, 0);
      const restaurantsCost = selectedRestaurants.reduce((sum, r) => sum + r.averageMealPrice, 0);

      const originalTotal = flightsCost + hotelsCost + activitiesCost + restaurantsCost;
      const discountedTotal = originalTotal * 0.85; // 15% discount
      const savings = originalTotal - discountedTotal;

      setGeneratedItinerary({
        id: 'IT' + Date.now(),
        name: `${numDays}-Day ${formData.destination} Adventure`,
        destination: formData.destination,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        flights: selectedFlights,
        hotels: selectedHotels,
        activities: selectedActivities,
        restaurants: selectedRestaurants,
        numDays,
        originalTotal,
        discountedTotal,
        savings,
        aiGenerated: true,
        bundleDiscount: 15,
      });

      setIsGenerating(false);
    }, 2000);
  };

  const handleBookItinerary = () => {
    if (!generatedItinerary) return;
    router.push(`/booking?itineraryId=${generatedItinerary.id}&bundlePrice=${generatedItinerary.discountedTotal}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-10 h-10" />
            <h1 className="text-4xl font-bold">AI Travel Planner</h1>
            {isGoldMember && (
              <Crown className="w-8 h-8 text-yellow-400" />
            )}
          </div>
          <p className="text-xl text-white/90 mb-6">
            Let our AI create the perfect itinerary for you - Get 15% off on complete packages!
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingDown className="w-5 h-5" />
              <span className="font-semibold">15% Bundle Discount</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Instant Generation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Fully Customizable</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Membership Status Banner */}
        {!isGoldMember && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Upgrade to Gold Membership</h3>
                <p className="text-yellow-800 mb-4">
                  Unlock AI Travel Planner and get 15% off on all AI-generated complete itineraries!
                  Plus enjoy priority support and exclusive deals.
                </p>
                <button
                  onClick={() => router.push('/settings?upgrade=gold')}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Crown className="w-5 h-5" />
                  <span>Upgrade to Gold - $99/year</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Trip</h2>

              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    placeholder="e.g., Tokyo, Paris, New York..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.travelers}
                    onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Budget (USD)
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">$500</span>
                    <span className="font-bold text-purple-600">${formData.budget}</span>
                    <span className="text-gray-600">$10,000</span>
                  </div>
                </div>

                {/* Pace */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Travel Pace
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['relaxed', 'moderate', 'packed'] as const).map(pace => (
                      <button
                        key={pace}
                        onClick={() => setFormData({...formData, pace})}
                        className={`py-3 rounded-lg font-semibold transition-all ${
                          formData.pace === pace
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pace.charAt(0).toUpperCase() + pace.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateItinerary}
                  disabled={!formData.destination || !formData.startDate || !formData.endDate || isGenerating}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                    isGoldMember
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } disabled:opacity-50`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      <span>{isGoldMember ? 'Generate AI Itinerary' : 'Gold Members Only'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {generatedItinerary ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{generatedItinerary.name}</h2>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                    AI Generated
                  </span>
                </div>

                {/* Savings Banner */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-900">Bundle Discount Applied!</span>
                      </div>
                      <p className="text-sm text-green-700">Save 15% by booking the complete package</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(generatedItinerary.savings, 'USD')}
                      </div>
                      <div className="text-xs text-green-700">saved</div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Flights ({generatedItinerary.flights.length})</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(generatedItinerary.flights.reduce((s: number, f: any) => s + f.price, 0), 'USD')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <HotelIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Hotels ({generatedItinerary.numDays} nights)</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(generatedItinerary.hotels.reduce((s: number, h: any) => s + h.price, 0) * generatedItinerary.numDays, 'USD')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Activities ({generatedItinerary.activities.length})</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(generatedItinerary.activities.reduce((s: number, a: any) => s + a.price, 0), 'USD')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Utensils className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Dining ({generatedItinerary.restaurants.length})</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(generatedItinerary.restaurants.reduce((s: number, r: any) => s + r.averageMealPrice, 0), 'USD')}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Original Total</span>
                      <span className="line-through">{formatCurrency(generatedItinerary.originalTotal, 'USD')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-semibold mb-2">
                      <span>Bundle Discount (15%)</span>
                      <span>-{formatCurrency(generatedItinerary.savings, 'USD')}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold">
                      <span>Your Price</span>
                      <span className="text-purple-600">{formatCurrency(generatedItinerary.discountedTotal, 'USD')}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBookItinerary}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
                  >
                    Book Complete Package
                  </button>
                  <button
                    onClick={() => router.push(`/itinerary?id=${generatedItinerary.id}`)}
                    className="w-full py-4 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all"
                  >
                    Customize Itinerary
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  15% discount applies only when booking the complete package
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Plan?</h3>
                <p className="text-gray-600">
                  Fill in your travel details and let our AI create the perfect itinerary for you
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="text-center mb-6">
              <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Gold</h3>
              <p className="text-gray-600">
                Unlock AI Travel Planner and enjoy 15% off on all AI-generated packages!
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>AI-powered itinerary generation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>15% bundle discount on packages</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Priority customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Exclusive early access to deals</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/settings?upgrade=gold')}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Upgrade Now - $99/year
              </button>
              <button
                onClick={() => setShowUpgradePrompt(false)}
                className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
