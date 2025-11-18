'use client';

import Link from 'next/link';
import { Plane, Hotel, MapPin, Menu, X, Info, HelpCircle, Settings, Sparkles, Bot } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              WanderLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/flights"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Plane className="w-5 h-5" />
              <span className="font-medium">Flights</span>
            </Link>
            <Link
              href="/hotels"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Hotel className="w-5 h-5" />
              <span className="font-medium">Hotels</span>
            </Link>
            <Link
              href="/itinerary"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Itinerary</span>
            </Link>
            <Link
              href="/ai-planner"
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-medium text-sm">AI Planner</span>
            </Link>
            <Link
              href="/agents"
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span className="font-medium text-sm">AI助手</span>
            </Link>
            <div className="border-l border-gray-300 h-6"></div>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              href="/flights"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plane className="w-5 h-5" />
              <span className="font-medium">Flights</span>
            </Link>
            <Link
              href="/hotels"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Hotel className="w-5 h-5" />
              <span className="font-medium">Hotels</span>
            </Link>
            <Link
              href="/itinerary"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Itinerary</span>
            </Link>
            <div className="border-t border-gray-300 my-2"></div>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
