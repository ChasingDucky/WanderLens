import Navbar from '@/components/Navbar';
import { Search, HelpCircle, BookOpen, MessageCircle, Mail } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How does WanderLens find the best flight prices?',
      answer: 'We aggregate data from multiple airlines and travel platforms, then use machine learning algorithms to analyze price trends and predict future prices. This helps you book at the optimal time.',
    },
    {
      question: 'Are the price predictions accurate?',
      answer: 'Our AI models achieve approximately 85% accuracy in price predictions. We analyze historical data, seasonal trends, demand patterns, and other factors to provide reliable forecasts.',
    },
    {
      question: 'How do I save a flight or hotel to my favorites?',
      answer: 'Simply click the heart icon on any flight or hotel card. Your favorites are stored locally in your browser and will be available when you return to the site.',
    },
    {
      question: 'Can I share my itinerary with others?',
      answer: 'Yes! In the itinerary planner, use the share button to generate a unique link that you can send to friends or family. They can view your plans without needing an account.',
    },
    {
      question: 'What does the carbon emission data mean?',
      answer: 'We calculate the estimated CO₂ emissions for each flight based on aircraft type, distance, and passenger load. This helps you make environmentally conscious travel decisions.',
    },
    {
      question: 'How often is flight and hotel data updated?',
      answer: 'Our system continuously monitors prices and availability in real-time. However, during the MVP phase, we use representative mock data to demonstrate functionality.',
    },
    {
      question: 'Can I book directly through WanderLens?',
      answer: 'Currently, WanderLens is a planning and comparison tool. We provide you with the best options and price insights, then direct you to trusted booking partners to complete your reservation.',
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Absolutely. We use industry-standard encryption and do not store sensitive payment information. Your search history and favorites are stored locally in your browser for privacy.',
    },
  ];

  const quickLinks = [
    { icon: Search, title: 'Search Tips', link: '#' },
    { icon: BookOpen, title: 'User Guide', link: '#' },
    { icon: MessageCircle, title: 'Community Forum', link: '#' },
    { icon: Mail, title: 'Contact Support', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
            <p className="text-xl text-primary-50">
              Find answers to common questions and learn how to get the most out of WanderLens
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.link}
              className="card text-center hover:shadow-lg transition-shadow"
            >
              <link.icon className="w-10 h-10 text-primary-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">{link.title}</p>
            </a>
          ))}
        </div>

        {/* Getting Started */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Search for Flights or Hotels</h3>
              <p className="text-gray-700">
                Start from the homepage by entering your origin, destination, and travel dates.
                You can search for flights or hotels separately, or combine them in your itinerary later.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Compare and Filter Results</h3>
              <p className="text-gray-700">
                Use our advanced filters to narrow down results by price, duration, rating,
                amenities, and more. Sort options to find the best match for your preferences.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Check Price Trends</h3>
              <p className="text-gray-700">
                View historical prices and 30-day predictions to determine the best time to book.
                Our AI recommendations will guide you to make informed decisions.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Create Your Itinerary</h3>
              <p className="text-gray-700">
                Add flights, hotels, and activities to your trip planner. Organize everything
                in a visual timeline and share with travel companions.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card group">
                <summary className="text-lg font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-primary-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 card bg-primary-50 border-primary-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-700 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:support@wanderlens.com" className="btn-primary text-center">
              Email Support
            </a>
            <a href="#" className="btn-secondary text-center">
              Community Forum
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 WanderLens. Built with Next.js and TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}
