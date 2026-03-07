import React, { useState } from 'react';
import { 
  Map, 
  Search, 
  Filter, 
  Plus,
  Edit2,
  Trash2,
  Copy,
  Clock,
  DollarSign,
  Bus,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const RouteManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock routes data
  const [routes, setRoutes] = useState([
    {
      id: 1,
      from: 'Kampala',
      to: 'Nairobi',
      fromCity: 'Kampala',
      toCity: 'Nairobi',
      distance: '800 km',
      duration: '12h',
      basePrice: 150000,
      busTypes: ['Executive', 'VIP', 'Luxury'],
      operators: ['Jaguar Executive', 'Nile Star', 'Royal Express'],
      frequency: 'Daily',
      departureTimes: ['08:00', '20:00'],
      status: 'active',
      popularity: 95,
      totalBookings: 12500,
      revenue: 1875000000
    },
    {
      id: 2,
      from: 'Kampala',
      to: 'Kigali',
      fromCity: 'Kampala',
      toCity: 'Kigali',
      distance: '500 km',
      duration: '8h',
      basePrice: 120000,
      busTypes: ['Luxury', 'Standard'],
      operators: ['Gateway Bus', 'Mash Poa'],
      frequency: 'Daily',
      departureTimes: ['09:00', '15:00'],
      status: 'active',
      popularity: 88,
      totalBookings: 8900,
      revenue: 1068000000
    },
    {
      id: 3,
      from: 'Kampala',
      to: 'Dar es Salaam',
      fromCity: 'Kampala',
      toCity: 'Dar es Salaam',
      distance: '1200 km',
      duration: '24h',
      basePrice: 250000,
      busTypes: ['Executive', 'VIP'],
      operators: ['Royal Express', 'Nile Star'],
      frequency: 'Mon, Thu',
      departureTimes: ['06:00'],
      status: 'active',
      popularity: 82,
      totalBookings: 5600,
      revenue: 1400000000
    },
    {
      id: 4,
      from: 'Kampala',
      to: 'Juba',
      fromCity: 'Kampala',
      toCity: 'Juba',
      distance: '700 km',
      duration: '14h',
      basePrice: 180000,
      busTypes: ['Luxury', 'Standard'],
      operators: ['Kampala Coach', 'Unity Bus'],
      frequency: 'Tue, Thu, Sat',
      departureTimes: ['07:00'],
      status: 'active',
      popularity: 75,
      totalBookings: 4300,
      revenue: 774000000
    },
    {
      id: 5,
      from: 'Kampala',
      to: 'Bujumbura',
      fromCity: 'Kampala',
      toCity: 'Bujumbura',
      distance: '900 km',
      duration: '18h',
      basePrice: 200000,
      busTypes: ['Executive'],
      operators: ['Lake Bus'],
      frequency: 'Wed, Sun',
      departureTimes: ['05:00'],
      status: 'inactive',
      popularity: 45,
      totalBookings: 2100,
      revenue: 420000000
    },
    {
      id: 6,
      from: 'Jinja',
      to: 'Nairobi',
      fromCity: 'Jinja',
      toCity: 'Nairobi',
      distance: '750 km',
      duration: '11h',
      basePrice: 140000,
      busTypes: ['VIP', 'Luxury'],
      operators: ['Nile Star', 'Jaguar Executive'],
      frequency: 'Tue, Thu, Sat',
      departureTimes: ['07:00'],
      status: 'active',
      popularity: 78,
      totalBookings: 5200,
      revenue: 728000000
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'inactive':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return 'text-green-600';
    if (popularity >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = 
      `${route.from} ${route.to}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || route.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Route Management</h1>
          <p className="text-gray-600">Manage routes, schedules, and pricing</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New Route</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Map className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Routes</p>
              <p className="text-2xl font-bold text-gray-800">{routes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Map className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Routes</p>
              <p className="text-2xl font-bold text-gray-800">
                {routes.filter(r => r.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Bus className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Operators</p>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">UGX 5.6B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by route (e.g., Kampala to Nairobi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Routes</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
            {/* Route Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <h3 className="text-lg font-bold">{route.from} → {route.to}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
              </div>
              <p className="text-sm opacity-90 mt-1">{route.distance} • {route.duration}</p>
            </div>

            {/* Route Details */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Base Price</p>
                  <p className="text-lg font-bold text-primary">UGX {route.basePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Popularity</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${route.popularity}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-semibold ${getPopularityColor(route.popularity)}`}>
                      {route.popularity}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bus Types */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Bus Types</p>
                <div className="flex flex-wrap gap-2">
                  {route.busTypes.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Operators */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Operators</p>
                <div className="flex flex-wrap gap-2">
                  {route.operators.map((operator, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {operator}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Frequency</p>
                  <p className="text-sm font-medium">{route.frequency}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Departure Times</p>
                  <div className="flex space-x-2">
                    {route.departureTimes.map((time, index) => (
                      <span key={index} className="text-sm font-medium">{time}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Bookings</p>
                    <p className="text-lg font-semibold">{route.totalBookings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-lg font-semibold text-green-600">
                      UGX {(route.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit2 size={16} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Copy size={16} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Route</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From City
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                      <option>Kampala</option>
                      <option>Jinja</option>
                      <option>Mbarara</option>
                      <option>Gulu</option>
                      <option>Entebbe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To City
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                      <option>Nairobi</option>
                      <option>Kigali</option>
                      <option>Dar es Salaam</option>
                      <option>Juba</option>
                      <option>Bujumbura</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance (km)
                    </label>
                    <input type="number" className="w-full px-4 py-2 border rounded-lg" placeholder="800" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="12h" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Price (UGX)
                  </label>
                  <input type="number" className="w-full px-4 py-2 border rounded-lg" placeholder="150000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bus Types
                  </label>
                  <div className="space-y-2">
                    {['Executive', 'VIP', 'Luxury', 'Standard'].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Daily</option>
                    <option>Mon, Wed, Fri</option>
                    <option>Tue, Thu, Sat</option>
                    <option>Weekends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Times
                  </label>
                  <div className="space-y-2">
                    <input type="time" className="w-full px-4 py-2 border rounded-lg" />
                    <input type="time" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Route
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;