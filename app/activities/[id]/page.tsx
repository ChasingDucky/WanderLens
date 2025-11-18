'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { mockActivities } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  MapPin,
  Clock,
  Star,
  Users,
  Calendar,
  Heart,
  Camera,
  Utensils,
  ShoppingBag,
  Compass,
  CheckCircle,
  XCircle,
  Info,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const activity = mockActivities.find((a) => a.id === params.id);

  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Activity not found</h1>
          <button
            onClick={() => router.push('/activities')}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

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

  const totalPrice = activity.price * participants;

  const handleBooking = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    router.push(
      `/booking?activityId=${activity.id}&date=${selectedDate}&participants=${participants}&price=${totalPrice}`
    );
  };

  // Generate available dates (next 60 days)
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 60; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Activities</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(activity.category)}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white transform scale-150 opacity-20">
                    {getCategoryIcon(activity.category)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-lg"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 text-sm font-semibold rounded-full capitalize">
                      {activity.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{activity.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{activity.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location.address}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {activity.duration < 1
                          ? `${Math.round(activity.duration * 60)} minutes`
                          : `${activity.duration} ${activity.duration === 1 ? 'hour' : 'hours'}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Experience</h2>
              <p className="text-gray-700 leading-relaxed">{activity.description}</p>
            </div>

            {/* What&apos;s Included */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What&apos;s Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Professional guide</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Skip-the-line access</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">All fees and taxes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Small group experience</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Not Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Hotel pickup/drop-off</span>
                </div>
                <div className="flex items-start space-x-2">
                  <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Gratuities</span>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 mb-1">Free cancellation</p>
                  <p className="text-green-700">
                    Cancel up to 24 hours in advance for a full refund
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatCurrency(activity.price, 'USD')}
                  </span>
                  <span className="text-gray-600">per person</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{activity.rating.toFixed(1)}</span>
                  <span>• Highly rated</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Choose a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Participants */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Participants
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center font-semibold"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold text-gray-900 w-12 text-center">
                    {participants}
                  </span>
                  <button
                    onClick={() => setParticipants(Math.min(10, participants + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {formatCurrency(activity.price, 'USD')} × {participants} {participants === 1 ? 'person' : 'people'}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(totalPrice, 'USD')}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(totalPrice * 0.05, 'USD')}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalPrice * 1.05, 'USD')}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-rose-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Book This Experience</span>
              </button>

              <p className="text-xs text-center text-gray-500 mt-3">
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
