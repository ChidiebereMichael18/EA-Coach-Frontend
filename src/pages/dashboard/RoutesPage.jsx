import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getBuses } from '../../api/busApi';
import {
  Bus,
  ArrowRight,
  Star,
  Wifi,
  Wind,
  Zap,
  Coffee,
  Tv,
  Shield,
  Grid3x3,
  List,
  Download,
  Share2,
  Loader,
  Calendar,
} from 'lucide-react';

// Local image pool — cycled by index so images always show
const IMAGE_POOL = [
  '/routes/img2.jpg',
  '/routes/img3.jpg',
  '/routes/img4.jpg',
  '/routes/img5.jpg',
  '/routes/img6.jpg',
  '/routes/jinja2.jpg',
  '/routes/img7.jpg',
  '/routes/img8.jpg',
  '/routes/img9.jpg',
];

function mapBusToRoute(bus, index) {
  const a = bus.amenities || {};
  const amenities = [
    a.wifi && 'wifi',
    a.ac && 'ac',
    a.usbCharging && 'usb',
    a.entertainment && 'entertainment',
    a.bulletproof && 'blanket',
  ].filter(Boolean);

  return {
    id: bus._id,
    from: bus.route?.from || '—',
    to: bus.route?.to || '—',
    price: bus.route?.price ?? 0,
    busCompany: bus.operator?.name || '—',
    busType: bus.busType || 'Standard',
    departureTime: bus.route?.departureTime || '—',
    arrivalTime: bus.route?.arrivalTime || '—',
    departureDate: bus.route?.departureDate
      ? new Date(bus.route.departureDate).toISOString().split('T')[0]
      : null,
    availableSeats: bus.totalSeats ?? 53,
    totalSeats: bus.totalSeats ?? 53,
    amenities,
    rating: 4.5,
    image: IMAGE_POOL[index % IMAGE_POOL.length],
    busNumber: bus.busNumber || '—',
    stops: [bus.route?.from, bus.route?.to].filter(Boolean),
  };
}

const RoutesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getBuses()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setRoutes(res.data.map(mapBusToRoute));
        } else {
          setError(res.errorMessage || 'Failed to load routes.');
        }
      })
      .catch(() => setError('Failed to load routes.'))
      .finally(() => setIsLoading(false));
  }, []);

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi size={14} />;
      case 'ac': return <Wind size={14} />;
      case 'usb': return <Zap size={14} />;
      case 'entertainment': return <Tv size={14} />;
      case 'snacks': return <Coffee size={14} />;
      case 'blanket': return <Shield size={14} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Explore Routes Across East Africa
          </h1>
          <p className="text-gray-600">
            Discover popular bus routes connecting Uganda with neighboring countries and cities
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Loader size={36} className="animate-spin mb-4 text-blue-500" />
            <p className="text-sm">Loading routes from the network...</p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
            <p className="font-semibold">Couldn't load routes</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && routes.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            <div className="text-5xl mb-4">🚌</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No routes available yet</h3>
            <p className="text-sm">Check back later or ask the admin to add buses.</p>
          </div>
        )}

        {/* Routes Grid / List */}
        {!isLoading && !error && routes.length > 0 && (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {routes.map((route) => (
              <div
                key={route.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Image */}
                <div className={viewMode === 'list' ? 'md:w-64 flex-shrink-0' : ''}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={route.image}
                      alt={`${route.from} to ${route.to}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{route.rating}</span>
                    </div>
                    {/* Departure date badge */}
                    {route.departureDate && (
                      <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                        <Calendar size={12} className="text-white" />
                        <span className="text-xs text-white font-medium">
                          {new Date(route.departureDate).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{route.from} → {route.to}</h3>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                      {route.busType}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Bus size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{route.busCompany}</span>
                    <span className="text-xs text-gray-400">• {route.busNumber}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Departure</p>
                      <p className="font-semibold">{route.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Arrival</p>
                      <p className="font-semibold">{route.arrivalTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seats</p>
                      <p className="font-semibold text-green-600">{route.availableSeats}/{route.totalSeats}</p>
                    </div>
                  </div>

                  {route.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {route.amenities.slice(0, 4).map(amenity => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs flex items-center space-x-1"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="capitalize ml-1">{amenity}</span>
                        </span>
                      ))}
                      {route.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{route.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {route.stops.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Route</p>
                      <p className="text-sm text-gray-700 truncate">{route.stops.join(' → ')}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-blue-600">UGX {route.price.toLocaleString()}</p>
                    </div>
                    <Link
                      to={`/booking?from=${route.from}&to=${route.to}&date=${route.departureDate || selectedDate}`}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 group"
                    >
                      <span>Book</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popular Cities */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { city: 'Nairobi', country: 'Kenya', flag: '🇰🇪' },
              { city: 'Kigali', country: 'Rwanda', flag: '🇷🇼' },
              { city: 'Dar es Salaam', country: 'Tanzania', flag: '🇹🇿' },
              { city: 'Juba', country: 'South Sudan', flag: '🇸🇸' },
              { city: 'Bujumbura', country: 'Burundi', flag: '🇧🇮' },
              { city: 'Kinshasa', country: 'DRC', flag: '🇨🇩' },
            ].map((dest, index) => (
              <Link
                key={index}
                to={`/booking?to=${dest.city}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 text-center group"
              >
                <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">{dest.flag}</span>
                <h3 className="font-semibold text-gray-800">{dest.city}</h3>
                <p className="text-sm text-gray-500">{dest.country}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Route Map */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">East Africa Route Network</h2>
              <p className="text-gray-600">Our extensive network connecting major cities across the region</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                <Download size={18} /><span>Download Map</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                <Share2 size={18} /><span>Share</span>
              </button>
            </div>
          </div>
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=400&fit=crop"
              alt="Route Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-blue-500 rounded-full relative" />
                  <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/90 px-2 py-1 rounded whitespace-nowrap">Kampala</span>
                </div>
              </div>
              <div className="absolute top-1/3 right-1/4">
                <div className="relative">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/90 px-2 py-1 rounded whitespace-nowrap">Nairobi</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/90 px-2 py-1 rounded whitespace-nowrap">Kigali</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Need Help Choosing a Route?</h3>
              <p className="opacity-90">Our travel experts are here to help you plan your journey</p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RoutesPage;