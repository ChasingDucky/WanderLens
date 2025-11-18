'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CalendarDays, Users, MapPin } from 'lucide-react';

export default function SearchForm() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'flights' | 'hotels'>('flights');
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
  });

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
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSearchType('flights')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            searchType === 'flights'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Flights
        </button>
        <button
          onClick={() => setSearchType('hotels')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            searchType === 'hotels'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Hotels
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Origin (Flights only) */}
          {searchType === 'flights' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="SFO - San Francisco"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
          )}

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'flights' ? 'To' : 'Destination'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder={searchType === 'flights' ? 'NRT - Tokyo' : 'Tokyo, Japan'}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Depart Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'flights' ? 'Depart' : 'Check-in'}
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.departDate}
                onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'flights' ? 'Return' : 'Check-out'}
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'flights' ? 'Passengers' : 'Guests'}
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="9"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
