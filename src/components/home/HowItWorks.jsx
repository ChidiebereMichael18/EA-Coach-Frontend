import React from 'react';
import { Search, List, Grid, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Choose your destination and date to view available buses.',
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
  },
  {
    icon: List,
    title: 'Compare',
    description: 'Compare prices, times, and operators side by side.',
    color: 'from-orange-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  },
  {
    icon: Grid,
    title: 'Pick Seats',
    description: 'Select your preferred seats in an interactive layout.',
    color: 'from-green-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=400&h=300&fit=crop'
  },
  {
    icon: CreditCard,
    title: 'Pay & Go',
    description: 'Pay via Card, MTN MoMo, Airtel Money and you\'re set.',
    color: 'from-purple-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
  }
];

const HowItWorks = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Book your bus ticket in four simple steps
      </p>

      <div className="relative">
        {/* Connection Line (hidden on mobile) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 -mt-10 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mr-2">
                        {index + 1}.
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;