import Link from 'next/link';
import { Home, Search, Plane, Hotel, Calendar } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-600 opacity-20 mb-4">404</div>
          <div className="flex justify-center space-x-4 mb-6">
            <Plane className="w-12 h-12 text-primary-400 animate-bounce" style={{ animationDelay: '0s' }} />
            <Hotel className="w-12 h-12 text-blue-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <Calendar className="w-12 h-12 text-emerald-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Oops! Lost in Transit
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Looks like this page has taken an unexpected detour. Let&apos;s get you back on track!
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/"
            className="group flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-4 hover:border-primary-600 hover:shadow-lg transition-all"
          >
            <Home className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-gray-900">Go Home</span>
          </Link>

          <Link
            href="/flights"
            className="group flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-4 hover:border-primary-600 hover:shadow-lg transition-all"
          >
            <Plane className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-gray-900">Search Flights</span>
          </Link>

          <Link
            href="/hotels"
            className="group flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-4 hover:border-primary-600 hover:shadow-lg transition-all"
          >
            <Hotel className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-gray-900">Find Hotels</span>
          </Link>

          <Link
            href="/itinerary"
            className="group flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-4 hover:border-primary-600 hover:shadow-lg transition-all"
          >
            <Calendar className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-gray-900">Plan Trip</span>
          </Link>
        </div>

        {/* Help Link */}
        <p className="text-gray-600">
          Need help?{' '}
          <Link href="/help" className="text-primary-600 hover:text-primary-700 font-medium underline">
            Visit our Help Center
          </Link>
        </p>
      </div>
    </div>
  );
}
