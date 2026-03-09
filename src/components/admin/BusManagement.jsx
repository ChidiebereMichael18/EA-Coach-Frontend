import React, { useState, useEffect } from 'react';
import { getBuses, createBus, deleteBus } from '../../services/adminService';
import {
  Bus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Plus,
  Wifi,
  Wind,
  Zap,
  Tv,
  Shield,
  Coffee,
  MoreVertical,
  Copy,
  Clock,
  Users,
  MapPin,
  DollarSign
} from 'lucide-react';

const BusManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch buses on component mount
  useEffect(() => {
    fetchBuses();
  }, []);

const fetchBuses = async () => {
  setIsLoading(true);
  try {
    const raw = await getBuses();
    const data = raw.map(bus => ({
      ...bus,
      amenities: Array.isArray(bus.amenities)
        ? bus.amenities
        : bus.amenities && typeof bus.amenities === 'object'
        ? Object.entries(bus.amenities).filter(([_, v]) => v).map(([k]) => k)
        : []
    }));
    setBuses(data);
  } catch (err) {
    console.error("Error fetching buses:", err);
    setError("Failed to load buses data.");
  } finally {
    setIsLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await deleteBus(id);
        setBuses(buses.filter(b => b._id !== id));
      } catch (err) {
        console.error("Error deleting bus:", err);
        alert("Failed to delete bus.");
      }
    }
  };



  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || bus.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'maintenance': return 'bg-yellow-100 text-yellow-600';
      case 'inactive': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const AmenityIcon = ({ amenity, active }) => {
    if (!active) return null;
    
    switch(amenity) {
      case 'wifi': return <Wifi size={14} className="text-blue-500" title="WiFi" />;
      case 'ac': return <Wind size={14} className="text-blue-500" title="AC" />;
      case 'usb': return <Zap size={14} className="text-blue-500" title="USB Charging" />;
      case 'entertainment': return <Tv size={14} className="text-blue-500" title="Entertainment" />;
      case 'bulletproof': return <Shield size={14} className="text-blue-500" title="Bulletproof" />;
      case 'snacks': return <Coffee size={14} className="text-blue-500" title="Snacks" />;
      case 'blanket': return <Coffee size={14} className="text-blue-500" title="Blanket" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bus Management</h1>
          <p className="text-gray-600">Manage your fleet of buses, schedules, and maintenance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New Bus</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bus className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Buses</p>
              <p className="text-2xl font-bold text-gray-800">{buses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Bus className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-800">
                {buses.filter(b => b.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Maintenance</p>
              <p className="text-2xl font-bold text-gray-800">
                {buses.filter(b => b.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Seats</p>
              <p className="text-2xl font-bold text-gray-800">
                {buses.reduce((acc, bus) => acc + bus.totalSeats, 0)}
              </p>
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
              placeholder="Search by bus number or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10 py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Buses Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBuses.map((bus) => (
            <div key={bus._id || bus.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Bus Image */}
                <div className="md:w-48 h-32 md:h-auto overflow-hidden bg-gray-100 flex items-center justify-center">
                  {bus.image ? (
                    <img
                      src={bus.image}
                      alt={bus.busNumber}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Bus size={48} className="text-gray-300" />
                  )}
                </div>

              {/* Bus Details */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{bus.busNumber}</h3>
                    <p className="text-sm text-gray-500">{bus.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bus.status)}`}>
                    {bus.status}
                  </span>
                </div>

                {/* Bus Info */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Bus size={14} />
                    <span>{bus.type}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users size={14} />
                    <span>{bus.totalSeats} seats</span>
                  </div>
                </div>

                {/* Amenities */}
             {bus.amenities && bus.amenities.map((amenity, index) => (
  <AmenityIcon key={index} amenity={amenity} active={true} />
))}
{(!bus.amenities || bus.amenities.length === 0) && (
  <span className="text-xs text-gray-400">No amenities listed</span>
)}

                {/* Routes */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Assigned Routes:</p>
                  <div className="flex flex-wrap gap-1">
                    {bus.routes && bus.routes.length > 0 ? bus.routes.map((route, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {route.from || route} - {route.to || ''}
                      </span>
                    )) : (
                      <span className="text-xs text-gray-400">Unassigned</span>
                    )}
                  </div>
                </div>

                {/* Driver Info */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Driver</p>
                      <p className="font-medium">{bus.driver}</p>
                    </div>
                  </div>
                </div>

                {/* Maintenance Info */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-gray-500">Last: {bus.lastMaintenance}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={12} className="text-orange-400" />
                      <span className="text-orange-600 font-medium">Next: {bus.nextMaintenance}</span>
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
                  <button 
                    onClick={() => handleDelete(bus._id || bus.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default BusManagement;