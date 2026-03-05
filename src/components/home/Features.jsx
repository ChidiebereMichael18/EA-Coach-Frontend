import React from 'react';
import { Clock, Globe, Shield, CreditCard, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Easy Booking',
    description: 'Simple and quick booking process. Find and book your bus in minutes.',
    color: 'primary',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop'
  },
  {
    icon: Globe,
    title: 'Wide Network',
    description: 'Travel to any district in Uganda and East African countries.',
    color: 'secondary',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop'
  },
  {
    icon: Shield,
    title: 'Trusted Operators',
    description: 'Travel with Uganda\'s most reliable and comfortable bus companies.',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
  }
];

const Features = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EA Coach?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the best bus booking service in East Africa with our premium features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const colorClasses = {
            primary: 'bg-blue-100 text-primary',
            secondary: 'bg-orange-100 text-secondary',
            green: 'bg-green-100 text-green-600'
          };

          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 group-hover:text-white transition-colors duration-300">
                <div className={`w-16 h-16 rounded-xl ${colorClasses[feature.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;