import React, { useState } from 'react';
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

  // Mock buses data
  const [buses, setBuses] = useState([
    {
      id: 1,
      busNumber: 'JX-001',
      company: 'Jaguar Executive',
      type: 'Executive',
      totalSeats: 53,
      amenities: {
        wifi: true,
        ac: true,
        usb: true,
        entertainment: true,
        bulletproof: false,
        snacks: true,
        blanket: true
      },
      routes: ['Kampala-Nairobi', 'Kampala-Kigali'],
      status: 'active',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01',
      driver: 'John Mukasa',
      conductor: 'Peter Okello',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      busNumber: 'GW-002',
      company: 'Gateway Bus',
      type: 'Luxury',
      totalSeats: 53,
      amenities: {
        wifi: true,
        ac: true,
        usb: true,
        entertainment: false,
        bulletproof: false,
        snacks: true,
        blanket: false
      },
      routes: ['Kampala-Kigali', 'Kampala-Mbarara'],
      status: 'active',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      driver: 'Sarah Nambi',
      conductor: 'James Ochieng',
      image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      busNumber: 'NS-003',
      company: 'Nile Star',
      type: 'VIP',
      totalSeats: 53,
      amenities: {
        wifi: true,
        ac: true,
        usb: true,
        entertainment: true,
        bulletproof: true,
        snacks: true,
        blanket: true
      },
      routes: ['Kampala-Nairobi', 'Kampala-Juba'],
      status: 'maintenance',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-03-25',
      driver: 'David Ssemakula',
      conductor: 'Michael Ouma',
      image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      busNumber: 'MP-004',
      company: 'Mash Poa',
      type: 'Standard',
      totalSeats: 53,
      amenities: {
        wifi: false,
        ac: true,
        usb: true,
        entertainment: false,
        bulletproof: false,
        snacks: false,
        blanket: false
      },
      routes: ['Kampala-Dar es Salaam'],
      status: 'active',
      lastMaintenance: '2024-02-28',
      nextMaintenance: '2024-03-28',
      driver: 'Robert Kato',
      conductor: 'Joseph Ochieng',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      busNumber: 'RE-005',
      company: 'Royal Express',
      type: 'Executive',
      totalSeats: 53,
      amenities: {
        wifi: true,
        ac: true,
        usb: true,
        entertainment: true,
        bulletproof: true,
        snacks: true,
        blanket: true
      },
      routes: ['Kampala-Nairobi', 'Kampala-Kigali', 'Kampala-Bujumbura'],
      status: 'inactive',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      driver: 'Charles Wasswa',
      conductor: 'Paul Otieno',
      image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=600&h=400&fit=crop'
    }
  ]);

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
          className="mt-4 sm:mt-0 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBuses.map((bus) => (
          <div key={bus.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Bus Image */}
              <div className="md:w-48 h-32 md:h-auto overflow-hidden">
                <img
                  src={bus.image}
                  alt={bus.busNumber}
                  className="w-full h-full object-cover"
                />
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
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.entries(bus.amenities).map(([key, value]) => (
                    value && <AmenityIcon key={key} amenity={key} active={value} />
                  ))}
                </div>

                {/* Routes */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Assigned Routes:</p>
                  <div className="flex flex-wrap gap-1">
                    {bus.routes.map((route, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Driver Info */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Driver</p>
                      <p className="font-medium">{bus.driver}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Conductor</p>
                      <p className="font-medium">{bus.conductor}</p>
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
                  <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusManagement;