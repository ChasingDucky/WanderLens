'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { CreditCard, User, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';

function BookingContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'flight';
  const itemId = searchParams.get('id') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Confirmation step
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">
            Book your {type} - just a few steps away from your adventure!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: 'Personal Info' },
              { number: 2, title: 'Payment' },
              { number: 3, title: 'Review' },
            ].map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s.number}
                  </div>
                  <span
                    className={`text-sm mt-2 font-medium ${
                      step >= s.number ? 'text-primary-600' : 'text-gray-600'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all ${
                      step > s.number ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="New York"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="10001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      required
                      maxLength={19}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="JOHN DOE"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        required
                        maxLength={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        required
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-blue-900">
                      🔒 Your payment information is secure and encrypted. We never store your full credit card details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-gray-900">Review Your Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Personal Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium">Email:</span> {formData.email}</p>
                      <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                      {formData.address && (
                        <p><span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.zipCode}, {formData.country}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Payment Method</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Card:</span> •••• •••• •••• {formData.cardNumber.slice(-4)}</p>
                      <p><span className="font-medium">Name:</span> {formData.cardName}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-900">
                      By completing this booking, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="card text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your booking. A confirmation email has been sent to {formData.email}
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-sm text-green-900 mb-2 font-medium">Confirmation Number</p>
                  <p className="text-2xl font-bold text-green-700">WL-{Date.now().toString(36).toUpperCase()}</p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => window.location.href = '/'}
                    className="btn-secondary"
                  >
                    Back to Home
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-primary"
                  >
                    Print Confirmation
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="font-medium text-gray-900 capitalize">{type}</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">ID</p>
                  <p className="font-medium text-gray-900">{itemId || 'N/A'}</p>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium text-gray-900">$850.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Taxes & Fees</span>
                    <span className="font-medium text-gray-900">$120.00</span>
                  </div>
                  <div className="border-t border-primary-200 pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-primary-600 text-xl">$970.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
