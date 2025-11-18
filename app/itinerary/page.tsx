'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { mockFlights, mockHotels, mockDestinations } from '@/lib/mockData';
import { formatCurrency, formatDate, calculateDays } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  Plane,
  Hotel,
  Plus,
  Trash2,
  Share2,
  Download,
  Clock,
  DollarSign,
  Sparkles,
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity';
  name: string;
  date: string;
  time?: string;
  price: number;
  details: string;
}

export default function ItineraryPage() {
  const [destination, setDestination] = useState('Tokyo, Japan');
  const [startDate, setStartDate] = useState('2025-12-15');
  const [endDate, setEndDate] = useState('2025-12-22');
  const [items, setItems] = useState<ItineraryItem[]>([
    {
      id: '1',
      type: 'flight',
      name: 'SFO → NRT',
      date: '2025-12-15',
      time: '10:30',
      price: 850,
      details: 'United Airlines UA889 - Economy',
    },
    {
      id: '2',
      type: 'hotel',
      name: 'Grand Hyatt Tokyo',
      date: '2025-12-15',
      price: 280,
      details: '7 nights - Deluxe Room',
    },
    {
      id: '3',
      type: 'activity',
      name: 'Senso-ji Temple Visit',
      date: '2025-12-16',
      time: '09:00',
      price: 0,
      details: 'Historic Buddhist temple in Asakusa',
    },
    {
      id: '4',
      type: 'activity',
      name: 'Tokyo Skytree',
      date: '2025-12-17',
      time: '14:00',
      price: 25,
      details: 'Observation deck tickets included',
    },
    {
      id: '5',
      type: 'flight',
      name: 'NRT → SFO',
      date: '2025-12-22',
      time: '16:30',
      price: 850,
      details: 'United Airlines UA890 - Economy',
    },
  ]);

  const totalCost = items.reduce((sum, item) => {
    if (item.type === 'hotel') {
      const nights = calculateDays(startDate, endDate);
      return sum + item.price * nights;
    }
    return sum + item.price;
  }, 0);

  const tripDuration = calculateDays(startDate, endDate);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-5 h-5 text-primary-600" />;
      case 'hotel':
        return <Hotel className="w-5 h-5 text-purple-600" />;
      case 'activity':
        return <MapPin className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'border-l-4 border-primary-600 bg-primary-50';
      case 'hotel':
        return 'border-l-4 border-purple-600 bg-purple-50';
      case 'activity':
        return 'border-l-4 border-green-600 bg-green-50';
      default:
        return 'border-l-4 border-gray-600 bg-gray-50';
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Travel Itinerary</h1>
          <p className="text-gray-600">Plan and organize your perfect trip</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Overview */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Trip Overview</h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">AI Recommendations</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Visit TeamLab Borderless on Dec 18 (less crowded on weekdays)</li>
                  <li>• Add dinner reservation at Sukiyabashi Jiro (book 1 month in advance)</li>
                  <li>• Consider JR Pass for unlimited train travel ($280 for 7 days)</li>
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Itinerary Timeline</h2>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className={`rounded-lg p-4 ${getItemColor(item.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">{getItemIcon(item.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-600 capitalize">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{item.details}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{formatDate(item.date)}</span>
                            </div>
                            {item.time && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{item.time}</span>
                              </div>
                            )}
                            {item.price > 0 && (
                              <div className="flex items-center font-semibold">
                                <DollarSign className="w-4 h-4 mr-1" />
                                <span>{formatCurrency(item.price)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trip Summary */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-900">{tripDuration} days</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Flights</span>
                  <span className="font-semibold text-gray-900">
                    {items.filter((i) => i.type === 'flight').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Accommodations</span>
                  <span className="font-semibold text-gray-900">
                    {items.filter((i) => i.type === 'hotel').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Activities</span>
                  <span className="font-semibold text-gray-900">
                    {items.filter((i) => i.type === 'activity').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">Total Cost</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Forecast */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Weather Forecast</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Dec 15-18</span>
                  <span className="font-medium">12-15°C ☀️</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dec 19-22</span>
                  <span className="font-medium">10-13°C ⛅</span>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Pack warm clothes and a light jacket. Minimal rain expected.
                </p>
              </div>
            </div>

            {/* Packing List */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Packing Checklist</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 w-4 h-4 accent-primary-600" />
                  <span className="text-gray-700">Passport & Travel Documents</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 w-4 h-4 accent-primary-600" />
                  <span className="text-gray-700">International Adapter</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 w-4 h-4 accent-primary-600" />
                  <span className="text-gray-700">Camera & Chargers</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 w-4 h-4 accent-primary-600" />
                  <span className="text-gray-700">Comfortable Walking Shoes</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 w-4 h-4 accent-primary-600" />
                  <span className="text-gray-700">Medications</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                  Export to PDF
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                  Share with Friends
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
