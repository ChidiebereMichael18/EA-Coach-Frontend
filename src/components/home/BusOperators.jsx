import React from 'react';
import { Star, Users, Award } from 'lucide-react';

const operators = [
  {
    name: 'Nile Star Buses',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
    rating: 4.5,
    routes: '15+',
    experience: '10+ years',
    description: 'Reliable routes across Uganda and cross-border.',
    features: ['AC', 'WiFi', 'USB Charging']
  },
  {
    name: 'Gateway Bus Service',
    image: '/gateway.jpeg',
    rating: 4.3,
    routes: '20+',
    experience: '15+ years',
    description: 'Comfortable coaches with frequent departures.',
    features: ['AC', 'Entertainment', 'Snacks']
  },
  {
    name: 'Jaguar Executive Coaches',
    image: '/Jaguar.jpeg',
    rating: 4.7,
    routes: '12+',
    experience: '8+ years',
    description: 'Premium coaches for regional travel.',
    features: ['AC', 'WiFi', 'USB', 'Meals']
  },
  {
    name: 'Trinity Bus',
    image: '/trinity.jpeg',
    rating: 4.2,
    routes: '18+',
    experience: '12+ years',
    description: 'Affordable fares with wide coverage.',
    features: ['AC', 'WiFi', 'Comfortable Seats']
  },
  {
    name: 'KK Coaches',
    image: '/KK new coach 2.jpg.opt1082x804o0,0s1082x804.jpg',
    rating: 4.6,
    routes: '14+',
    experience: '20+ years',
    description: 'Comfort and punctuality on key routes.',
    features: ['AC', 'WiFi', 'USB', 'Entertainment']
  },
  {
    name: 'Mash Poa Buses',
    image: '/mash poa.jpeg',
    rating: 4.4,
    routes: '10+',
    experience: '7+ years',
    description: 'Trusted cross-border connections.',
    features: ['AC', 'WiFi', 'Comfort']
  }
];

const BusOperators = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Bus Operators</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Travel with East Africa's most trusted and comfortable bus companies
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operators.map((operator, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={operator.image}
                alt={operator.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">{operator.rating}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {operator.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{operator.description}</p>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>{operator.routes} routes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award size={16} />
                  <span>{operator.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {operator.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusOperators;