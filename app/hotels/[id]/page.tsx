'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { mockHotels } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  MapPin,
  Star,
  Users,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  Wind,
  Car,
  Shield,
  ArrowLeft,
  Award,
  TrendingUp,
  CheckCircle,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const hotel = mockHotels.find(h => h.id === id);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
          <button onClick={() => router.back()} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    Pool: Wind,
    Gym: Dumbbell,
    Restaurant: Utensils,
    Spa: Award,
    Bar: Coffee,
    'Room Service': Users,
    Parking: Car,
  };

  const getScoreColor = (score: number) => {
    if (score >= 9.0) return 'bg-green-600';
    if (score >= 8.0) return 'bg-blue-600';
    if (score >= 7.0) return 'bg-yellow-600';
    return 'bg-orange-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9.0) return 'Exceptional';
    if (score >= 8.0) return 'Excellent';
    if (score >= 7.0) return 'Very Good';
    return 'Good';
  };

  const roomTypes = [
    {
      name: 'Standard Room',
      price: hotel.price,
      description: 'Comfortable room with city views',
      capacity: 2,
      size: '25 m²',
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
    },
    {
      name: 'Deluxe Room',
      price: hotel.price * 1.5,
      description: 'Spacious room with premium amenities',
      capacity: 2,
      size: '35 m²',
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'City View', 'Bathtub'],
    },
    {
      name: 'Suite',
      price: hotel.price * 2.2,
      description: 'Luxury suite with separate living area',
      capacity: 4,
      size: '60 m²',
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'City View', 'Bathtub', 'Balcony', 'Coffee Machine'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to results</span>
        </button>

        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
                <div className="flex items-center">
                  {Array.from({ length: hotel.stars }, (_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
              </div>
              <p className="text-gray-600">{hotel.distanceToCenter.toFixed(1)} km from city center</p>
            </div>
            <div className="text-right">
              <div className={`${getScoreColor(hotel.reviewScore)} text-white px-4 py-3 rounded-lg mb-2`}>
                <span className="text-2xl font-bold">{hotel.reviewScore.toFixed(1)}</span>
              </div>
              <p className="text-lg font-medium text-gray-900">{getScoreLabel(hotel.reviewScore)}</p>
              <p className="text-sm text-gray-600">{hotel.reviewCount.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <Image
                src={hotel.images[0]}
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative h-44 overflow-hidden rounded-lg">
                  <Image
                    src={hotel.images[0]}
                    alt={`${hotel.name} - View ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary w-full text-lg py-4">
            Reserve Now - Starting from {formatCurrency(hotel.price, hotel.currency)}/night
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Hotel</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {hotel.name} is a {hotel.stars}-star hotel located in the heart of {hotel.city}.
                With its exceptional service, modern amenities, and prime location, it offers the perfect
                base for exploring the city. Just {hotel.distanceToCenter.toFixed(1)} km from the city center,
                guests can easily access major attractions and business districts.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our hotel features {hotel.amenities.length} premium amenities including {hotel.amenities.slice(0, 3).join(', ')},
                and more. Whether you&apos;re traveling for business or leisure, our dedicated staff ensures
                a memorable stay with personalized service and attention to detail.
              </p>
            </div>

            {/* Amenities */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hotel Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || CheckCircle;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-green-50"
                    >
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Types */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <div key={room.name} className="border border-gray-200 rounded-lg p-4 hover:border-primary-600 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{room.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{room.capacity} guests</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>{room.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {formatCurrency(room.price, hotel.currency)}
                        </p>
                        <p className="text-sm text-gray-600">per night</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <button className="btn-primary w-full">
                      Select Room
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">House Rules</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Check-in</p>
                    <p className="text-sm text-gray-600">From 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Check-out</p>
                    <p className="text-sm text-gray-600">Until 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Cancellation</p>
                    <p className="text-sm text-gray-600">Free cancellation up to 24 hours before arrival</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Payment</p>
                    <p className="text-sm text-gray-600">Payment required at booking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="card sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Rate (per night)</span>
                  <span className="font-medium">{formatCurrency(hotel.price * 0.85)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">{formatCurrency(hotel.price * 0.10)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">{formatCurrency(hotel.price * 0.05)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total per night</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(hotel.price)}
                  </span>
                </div>
              </div>
              <button className="btn-primary w-full mt-4">
                Reserve Now
              </button>
            </div>

            {/* Why Book Here */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Why Book Here?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  <span>Highly rated ({hotel.reviewScore}/10) by {hotel.reviewCount.toLocaleString()} guests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  <span>Prime location - {hotel.distanceToCenter.toFixed(1)}km from center</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  <span>Free cancellation available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  <span>{hotel.amenities.length}+ premium amenities</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-4 h-4" />
                  <span>+1 234 567 8900</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <span>info@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Globe className="w-4 h-4" />
                  <span>www.{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Location Highlights</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary-600" />
                  <span>{hotel.distanceToCenter.toFixed(1)}km from {hotel.city} city center</span>
                </p>
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary-600" />
                  <span>Near major attractions and landmarks</span>
                </p>
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary-600" />
                  <span>Easy access to public transportation</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
