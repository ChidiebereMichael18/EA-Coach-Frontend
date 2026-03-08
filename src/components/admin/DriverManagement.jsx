import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Edit2,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Star,
  Truck,
  Bus,
  UserCheck,
  UserX,
  FileText,
  Camera
} from 'lucide-react';

const DriverManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDriverDetails, setShowDriverDetails] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Mock drivers data
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      driverId: 'DRV-001',
      name: 'John Mukasa',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      email: 'john.mukasa@example.com',
      phone: '+256 700 123 456',
      address: 'Kampala, Uganda',
      licenseNumber: 'DL-2024-001234',
      licenseExpiry: '2025-12-31',
      experience: 8,
      joinDate: '2022-03-15',
      status: 'active',
      assignedBus: {
        id: 1,
        number: 'JX-001',
        company: 'Jaguar Executive'
      },
      routes: ['Kampala-Nairobi', 'Kampala-Kigali'],
      rating: 4.8,
      totalTrips: 456,
      accidents: 0,
      violations: 1,
      certifications: ['Defensive Driving', 'First Aid', 'Long Distance'],
      emergencyContact: {
        name: 'Mary Mukasa',
        phone: '+256 700 789 012',
        relation: 'Spouse'
      },
      documents: {
        license: 'license.pdf',
        medical: 'medical.pdf',
        contract: 'contract.pdf'
      }
    },
    {
      id: 2,
      driverId: 'DRV-002',
      name: 'Sarah Nambi',
      photo: 'https://images.unsplash.com/photo-1494790108777-466d853a5d7f?w=150&h=150&fit=crop',
      email: 'sarah.nambi@example.com',
      phone: '+256 700 234 567',
      address: 'Entebbe, Uganda',
      licenseNumber: 'DL-2024-002345',
      licenseExpiry: '2025-06-30',
      experience: 5,
      joinDate: '2023-01-10',
      status: 'active',
      assignedBus: {
        id: 2,
        number: 'GW-002',
        company: 'Gateway Bus'
      },
      routes: ['Kampala-Kigali', 'Kampala-Mbarara'],
      rating: 4.6,
      totalTrips: 234,
      accidents: 0,
      violations: 0,
      certifications: ['Defensive Driving', 'First Aid'],
      emergencyContact: {
        name: 'Peter Nambi',
        phone: '+256 700 345 678',
        relation: 'Brother'
      },
      documents: {
        license: 'license.pdf',
        medical: 'medical.pdf',
        contract: 'contract.pdf'
      }
    },
    {
      id: 3,
      driverId: 'DRV-003',
      name: 'David Ssemakula',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      email: 'david.ssemakula@example.com',
      phone: '+256 700 345 678',
      address: 'Jinja, Uganda',
      licenseNumber: 'DL-2024-003456',
      licenseExpiry: '2024-08-15',
      experience: 12,
      joinDate: '2021-06-20',
      status: 'on_leave',
      assignedBus: null,
      routes: ['Kampala-Nairobi', 'Kampala-Juba'],
      rating: 4.9,
      totalTrips: 678,
      accidents: 1,
      violations: 2,
      certifications: ['Defensive Driving', 'First Aid', 'Long Distance', 'Night Driving'],
      emergencyContact: {
        name: 'Grace Ssemakula',
        phone: '+256 700 456 789',
        relation: 'Spouse'
      },
      documents: {
        license: 'license.pdf',
        medical: 'medical.pdf',
        contract: 'contract.pdf'
      }
    },
    {
      id: 4,
      driverId: 'DRV-004',
      name: 'Robert Kato',
      photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae5?w=150&h=150&fit=crop',
      email: 'robert.kato@example.com',
      phone: '+256 700 456 789',
      address: 'Mbarara, Uganda',
      licenseNumber: 'DL-2024-004567',
      licenseExpiry: '2024-11-30',
      experience: 3,
      joinDate: '2023-09-05',
      status: 'active',
      assignedBus: {
        id: 3,
        number: 'NS-003',
        company: 'Nile Star'
      },
      routes: ['Jinja-Nairobi'],
      rating: 4.3,
      totalTrips: 89,
      accidents: 0,
      violations: 0,
      certifications: ['Defensive Driving'],
      emergencyContact: {
        name: 'Janet Kato',
        phone: '+256 700 567 890',
        relation: 'Mother'
      },
      documents: {
        license: 'license.pdf',
        medical: 'medical.pdf',
        contract: 'contract.pdf'
      }
    },
    {
      id: 5,
      driverId: 'DRV-005',
      name: 'Charles Wasswa',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      email: 'charles.wasswa@example.com',
      phone: '+256 700 567 890',
      address: 'Gulu, Uganda',
      licenseNumber: 'DL-2024-005678',
      licenseExpiry: '2024-09-20',
      experience: 7,
      joinDate: '2022-11-12',
      status: 'inactive',
      assignedBus: null,
      routes: ['Kampala-Gulu'],
      rating: 4.5,
      totalTrips: 345,
      accidents: 1,
      violations: 3,
      certifications: ['Defensive Driving', 'First Aid'],
      emergencyContact: {
        name: 'Sarah Wasswa',
        phone: '+256 700 678 901',
        relation: 'Spouse'
      },
      documents: {
        license: 'license.pdf',
        medical: 'medical.pdf',
        contract: 'contract.pdf'
      }
    }
  ]);

  // Mock available buses for assignment
  const availableBuses = [
    { id: 1, number: 'JX-001', company: 'Jaguar Executive', status: 'active' },
    { id: 2, number: 'GW-002', company: 'Gateway Bus', status: 'active' },
    { id: 3, number: 'NS-003', company: 'Nile Star', status: 'maintenance' },
    { id: 4, number: 'MP-004', company: 'Mash Poa', status: 'active' },
    { id: 5, number: 'RE-005', company: 'Royal Express', status: 'active' },
  ];

  // Mock driver schedules
  const driverSchedules = {
    1: [
      { date: '2024-03-20', route: 'Kampala-Nairobi', departure: '08:00', bus: 'JX-001' },
      { date: '2024-03-22', route: 'Kampala-Kigali', departure: '09:00', bus: 'JX-001' },
      { date: '2024-03-24', route: 'Kampala-Nairobi', departure: '08:00', bus: 'JX-001' },
    ],
    2: [
      { date: '2024-03-19', route: 'Kampala-Kigali', departure: '09:00', bus: 'GW-002' },
      { date: '2024-03-21', route: 'Kampala-Mbarara', departure: '14:00', bus: 'GW-002' },
      { date: '2024-03-23', route: 'Kampala-Kigali', departure: '09:00', bus: 'GW-002' },
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-600';
      case 'inactive':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active':
        return 'Active';
      case 'on_leave':
        return 'On Leave';
      case 'inactive':
        return 'Inactive';
      default:
        return status;
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    
    let matchesExperience = true;
    if (filterExperience === 'junior') {
      matchesExperience = driver.experience < 3;
    } else if (filterExperience === 'mid') {
      matchesExperience = driver.experience >= 3 && driver.experience < 7;
    } else if (filterExperience === 'senior') {
      matchesExperience = driver.experience >= 7;
    }
    
    return matchesSearch && matchesStatus && matchesExperience;
  });

  const stats = {
    total: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
    onLeave: drivers.filter(d => d.status === 'on_leave').length,
    inactive: drivers.filter(d => d.status === 'inactive').length,
    averageRating: (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1),
    totalTrips: drivers.reduce((acc, d) => acc + d.totalTrips, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Driver Management</h1>
          <p className="text-gray-600">Manage drivers, assignments, schedules, and performance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add New Driver</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-600">{stats.averageRating}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Truck className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Trips</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalTrips.toLocaleString()}</p>
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
              placeholder="Search by name, ID, email, or phone..."
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
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Experience</option>
              <option value="junior">Junior (0-3 years)</option>
              <option value="mid">Mid (3-7 years)</option>
              <option value="senior">Senior (7+ years)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
            {/* Driver Header */}
            <div className="bg-gradient-to-r from-blue-500 to-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{driver.name}</h3>
                    <p className="text-sm opacity-90">{driver.driverId}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(driver.status)}`}>
                  {getStatusText(driver.status)}
                </span>
              </div>
            </div>

            {/* Driver Details */}
            <div className="p-5">
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-gray-600">{driver.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-gray-600">{driver.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-gray-600">{driver.address}</span>
                </div>
              </div>

              {/* License Info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-gray-500">License Number</p>
                    <p className="font-medium">{driver.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expires</p>
                    <p className={`font-medium ${
                      new Date(driver.licenseExpiry) < new Date() 
                        ? 'text-red-600' 
                        : new Date(driver.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}>
                      {new Date(driver.licenseExpiry).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-bold text-gray-800">{driver.experience} yrs</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center justify-center">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-800 ml-1">{driver.rating}</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Trips</p>
                  <p className="font-bold text-gray-800">{driver.totalTrips}</p>
                </div>
              </div>

              {/* Assigned Bus */}
              {driver.assignedBus ? (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Assigned Bus</p>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                    <Bus size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {driver.assignedBus.number} - {driver.assignedBus.company}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-2 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
                  No bus assigned
                </div>
              )}

              {/* Routes */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Assigned Routes</p>
                <div className="flex flex-wrap gap-1">
                  {driver.routes.map((route, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {route}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {driver.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowDriverDetails(driver)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowAssignModal(true);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={driver.status !== 'active'}
                >
                  Assign Bus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Details Modal */}
      {showDriverDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Driver Details</h2>
                <button
                  onClick={() => setShowDriverDetails(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Driver Profile Header */}
              <div className="bg-gradient-to-r from-blue-500 to-secondary rounded-xl p-6 text-white mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                    <img
                      src={showDriverDetails.photo}
                      alt={showDriverDetails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{showDriverDetails.name}</h3>
                    <p className="opacity-90">{showDriverDetails.driverId}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white text-blue-500`}>
                        {getStatusText(showDriverDetails.status)}
                      </span>
                      <span className="flex items-center">
                        <Star size={16} className="text-yellow-300 fill-current" />
                        <span className="ml-1">{showDriverDetails.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{showDriverDetails.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium">{showDriverDetails.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address</span>
                      <span className="font-medium">{showDriverDetails.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Join Date</span>
                      <span className="font-medium">{new Date(showDriverDetails.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* License Information */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">License Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">License Number</span>
                      <span className="font-medium">{showDriverDetails.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expiry Date</span>
                      <span className={`font-medium ${
                        new Date(showDriverDetails.licenseExpiry) < new Date() 
                          ? 'text-red-600' 
                          : 'text-green-600'
                      }`}>
                        {new Date(showDriverDetails.licenseExpiry).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience</span>
                      <span className="font-medium">{showDriverDetails.experience} years</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Emergency Contact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium">{showDriverDetails.emergencyContact.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{showDriverDetails.emergencyContact.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Relation</span>
                      <span className="font-medium">{showDriverDetails.emergencyContact.relation}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Performance Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Trips</span>
                      <span className="font-medium">{showDriverDetails.totalTrips}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Accidents</span>
                      <span className={`font-medium ${showDriverDetails.accidents > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {showDriverDetails.accidents}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Violations</span>
                      <span className={`font-medium ${showDriverDetails.violations > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {showDriverDetails.violations}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Assignment */}
                <div className="border rounded-lg p-4 md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Current Assignment</h3>
                  {showDriverDetails.assignedBus ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Bus size={24} className="text-blue-500" />
                        <div>
                          <p className="font-medium">{showDriverDetails.assignedBus.number}</p>
                          <p className="text-sm text-gray-500">{showDriverDetails.assignedBus.company}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        View Schedule
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">No bus currently assigned</p>
                  )}
                </div>

                {/* Upcoming Schedule */}
                {driverSchedules[showDriverDetails.id] && (
                  <div className="border rounded-lg p-4 md:col-span-2">
                    <h3 className="font-semibold text-gray-800 mb-3">Upcoming Schedule</h3>
                    <div className="space-y-2">
                      {driverSchedules[showDriverDetails.id].map((schedule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Calendar size={16} className="text-gray-400" />
                            <span>{new Date(schedule.date).toLocaleDateString()}</span>
                            <Clock size={16} className="text-gray-400 ml-2" />
                            <span>{schedule.departure}</span>
                          </div>
                          <div>
                            <span className="font-medium">{schedule.route}</span>
                            <span className="text-sm text-gray-500 ml-3">Bus: {schedule.bus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents */}
                <div className="border rounded-lg p-4 md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Documents</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <FileText size={16} className="text-blue-600" />
                      <span className="text-sm">License</span>
                    </button>
                    <button className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <FileText size={16} className="text-green-600" />
                      <span className="text-sm">Medical</span>
                    </button>
                    <button className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <FileText size={16} className="text-orange-600" />
                      <span className="text-sm">Contract</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Driver
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Download Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Bus Modal */}
      {showAssignModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Assign Bus to Driver</h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedDriver(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Driver: <span className="font-semibold">{selectedDriver.name}</span></p>
                <p className="text-sm text-gray-600">Current: {selectedDriver.assignedBus ? selectedDriver.assignedBus.number : 'No bus assigned'}</p>
              </div>

              <div className="space-y-3 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bus
                </label>
                {availableBuses.map(bus => (
                  <label key={bus.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="bus" className="w-4 h-4 text-blue-500" />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{bus.number}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bus.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {bus.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{bus.company}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedDriver(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Assign Bus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Driver</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                {/* Photo Upload */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <Camera size={24} className="text-gray-400" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Upload Photo
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter email" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input type="tel" className="w-full px-4 py-2 border rounded-lg" placeholder="+256 XXX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter address" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number *
                    </label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter license number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Expiry *
                    </label>
                    <input type="date" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (years)
                    </label>
                    <input type="number" className="w-full px-4 py-2 border rounded-lg" placeholder="Years of experience" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg">
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Emergency Contact</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Name" />
                    </div>
                    <div className="col-span-1">
                      <input type="tel" className="w-full px-4 py-2 border rounded-lg" placeholder="Phone" />
                    </div>
                    <div className="col-span-1">
                      <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Relation" />
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Documents</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Upload License
                      </button>
                      <span className="text-sm text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Upload Medical Certificate
                      </button>
                      <span className="text-sm text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                    </div>
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Driver
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

export default DriverManagement;