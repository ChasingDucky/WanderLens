'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <AlertTriangle className="w-24 h-24 text-red-500 animate-pulse" />
              <div className="absolute inset-0 bg-red-500 opacity-20 blur-xl rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          We encountered an unexpected error while processing your request.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Don&apos;t worry, our team has been notified and we&apos;re working on it!
        </p>

        {/* Error Details (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={reset}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-medium">Try Again</span>
          </button>

          <Link
            href="/"
            className="flex items-center space-x-2 bg-white text-gray-900 border-2 border-gray-200 px-6 py-3 rounded-lg hover:border-primary-600 hover:shadow-lg transition-all"
          >
            <Home className="w-5 h-5 text-primary-600" />
            <span className="font-medium">Go Home</span>
          </Link>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-medium mb-2">
            If this problem persists:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Try refreshing your browser</li>
            <li>• Clear your browser cache and cookies</li>
            <li>• Check your internet connection</li>
            <li>
              • Contact{' '}
              <Link href="/help" className="underline font-medium">
                support
              </Link>{' '}
              if the issue continues
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
