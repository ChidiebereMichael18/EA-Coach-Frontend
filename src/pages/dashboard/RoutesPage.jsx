import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Bus, 
  Filter, 
  Search, 
  ArrowRight,
  Star,
  Wifi,
  Wind,
  Zap,
  Coffee,
  Tv,
  Shield,
  Info,
  ChevronDown,
  Grid3x3,
  List,
  Download,
  Share2
} from 'lucide-react';

const RoutesPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedFrom, setSelectedFrom] = useState('Kampala');
  const [selectedTo, setSelectedTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    busType: [],
    priceRange: [0, 200000],
    departureTime: 'all',
    amenities: []
  });

  // Departure cities across Uganda and East Africa
  const departureCities = [
    'Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Arua', 
    'Mbale', 'Masaka', 'Fort Portal', 'Lira', 'Soroti', 'Kabale',
    'Nairobi', 'Kigali', 'Dar es Salaam', 'Juba', 'Bujumbura', 
    'Kinshasa', 'Addis Ababa'
  ];

  // Destination cities
  const destinationCities = [
    'Nairobi', 'Kigali', 'Dar es Salaam', 'Juba', 'Bujumbura',
    'Kinshasa', 'Addis Ababa', 'Mombasa', 'Arusha', 'Kampala',
    'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Arua', 'Mbale',
    'Masaka', 'Fort Portal', 'Lira', 'Soroti', 'Kabale'
  ];

  // Mock route data - replace with API call
  const [routes, setRoutes] = useState([
    {
      id: 1,
      from: 'Kampala',
      to: 'Nairobi',
      fromCity: 'Kampala',
      toCity: 'Nairobi',
      distance: '800 km',
      duration: '12h',
      price: 150000,
      busCompany: 'Jaguar Executive',
      busType: 'Executive',
      departureTime: '08:00',
      arrivalTime: '20:00',
      availableSeats: 45,
      totalSeats: 53,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      amenities: ['wifi', 'ac', 'usb', 'entertainment', 'snacks', 'blanket'],
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
      busNumber: 'JX-001',
      operator: 'Jaguar Express',
      stops: ['Kampala', 'Jinja', 'Tororo', 'Malaba', 'Eldoret', 'Nairobi']
    },
    {
      id: 2,
      from: 'Kampala',
      to: 'Kigali',
      fromCity: 'Kampala',
      toCity: 'Kigali',
      distance: '500 km',
      duration: '8h',
      price: 120000,
      busCompany: 'Gateway Bus',
      busType: 'Luxury',
      departureTime: '09:00',
      arrivalTime: '17:00',
      availableSeats: 38,
      totalSeats: 53,
      days: ['Mon', 'Wed', 'Fri', 'Sun'],
      amenities: ['wifi', 'ac', 'usb', 'snacks'],
      rating: 4.3,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=600&h=400&fit=crop',
      busNumber: 'GW-002',
      operator: 'Gateway Bus Services',
      stops: ['Kampala', 'Masaka', 'Mbarara', 'Kabale', 'Kigali']
    },
    {
      id: 3,
      from: 'Jinja',
      to: 'Nairobi',
      fromCity: 'Jinja',
      toCity: 'Nairobi',
      distance: '750 km',
      duration: '11h',
      price: 140000,
      busCompany: 'Nile Star',
      busType: 'VIP',
      departureTime: '07:00',
      arrivalTime: '18:00',
      availableSeats: 42,
      totalSeats: 53,
      days: ['Tue', 'Thu', 'Sat'],
      amenities: ['wifi', 'ac', 'usb', 'entertainment', 'meals'],
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1583248363044-1c6d2e3b1e2a?w=600&h=400&fit=crop',
      busNumber: 'NS-003',
      operator: 'Nile Star Coaches',
      stops: ['Jinja', 'Tororo', 'Malaba', 'Eldoret', 'Nairobi']
    },
    {
      id: 4,
      from: 'Mbarara',
      to: 'Kigali',
      fromCity: 'Mbarara',
      toCity: 'Kigali',
      distance: '300 km',
      duration: '5h',
      price: 80000,
      busCompany: 'Mash Poa',
      busType: 'Standard',
      departureTime: '10:00',
      arrivalTime: '15:00',
      availableSeats: 50,
      totalSeats: 53,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      amenities: ['ac', 'usb'],
      rating: 4.2,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&h=400&fit=crop',
      busNumber: 'MP-004',
      operator: 'Mash Poa Transporters',
      stops: ['Mbarara', 'Kabale', 'Kigali']
    },
    {
      id: 5,
      from: 'Kampala',
      to: 'Dar es Salaam',
      fromCity: 'Kampala',
      toCity: 'Dar es Salaam',
      distance: '1200 km',
      duration: '24h',
      price: 250000,
      busCompany: 'Royal Express',
      busType: 'Executive',
      departureTime: '06:00',
      arrivalTime: '06:00',
      availableSeats: 35,
      totalSeats: 53,
      days: ['Mon', 'Thu'],
      amenities: ['wifi', 'ac', 'usb', 'entertainment', 'meals', 'blanket', 'pillow'],
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=600&h=400&fit=crop',
      busNumber: 'RE-005',
      operator: 'Royal Express Ltd',
      stops: ['Kampala', 'Masaka', 'Mbarara', 'Kabale', 'Kigali', 'Dar es Salaam']
    },
    {
      id: 6,
      from: 'Gulu',
      to: 'Juba',
      fromCity: 'Gulu',
      toCity: 'Juba',
      distance: '400 km',
      duration: '8h',
      price: 90000,
      busCompany: 'Unity Bus',
      busType: 'Standard',
      departureTime: '08:00',
      arrivalTime: '16:00',
      availableSeats: 48,
      totalSeats: 53,
      days: ['Mon', 'Wed', 'Fri'],
      amenities: ['ac', 'usb'],
      rating: 4.0,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
      busNumber: 'UB-006',
      operator: 'Unity Bus Services',
      stops: ['Gulu', 'Kitgum', 'Juba']
    },
    {
      id: 7,
      from: 'Kampala',
      to: 'Juba',
      fromCity: 'Kampala',
      toCity: 'Juba',
      distance: '700 km',
      duration: '14h',
      price: 180000,
      busCompany: 'Kampala Coach',
      busType: 'Luxury',
      departureTime: '07:00',
      arrivalTime: '21:00',
      availableSeats: 40,
      totalSeats: 53,
      days: ['Tue', 'Thu', 'Sat'],
      amenities: ['wifi', 'ac', 'usb', 'entertainment', 'snacks'],
      rating: 4.4,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=600&h=400&fit=crop',
      busNumber: 'KC-007',
      operator: 'Kampala Coaches',
      stops: ['Kampala', 'Gulu', 'Kitgum', 'Juba']
    },
    {
      id: 8,
      from: 'Kampala',
      to: 'Bujumbura',
      fromCity: 'Kampala',
      toCity: 'Bujumbura',
      distance: '900 km',
      duration: '18h',
      price: 200000,
      busCompany: 'Lake Bus',
      busType: 'Executive',
      departureTime: '05:00',
      arrivalTime: '23:00',
      availableSeats: 32,
      totalSeats: 53,
      days: ['Wed', 'Sun'],
      amenities: ['wifi', 'ac', 'usb', 'entertainment', 'meals'],
      rating: 4.6,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&h=400&fit=crop',
      busNumber: 'LB-008',
      operator: 'Lake Bus Company',
      stops: ['Kampala', 'Masaka', 'Mbarara', 'Kabale', 'Kigali', 'Bujumbura']
    }
  ]);

  const [filteredRoutes, setFilteredRoutes] = useState(routes);

  // Filter routes based on selections
  useEffect(() => {
    let filtered = routes;

    if (selectedFrom) {
      filtered = filtered.filter(route => route.from === selectedFrom);
    }

    if (selectedTo) {
      filtered = filtered.filter(route => route.to === selectedTo);
    }

    // Apply additional filters
    if (filters.busType.length > 0) {
      filtered = filtered.filter(route => filters.busType.includes(route.busType));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(route => 
        route.price >= filters.priceRange[0] && route.price <= filters.priceRange[1]
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(route =>
        filters.amenities.every(amenity => route.amenities.includes(amenity))
      );
    }

    if (filters.departureTime !== 'all') {
      const hour = parseInt(filters.departureTime);
      filtered = filtered.filter(route => {
        const routeHour = parseInt(route.departureTime.split(':')[0]);
        if (hour === 0) return routeHour >= 0 && routeHour < 6;
        if (hour === 6) return routeHour >= 6 && routeHour < 12;
        if (hour === 12) return routeHour >= 12 && routeHour < 18;
        if (hour === 18) return routeHour >= 18 && routeHour < 24;
        return true;
      });
    }

    setFilteredRoutes(filtered);
  }, [selectedFrom, selectedTo, filters, routes]);

  const busTypes = ['Standard', 'Luxury', 'VIP', 'Executive'];
  const amenityOptions = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ac', label: 'AC', icon: Wind },
    { id: 'usb', label: 'USB Charging', icon: Zap },
    { id: 'entertainment', label: 'Entertainment', icon: Tv },
    { id: 'snacks', label: 'Snacks', icon: Coffee },
    { id: 'blanket', label: 'Blanket', icon: Shield }
  ];

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
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

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          {/* <div>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">{filteredRoutes.length}</span> routes found
              {selectedFrom && <span> from <span className="font-semibold">{selectedFrom}</span></span>}
              {selectedTo && <span> to <span className="font-semibold">{selectedTo}</span></span>}
            </p>
          </div> */}
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

        {/* Routes Grid/List */}
        {filteredRoutes.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className={`
                  bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden
                  ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}
                `}
              >
                {/* Image */}
                <div className={viewMode === 'list' ? 'md:w-64 flex-shrink-0' : ''}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={route.image}
                      alt={`${route.from} to ${route.to}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{route.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  {/* Route Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {route.from} → {route.to}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{route.distance} • {route.duration}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      {route.busType}
                    </span>
                  </div>

                  {/* Bus Info */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Bus size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{route.busCompany}</span>
                    <span className="text-xs text-gray-400">• {route.busNumber}</span>
                  </div>

                  {/* Time & Availability */}
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
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="font-semibold text-green-600">{route.availableSeats}/{route.totalSeats}</p>
                    </div>
                  </div>

                  {/* Operating Days */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Operating Days</p>
                    <div className="flex flex-wrap gap-1">
                      {route.days.map(day => (
                        <span
                          key={day}
                          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xs flex items-center justify-center font-medium"
                        >
                          {day.slice(0, 1)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {route.amenities.slice(0, 4).map(amenity => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs flex items-center space-x-1"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </span>
                    ))}
                    {route.amenities.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{route.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Stops */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Major Stops</p>
                    <p className="text-sm text-gray-700 truncate">
                      {route.stops.join(' → ')}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-primary">UGX {route.price.toLocaleString()}</p>
                    </div>
                    <Link
                      to={`/booking?from=${route.from}&to=${route.to}&date=${selectedDate}`}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 group"
                    >
                      <span>Book</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bus size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Routes Found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}

        {/* Popular Cities Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { city: 'Nairobi', country: 'Kenya', image: '🇰🇪' },
              { city: 'Kigali', country: 'Rwanda', image: '🇷🇼' },
              { city: 'Dar es Salaam', country: 'Tanzania', image: '🇹🇿' },
              { city: 'Juba', country: 'South Sudan', image: '🇸🇸' },
              { city: 'Bujumbura', country: 'Burundi', image: '🇧🇮' },
              { city: 'Kinshasa', country: 'DRC', image: '🇨🇩' },
            ].map((dest, index) => (
              <Link
                key={index}
                to={`/booking?to=${dest.city}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 text-center group"
              >
                <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                  {dest.image}
                </span>
                <h3 className="font-semibold text-gray-800">{dest.city}</h3>
                <p className="text-sm text-gray-500">{dest.country}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Route Map Preview */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">East Africa Route Network</h2>
              <p className="text-gray-600">Our extensive network connecting major cities across the region</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 text-primary hover:text-blue-600">
                <Download size={18} />
                <span>Download Map</span>
              </button>
              <button className="flex items-center space-x-2 text-primary hover:text-blue-600">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=400&fit=crop"
              alt="Route Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5"></div>
            
            {/* Map Overlay with Cities */}
            <div className="absolute inset-0">
              {/* Kampala */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-primary rounded-full relative"></div>
                  <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/90 px-2 py-1 rounded whitespace-nowrap">
                    Kampala
                  </span>
                </div>
              </div>
              
              {/* Nairobi */}
              <div className="absolute top-1/3 right-1/4">
                <div className="relative">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/90 px-2 py-1 rounded whitespace-nowrap">
                    Nairobi
                  </span>
                </div>
              </div>
              
              {/* Kigali */}
              <div className="absolute top-1/2 left-1/2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/90 px-2 py-1 rounded whitespace-nowrap">
                    Kigali
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Need Help Choosing a Route?</h3>
              <p className="opacity-90">Our travel experts are here to help you plan your journey</p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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