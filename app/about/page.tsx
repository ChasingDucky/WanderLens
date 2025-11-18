import Navbar from '@/components/Navbar';
import { Plane, Users, Leaf, Award, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: 'User-Centric',
      description: 'We put travelers first, designing every feature with your needs in mind.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Promoting eco-friendly travel choices and carbon-conscious decisions.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering the highest quality service and most accurate information.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love travel and are dedicated to making it accessible to everyone.',
    },
  ];

  const team = [
    {
      name: 'AI Innovation Team',
      role: 'Platform Development',
      description: 'Building intelligent travel solutions for the modern explorer',
    },
    {
      name: 'Data Science Team',
      role: 'Price Predictions',
      description: 'Creating accurate models to help you save money',
    },
    {
      name: 'UX Design Team',
      role: 'User Experience',
      description: 'Crafting intuitive interfaces for seamless planning',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About WanderLens</h1>
            <p className="text-xl text-primary-50 max-w-3xl mx-auto">
              Revolutionizing travel planning through AI-powered insights, price intelligence,
              and sustainable travel choices.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At WanderLens, we believe that travel should be accessible, affordable, and sustainable.
              Our mission is to empower travelers with intelligent tools and data-driven insights to
              make the best decisions for their journeys.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We combine cutting-edge AI technology with comprehensive travel data to provide
              personalized recommendations, accurate price predictions, and eco-friendly alternatives.
            </p>
            <p className="text-lg text-gray-700">
              Whether you&apos;re a business traveler, adventure seeker, or vacation planner,
              WanderLens is your intelligent companion for seamless trip planning.
            </p>
          </div>
          <div className="bg-primary-50 rounded-2xl p-8 border-2 border-primary-200">
            <div className="flex items-center mb-6">
              <Target className="w-12 h-12 text-primary-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 text-lg">
              To become the world&apos;s most trusted travel planning platform, helping millions
              of travelers discover, plan, and book their perfect trips while promoting
              sustainable and responsible tourism.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">200+</p>
              <p className="text-primary-50">Destinations</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50K+</p>
              <p className="text-primary-50">Flights Tracked</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="text-primary-50">Hotels Listed</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">95%</p>
              <p className="text-primary-50">User Satisfaction</p>
            </div>
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
