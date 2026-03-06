import React, { useState } from 'react';
import { MapPin, Calendar, Search, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  });

 const ugandaLocations = [
    'Kampala',
    'Jinja',
    'Mbarara',
    'Gulu',
    'Lira',
    'Arua',
    'Masaka',
    'Mbale',
    'Fort Portal',
    'Kabale',
    'Kasese',
    'Soroti',
    'Kitgum',
    'Hoima','Nairobi', 'Kigali', 'Dar es Salaam'
  ];

  const destinations = [
    'Kampala',
    'Jinja',
    'Mbarara',
    'Gulu',
    'Lira',
    'Arua',
    'Masaka',
    'Mbale',
    'Fort Portal',
    'Kabale',
    'Kasese',
    'Soroti',
    'Kitgum',
    'Hoima', 'Nairobi', 'Kigali', 'Dar es Salaam'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search
    console.log('Searching:', formData);
  };

  return (
    <section className="relative rounded-2xl overflow-hidden mb-16">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=400&fit=crop" 
          alt="Bus travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-orange-500/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Travel Comfortably Across <span className="text-yellow-300">Uganda</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Compare prices, choose your seat, and book instantly with trusted bus operators across East Africa.
          </p>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* From Field */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    <MapPin className="inline-block mr-2 text-blue-600" size={18} />
                    From
                  </label>
                  <select
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium transition-all"
                  >
                    <option value="">Select departure city</option>
                    {ugandaLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* To Field */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    <MapPin className="inline-block mr-2 text-orange-600" size={18} />
                    To
                  </label>
                  <select
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-800 font-medium transition-all"
                  >
                    <option value="">Select destination</option>
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                {/* Date Field */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    <Calendar className="inline-block mr-2 text-green-600" size={18} />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group self-end"
                >
                  <Search size={20} />
                  <span>Search</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm opacity-90">Daily Trips</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm opacity-90">Bus Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;