import React from 'react';
import { Search, List, Grid, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Choose your destination and date to view available buses.',
    color: 'from-blue-500 to-blue-600',
    image: '/routes/search.webp'
  },
  {
    icon: List,
    title: 'Compare',
    description: 'Compare prices, times, and operators side by side.',
    color: 'from-orange-500 to-orange-600',
    image: '/routes/comparee.webp'
  },
  {
    icon: Grid,
    title: 'Pick Seats',
    description: 'Select your preferred seats in an interactive layout.',
    color: 'from-green-500 to-green-600',
    image: '/buses/bus6.jpg'
  },
  {
    icon: CreditCard,
    title: 'Pay & Go',
    description: 'Pay via Card, MTN MoMo, Airtel Money and you\'re set.',
    color: 'from-purple-500 to-purple-600',
    image: '/routes/pay.webp'
  }
];

const HowItWorks = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Book your bus ticket in four simple steps
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="group relative">
              {/* Arrow connector (between cards, desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-28 z-10 items-center justify-center w-6 h-6">
                  <svg className="text-gray-300 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl h-full flex flex-col">

                {/* Image block — tall, with gradient overlay */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark gradient from bottom for icon area */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Step number badge — top left */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <span className={`text-sm font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon — bottom left, on overlay */}
                  <div className={`absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="text-white" size={22} />
                  </div>
                </div>

                {/* Text content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;