import { Plane } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <Plane className="w-16 h-16 text-primary-600 mx-auto animate-bounce" />
          <div className="absolute inset-0 bg-primary-600 opacity-20 blur-2xl rounded-full animate-pulse"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading WanderLens</h2>
        <p className="text-gray-600">Preparing your travel experience...</p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
