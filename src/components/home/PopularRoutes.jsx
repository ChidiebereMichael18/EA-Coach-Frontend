import React from 'react';
import { ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const routes = [
  {
    from: 'Kampala',
    to: 'Jinja',
    price: '15,000',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1570184016201-34e6393eea46?w=640&h=360&fit=crop',
    departure: '06:00 AM'
  },
  {
    from: 'Kampala',
    to: 'Mbarara',
    price: '25,000',
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1583248363044-1c6d2e3b1e2a?w=640&h=360&fit=crop',
    departure: '07:00 AM'
  },
  {
    from: 'Kampala',
    to: 'Gulu',
    price: '30,000',
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=640&h=360&fit=crop',
    departure: '08:00 AM'
  },
  {
    from: 'Kampala',
    to: 'Nairobi',
    price: '50,000',
    duration: '12 hours',
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=640&h=360&fit=crop',
    departure: '06:00 PM'
  }
];

const PopularRoutes = () => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Routes</h2>
          <p className="text-gray-600">Most booked routes this week</p>
        </div>
        <Link
          to="/routes"
          className="hidden md:flex items-center space-x-2 text-primary hover:text-blue-600 font-semibold group"
        >
          <span>View all routes</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={route.image}
                alt={`${route.from} to ${route.to}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white">
                <MapPin size={14} />
                <span className="text-sm">{route.from} → {route.to}</span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{route.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-primary font-bold">
                  <DollarSign size={16} />
                  <span>UGX {route.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">Departs: </span>
                  <span className="font-semibold">{route.departure}</span>
                </div>
                <Link
                  to={`/booking?from=${route.from}&to=${route.to}`}
                  className="bg-blue-500/10 text-primary px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors text-sm font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view all link */}
      <div className="mt-6 text-center md:hidden">
        <Link
          to="/routes"
          className="inline-flex items-center space-x-2 text-primary hover:text-blue-600 font-semibold"
        >
          <span>View all routes</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default PopularRoutes;