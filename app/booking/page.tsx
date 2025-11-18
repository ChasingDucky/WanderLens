'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { CreditCard, User, Mail, Phone, MapPin, Calendar, CheckCircle, Wallet, Shield, Clock, Gift, Sparkles, Users } from 'lucide-react';

function BookingContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'flight';
  const itemId = searchParams.get('id') || '';

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple-pay' | 'google-pay' | 'alipay' | 'wechat' | 'pay-later'>('card');
  const [cancellationPolicy, setCancellationPolicy] = useState<'flexible' | 'moderate' | 'strict'>('flexible');
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'split' | 'installments'>('full');
  const [installmentOption, setInstallmentOption] = useState<3 | 4>(3);

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
              <div className="space-y-6">
                {/* Payment Method Selection */}
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <Wallet className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900">Choose Payment Method</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { value: 'card', label: 'Credit Card', icon: '💳' },
                      { value: 'paypal', label: 'PayPal', icon: '🅿️' },
                      { value: 'apple-pay', label: 'Apple Pay', icon: '🍎' },
                      { value: 'google-pay', label: 'Google Pay', icon: '🔵' },
                      { value: 'alipay', label: 'Alipay', icon: '🇨🇳' },
                      { value: 'wechat', label: 'WeChat', icon: '💬' },
                      { value: 'pay-later', label: 'Pay at Hotel', icon: '🏨', highlight: true },
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => setPaymentMethod(method.value as any)}
                        className={`relative p-4 border-2 rounded-xl transition-all ${
                          paymentMethod === method.value
                            ? 'border-rose-500 bg-rose-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                        } ${method.highlight ? 'ring-2 ring-green-400' : ''}`}
                      >
                        {method.highlight && (
                          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <div className="text-xs font-semibold text-gray-900">{method.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Pay Later Banner */}
                  {paymentMethod === 'pay-later' && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-5 mb-6">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-green-900 mb-2">Book Now, Pay Later</h3>
                          <p className="text-sm text-green-800 mb-3">
                            Reserve your room now without any upfront payment. Pay directly at the hotel during check-in or check-out.
                          </p>
                          <ul className="space-y-1 text-sm text-green-700">
                            <li>✓ No credit card required</li>
                            <li>✓ Free cancellation until 24 hours before check-in</li>
                            <li>✓ Pay in your preferred currency at the hotel</li>
                            <li>✓ Instant confirmation via email</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Details (only for non pay-later) */}
                {paymentMethod !== 'pay-later' && (
                  <div className="card">
                    <div className="flex items-center space-x-3 mb-6">
                      <CreditCard className="w-6 h-6 text-primary-600" />
                      <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                    </div>

                    {/* Payment Plan Selection */}
                    {paymentMethod === 'card' && (
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Payment Plan
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentPlan('full')}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${
                              paymentPlan === 'full'
                                ? 'border-rose-500 bg-rose-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className="font-bold text-gray-900 mb-1">Pay in Full</div>
                            <div className="text-sm text-gray-600">Pay entire amount now</div>
                            <div className="text-xs text-green-600 mt-2">✓ Best price</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentPlan('split')}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${
                              paymentPlan === 'split'
                                ? 'border-rose-500 bg-rose-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center space-x-1 mb-1">
                              <Users className="w-4 h-4 text-gray-900" />
                              <div className="font-bold text-gray-900">Split Payment</div>
                            </div>
                            <div className="text-sm text-gray-600">Split with friends</div>
                            <div className="text-xs text-blue-600 mt-2">✓ Share the cost</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentPlan('installments')}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${
                              paymentPlan === 'installments'
                                ? 'border-rose-500 bg-rose-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center space-x-1 mb-1">
                              <Calendar className="w-4 h-4 text-gray-900" />
                              <div className="font-bold text-gray-900">Installments</div>
                            </div>
                            <div className="text-sm text-gray-600">Pay over time</div>
                            <div className="text-xs text-purple-600 mt-2">✓ 0% interest</div>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Installment Options */}
                    {paymentPlan === 'installments' && paymentMethod === 'card' && (
                      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Choose Installment Plan
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setInstallmentOption(3)}
                            className={`p-3 border-2 rounded-lg transition-all ${
                              installmentOption === 3
                                ? 'border-purple-500 bg-white shadow-lg'
                                : 'border-purple-200 bg-white hover:border-purple-400'
                            }`}
                          >
                            <div className="font-bold text-gray-900">3 Payments</div>
                            <div className="text-sm text-gray-600">$323.33/month</div>
                            <div className="text-xs text-purple-600 mt-1">0% interest</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setInstallmentOption(4)}
                            className={`p-3 border-2 rounded-lg transition-all ${
                              installmentOption === 4
                                ? 'border-purple-500 bg-white shadow-lg'
                                : 'border-purple-200 bg-white hover:border-purple-400'
                            }`}
                          >
                            <div className="font-bold text-gray-900">4 Payments</div>
                            <div className="text-sm text-gray-600">$242.50/month</div>
                            <div className="text-xs text-purple-600 mt-1">0% interest</div>
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-3">
                          First payment due today. Remaining payments auto-charged monthly.
                        </p>
                      </div>
                    )}

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

                {/* Cancellation Policy */}
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900">Cancellation Policy</h2>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setCancellationPolicy('flexible')}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        cancellationPolicy === 'flexible'
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className={`w-5 h-5 ${cancellationPolicy === 'flexible' ? 'text-green-600' : 'text-gray-400'}`} />
                          <span className="font-bold text-gray-900">Flexible - Free Cancellation</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">Recommended</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">
                        Cancel anytime up to 24 hours before check-in for a full refund
                      </p>
                      <p className="text-xs text-gray-500 ml-7 mt-1">+ $0 (No extra charge)</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCancellationPolicy('moderate')}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        cancellationPolicy === 'moderate'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className={`w-5 h-5 ${cancellationPolicy === 'moderate' ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span className="font-bold text-gray-900">Moderate - 7 Days</span>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">Save 5%</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">
                        Cancel up to 7 days before check-in for a full refund
                      </p>
                      <p className="text-xs text-gray-500 ml-7 mt-1">-$48.50 discount applied</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCancellationPolicy('strict')}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        cancellationPolicy === 'strict'
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className={`w-5 h-5 ${cancellationPolicy === 'strict' ? 'text-purple-600' : 'text-gray-400'}`} />
                          <span className="font-bold text-gray-900">Strict - Non-Refundable</span>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">Save 10%</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">
                        Best price, but no refunds if you cancel
                      </p>
                      <p className="text-xs text-gray-500 ml-7 mt-1">-$97.00 discount applied</p>
                    </button>
                  </div>
                </div>

                {/* Price Protection */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-5">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-amber-900 mb-2">Price Match Guarantee + Protection</h3>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li className="flex items-start">
                          <span className="mr-2">🏆</span>
                          <span><strong>Best Price Guarantee:</strong> Found a lower price elsewhere? We&apos;ll match it and give you an extra 10% off</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">📉</span>
                          <span><strong>Price Drop Protection:</strong> If the price drops after booking, we&apos;ll refund the difference automatically</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">⚡</span>
                          <span><strong>Instant Confirmation:</strong> Your booking is confirmed immediately - no waiting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">🎁</span>
                          <span><strong>Loyalty Rewards:</strong> Earn 970 points with this booking (worth $9.70 on next trip)</span>
                        </li>
                      </ul>
                    </div>
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
                      {paymentMethod === 'pay-later' ? (
                        <p><span className="font-medium">Method:</span> Pay at Hotel (No upfront payment)</p>
                      ) : paymentMethod === 'card' ? (
                        <>
                          <p><span className="font-medium">Card:</span> •••• •••• •••• {formData.cardNumber.slice(-4)}</p>
                          <p><span className="font-medium">Name:</span> {formData.cardName}</p>
                          {paymentPlan === 'installments' && (
                            <p><span className="font-medium">Plan:</span> {installmentOption} monthly installments (0% interest)</p>
                          )}
                          {paymentPlan === 'split' && (
                            <p><span className="font-medium">Plan:</span> Split payment with friends</p>
                          )}
                        </>
                      ) : (
                        <p><span className="font-medium">Method:</span> {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'apple-pay' ? 'Apple Pay' : paymentMethod === 'google-pay' ? 'Google Pay' : paymentMethod === 'alipay' ? 'Alipay' : 'WeChat Pay'}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Cancellation Policy</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Policy:</span>{' '}
                        {cancellationPolicy === 'flexible' && 'Free cancellation until 24 hours before check-in'}
                        {cancellationPolicy === 'moderate' && 'Cancel up to 7 days before for full refund (5% discount)'}
                        {cancellationPolicy === 'strict' && 'Non-refundable (10% discount)'}
                      </p>
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

                {step >= 2 && (
                  <>
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                      <p className="font-medium text-gray-900">
                        {paymentMethod === 'pay-later' && '🏨 Pay at Hotel'}
                        {paymentMethod === 'card' && '💳 Credit Card'}
                        {paymentMethod === 'paypal' && '🅿️ PayPal'}
                        {paymentMethod === 'apple-pay' && '🍎 Apple Pay'}
                        {paymentMethod === 'google-pay' && '🔵 Google Pay'}
                        {paymentMethod === 'alipay' && '🇨🇳 Alipay'}
                        {paymentMethod === 'wechat' && '💬 WeChat Pay'}
                      </p>
                      {paymentMethod === 'card' && paymentPlan === 'installments' && (
                        <p className="text-xs text-purple-600 mt-1">
                          {installmentOption} monthly payments
                        </p>
                      )}
                    </div>

                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Cancellation</p>
                      <p className="font-medium text-gray-900">
                        {cancellationPolicy === 'flexible' && '✅ Free (until 24h)'}
                        {cancellationPolicy === 'moderate' && '📅 7 days (5% off)'}
                        {cancellationPolicy === 'strict' && '❌ Non-refundable (10% off)'}
                      </p>
                    </div>
                  </>
                )}

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border-2 border-rose-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Base Price</span>
                    <span className="font-medium text-gray-900">$850.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Taxes & Fees</span>
                    <span className="font-medium text-gray-900">$120.00</span>
                  </div>

                  {step >= 2 && cancellationPolicy === 'moderate' && (
                    <div className="flex items-center justify-between mb-2 text-blue-600">
                      <span>Moderate Cancellation (5% off)</span>
                      <span>-$48.50</span>
                    </div>
                  )}

                  {step >= 2 && cancellationPolicy === 'strict' && (
                    <div className="flex items-center justify-between mb-2 text-purple-600">
                      <span>Non-refundable (10% off)</span>
                      <span>-$97.00</span>
                    </div>
                  )}

                  <div className="border-t-2 border-rose-300 pt-3 mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-rose-600 text-2xl">
                        ${step >= 2
                          ? cancellationPolicy === 'moderate'
                            ? '921.50'
                            : cancellationPolicy === 'strict'
                              ? '873.00'
                              : '970.00'
                          : '970.00'}
                      </span>
                    </div>
                    {step >= 2 && paymentMethod === 'card' && paymentPlan === 'installments' && (
                      <p className="text-xs text-purple-600 text-right">
                        or ${(parseFloat(
                          cancellationPolicy === 'moderate'
                            ? '921.50'
                            : cancellationPolicy === 'strict'
                              ? '873.00'
                              : '970.00'
                        ) / installmentOption).toFixed(2)}/month × {installmentOption}
                      </p>
                    )}
                    {step >= 2 && cancellationPolicy !== 'flexible' && (
                      <p className="text-xs text-green-600 text-right mt-1">
                        You saved $
                        {cancellationPolicy === 'moderate' ? '48.50' : '97.00'}!
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Benefits */}
                {step >= 2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-amber-900">Included Benefits</span>
                    </div>
                    <ul className="space-y-1 text-xs text-amber-800">
                      <li>✓ Price match guarantee</li>
                      <li>✓ Price drop protection</li>
                      <li>✓ Instant confirmation</li>
                      <li>✓ Earn {step >= 2 ? (cancellationPolicy === 'moderate' ? '922' : cancellationPolicy === 'strict' ? '873' : '970') : '970'} reward points</li>
                      <li>✓ 24/7 customer support</li>
                    </ul>
                  </div>
                )}
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
