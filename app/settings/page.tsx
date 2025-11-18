'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Settings, Globe, DollarSign, Bell, User, Shield, Moon, Sun, Bot, Crown, Key, Eye, EyeOff } from 'lucide-react';
import { MembershipTier } from '@/types';
import { MEMBERSHIP_TIERS, getMembershipByTier } from '@/lib/membership';

interface UserSettings {
  currency: string;
  language: string;
  notifications: {
    priceAlerts: boolean;
    bookingUpdates: boolean;
    promotions: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  displayName: string;
  email: string;
}

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    currency: 'USD',
    language: 'en',
    notifications: {
      priceAlerts: true,
      bookingUpdates: true,
      promotions: false,
    },
    theme: 'light',
    displayName: '',
    email: '',
  });

  const [geminiToken, setGeminiToken] = useState('');
  const [membershipTier, setMembershipTier] = useState<MembershipTier>('standard');
  const [showToken, setShowToken] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('wanderlens_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      const storedToken = localStorage.getItem('geminiToken');
      const storedTier = localStorage.getItem('membershipTier') as MembershipTier;
      if (storedToken) setGeminiToken(storedToken);
      if (storedTier) setMembershipTier(storedTier);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('wanderlens_settings', JSON.stringify(settings));
    localStorage.setItem('geminiToken', geminiToken);
    localStorage.setItem('membershipTier', membershipTier);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateNotification = (key: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Settings className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">Manage your preferences and account settings</p>
        </div>

        {/* Save Success Banner */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-green-800 font-medium">Settings saved successfully!</p>
          </div>
        )}

        <div className="space-y-8">
          {/* AI Configuration Section */}
          <div className="card border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center space-x-3 mb-6">
              <Bot className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">AI助手配置</h2>
              <div className="flex-1"></div>
              <div className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                AI功能
              </div>
            </div>

            <div className="space-y-8">
              {/* Membership Tier Selection - Booking Genius Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Crown className="w-4 h-4 inline mr-1" />
                  会员等级 (Genius会员体系)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isSelected = membershipTier === tier.tier;
                    const bgClass = isSelected
                      ? tier.tier === 'gold'
                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50'
                        : tier.tier === 'silver'
                        ? 'border-slate-500 bg-gradient-to-br from-slate-50 to-gray-50'
                        : 'border-gray-600 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white';

                    const textClass = isSelected
                      ? tier.tier === 'gold'
                        ? 'text-amber-600'
                        : tier.tier === 'silver'
                        ? 'text-slate-600'
                        : 'text-gray-700'
                      : 'text-gray-900';

                    return (
                      <button
                        key={tier.tier}
                        onClick={() => setMembershipTier(tier.tier)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${bgClass}`}
                      >
                        <div className="text-3xl mb-2">{tier.icon}</div>
                        <p className={`font-bold mb-1 text-sm ${textClass}`}>
                          {tier.displayName}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">{tier.aiModel}</p>
                        {tier.discount > 0 && (
                          <div className="mb-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                            {tier.discount}% 全站折扣
                          </div>
                        )}
                        {tier.bookingsRequired > 0 && (
                          <p className="text-xs text-gray-500 mb-2">
                            需要 {tier.bookingsRequired} 次预订
                          </p>
                        )}
                        <ul className="text-xs text-left space-y-1 text-gray-600">
                          {tier.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx}>✓ {benefit}</li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gemini API Token */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Key className="w-4 h-4 inline mr-1" />
                  Gemini API Token
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={geminiToken}
                    onChange={(e) => setGeminiToken(e.target.value)}
                    placeholder="输入您的 Gemini API Token"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                  >
                    {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800 mb-2">
                    <span className="font-semibold">如何获取 API Token：</span>
                  </p>
                  <ol className="text-xs text-blue-700 space-y-1 ml-4 list-decimal">
                    <li>访问 <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google AI Studio</a></li>
                    <li>登录您的 Google 账号</li>
                    <li>点击 &quot;Create API Key&quot; 创建新密钥</li>
                    <li>复制密钥并粘贴到上方输入框</li>
                  </ol>
                </div>
              </div>

              {/* Model Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">当前配置</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">会员等级：</span>
                    <span className={`font-semibold flex items-center gap-1 ${
                      membershipTier === 'gold'
                        ? 'text-amber-600'
                        : membershipTier === 'silver'
                        ? 'text-slate-600'
                        : 'text-gray-700'
                    }`}>
                      {getMembershipByTier(membershipTier).displayName} {getMembershipByTier(membershipTier).icon}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">使用模型：</span>
                    <span className="font-semibold text-purple-600">
                      {getMembershipByTier(membershipTier).aiModel}
                    </span>
                  </div>
                  {getMembershipByTier(membershipTier).discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">专属折扣：</span>
                      <span className="font-semibold text-red-600">
                        {getMembershipByTier(membershipTier).discount}% OFF
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token状态：</span>
                    <span className={`font-semibold ${geminiToken ? 'text-green-600' : 'text-red-600'}`}>
                      {geminiToken ? '✓ 已配置' : '✗ 未配置'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(e) => setSettings(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Regional Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    Price Alerts
                  </p>
                  <p className="text-sm text-gray-600">
                    Get notified when prices drop for your saved searches
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.notifications.priceAlerts}
                    onChange={() => updateNotification('priceAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    Booking Updates
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive updates about your bookings and trips
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.notifications.bookingUpdates}
                    onChange={() => updateNotification('bookingUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    Promotions & Offers
                  </p>
                  <p className="text-sm text-gray-600">
                    Get exclusive deals and promotional offers
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.notifications.promotions}
                    onChange={() => updateNotification('promotions')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Moon className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Theme Preference
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'auto', label: 'Auto', icon: Settings },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSettings(prev => ({ ...prev, theme: value as any }))}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      settings.theme === value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      settings.theme === value ? 'text-primary-600' : 'text-gray-600'
                    }`} />
                    <p className={`text-sm font-medium ${
                      settings.theme === value ? 'text-primary-600' : 'text-gray-900'
                    }`}>
                      {label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Clear Search History</p>
                  <p className="text-sm text-gray-600">Remove all saved searches</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                  Clear
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Clear Favorites</p>
                  <p className="text-sm text-gray-600">Remove all bookmarked items</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
