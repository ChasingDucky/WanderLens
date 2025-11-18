'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CalendarDays, Users, MapPin, Sparkles, TrendingUp } from 'lucide-react';

const POPULAR_ROUTES = [
  { from: 'SFO', to: 'NRT', label: 'San Francisco → Tokyo' },
  { from: 'LAX', to: 'CDG', label: 'Los Angeles → Paris' },
  { from: 'JFK', to: 'LHR', label: 'New York → London' },
  { from: 'SFO', to: 'SYD', label: 'San Francisco → Sydney' },
];

const QUICK_DATES = [
  { label: 'This Weekend', days: 'weekend' },
  { label: 'Next Week', days: 7 },
  { label: 'Next Month', days: 30 },
  { label: 'Flexible', days: 'flexible' },
];

export default function SearchForm() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'flights' | 'hotels'>('flights');
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
  });

  const getDateOffset = (days: number | string) => {
    const today = new Date();
    if (days === 'weekend') {
      // Get next Saturday
      const daysUntilSat = (6 - today.getDay() + 7) % 7 || 7;
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + daysUntilSat);
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
      return {
        depart: saturday.toISOString().split('T')[0],
        return: sunday.toISOString().split('T')[0],
      };
    } else if (days === 'flexible') {
      return { depart: '', return: '' };
    } else {
      const depart = new Date(today);
      depart.setDate(today.getDate() + (days as number));
      const returnDate = new Date(depart);
      returnDate.setDate(depart.getDate() + 7);
      return {
        depart: depart.toISOString().split('T')[0],
        return: returnDate.toISOString().split('T')[0],
      };
    }
  };

  const handleQuickDate = (days: number | string) => {
    const dates = getDateOffset(days);
    setFormData({
      ...formData,
      departDate: dates.depart,
      returnDate: dates.return,
    });
  };

  const handlePopularRoute = (route: typeof POPULAR_ROUTES[0]) => {
    setFormData({
      ...formData,
      origin: route.from,
      destination: route.to,
    });
    setShowQuickOptions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchType === 'flights') {
      const params = new URLSearchParams({
        origin: formData.origin,
        destination: formData.destination,
        departDate: formData.departDate,
        returnDate: formData.returnDate,
        passengers: formData.passengers.toString(),
      });
      router.push(`/flights?${params.toString()}`);
    } else {
      const params = new URLSearchParams({
        city: formData.destination,
        checkIn: formData.departDate,
        checkOut: formData.returnDate,
        guests: formData.passengers.toString(),
      });
      router.push(`/hotels?${params.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Search Type Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSearchType('flights')}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            searchType === 'flights'
              ? 'bg-white text-gray-900 shadow-lg scale-105'
              : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
          }`}
        >
          ✈️ Flights
        </button>
        <button
          onClick={() => setSearchType('hotels')}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            searchType === 'hotels'
              ? 'bg-white text-gray-900 shadow-lg scale-105'
              : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
          }`}
        >
          🏨 Hotels
        </button>
      </div>

      {/* Popular Routes - Quick Access */}
      {searchType === 'flights' && showQuickOptions && (
        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Popular routes:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_ROUTES.map((route) => (
              <button
                key={route.label}
                onClick={() => handlePopularRoute(route)}
                type="button"
                className="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 shadow-md"
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Origin (Flights only) */}
          {searchType === 'flights' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  onFocus={() => setShowQuickOptions(true)}
                  placeholder="SFO"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-lg font-medium"
                  required
                />
              </div>
            </div>
          )}

          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              {searchType === 'flights' ? 'To' : 'Where'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder={searchType === 'flights' ? 'NRT' : 'Tokyo'}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-lg font-medium"
                required
              />
            </div>
          </div>

          {/* Depart Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              {searchType === 'flights' ? 'Depart' : 'Check-in'}
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.departDate}
                onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-lg font-medium"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              {searchType === 'flights' ? 'Return' : 'Check-out'}
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-lg font-medium"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              {searchType === 'flights' ? 'Travelers' : 'Guests'}
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-lg font-medium appearance-none bg-white"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Date Selection */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Dates</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_DATES.map((option) => (
              <button
                key={option.label}
                onClick={() => handleQuickDate(option.days)}
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-700 rounded-lg text-sm font-medium transition-all hover:scale-105"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
