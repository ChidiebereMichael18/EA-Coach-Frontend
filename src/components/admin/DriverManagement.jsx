import React, { useState, useEffect } from 'react';
import { getDrivers, createDriver, deleteDriver, updateDriver, getBuses } from '../../services/adminService';
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
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [availableBuses, setAvailableBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseNumber: '',
    experienceYears: '',
    status: 'active'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.licenseNumber) {
      alert("Name and License Number are required");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const driverData = {
        name: formData.name,
        licenseNumber: formData.licenseNumber,
        phone: formData.phone,
        experienceYears: Number(formData.experienceYears) || 0,
        status: formData.status
      };
      
      const newDriver = await createDriver(driverData);
      
      // format for frontend display
      const formattedDriver = {
        ...newDriver,
        rating: 0,
        totalTrips: 0,
        routes: [],
        certifications: [],
        experience: newDriver.experienceYears || 0,
      };
      
      setDrivers([...drivers, formattedDriver]);
      setShowAddModal(false);
      setFormData({
        name: '',
        phone: '',
        licenseNumber: '',
        experienceYears: '',
        status: 'active'
      });
    } catch (err) {
      console.error("Error creating driver:", err);
      alert(err.response?.data?.message || "Failed to add driver. Ensure license number is unique.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch drivers and buses on component mount
  useEffect(() => {
    fetchDrivers();
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const data = await getBuses();
      setAvailableBuses(data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
  };

  const handleAssignBus = async () => {
    if (!selectedDriver || !selectedBusId) return;
    try {
      const updatedDriver = await updateDriver(selectedDriver._id || selectedDriver.id, { assignedBus: selectedBusId });
      
      const formattedDriver = {
        ...updatedDriver,
        rating: updatedDriver.rating || 0,
        totalTrips: updatedDriver.totalTrips || 0,
        routes: updatedDriver.routes || [],
        certifications: updatedDriver.certifications || [],
        experience: updatedDriver.experienceYears || 0,
      };

      setDrivers(drivers.map(d => (d._id || d.id) === (updatedDriver._id || updatedDriver.id) ? formattedDriver : d));
      setShowAssignModal(false);
      setSelectedDriver(null);
      setSelectedBusId('');
    } catch (err) {
      console.error("Error assigning bus:", err);
      alert("Failed to assign bus");
    }
  };

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const data = await getDrivers();
      // Ensure data falls back to default empty structures if backend didn't supply them
      const formattedData = data.map(driver => ({
        ...driver,
        rating: driver.rating || 0,
        totalTrips: driver.totalTrips || 0,
        routes: driver.routes || [],
        certifications: driver.certifications || [],
        experience: driver.experience || 0,
      }));
      setDrivers(formattedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setError("Failed to load drivers data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        await deleteDriver(id);
        setDrivers(drivers.filter(d => d._id !== id));
      } catch (err) {
        console.error("Error deleting driver:", err);
        alert("Failed to delete driver.");
      }
    }
  };




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

      {/* Drivers Grid */}
      {!isLoading && !error && (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver._id || driver.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
            {/* Driver Header */}
            <div className="bg-gradient-to-r from-blue-500 to-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center">
                    {driver.photo ? (
                      <img
                        src={driver.photo}
                        alt={driver.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCheck size={24} className="text-gray-400" />
                    )}
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
                {/* <div className="flex items-center space-x-2 text-sm">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-gray-600">{driver.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-gray-600">{driver.address}</span>
                </div> */}
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
                {/* <div className="text-center">
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center justify-center">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-800 ml-1">{driver.rating}</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Trips</p>
                  <p className="font-bold text-gray-800">{driver.totalTrips}</p>
                </div> */}
              </div>

              {/* Assigned Bus */}
              {driver.assignedBus ? (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Assigned Bus</p>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                    <Bus size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {driver.assignedBus.busNumber || driver.assignedBus.number} - {driver.assignedBus.company || driver.assignedBus.busType}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-2 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
                  No bus assigned
                </div>
              )}

              {/* Routes */}
              {/* <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Assigned Routes</p>
                <div className="flex flex-wrap gap-1">
                  {driver.routes.map((route, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {route}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Certifications */}
              {/* <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {driver.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      {cert}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {/* <button
                    onClick={() => setShowDriverDetails(driver)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} className="text-gray-600" />
                  </button> */}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={16} className="text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(driver._id || driver.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Delete"
                  >
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
      )}

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
                  <label key={bus._id || bus.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="bus" 
                      className="w-4 h-4 text-blue-500" 
                      checked={selectedBusId === (bus._id || bus.id)}
                      onChange={() => setSelectedBusId(bus._id || bus.id)}
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{bus.busNumber || bus.number}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bus.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {bus.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{bus.company || bus.busType}</p>
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
                <button 
                  onClick={handleAssignBus}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
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

              <form className="space-y-4" onSubmit={handleAddDriver}>
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
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border rounded-lg" 
                      placeholder="Enter full name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border rounded-lg" 
                      placeholder="Enter license number" 
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border rounded-lg" 
                      placeholder="+256 XXX XXX XXX" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (years)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border rounded-lg" 
                      placeholder="Years of experience" 
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select 
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="on_leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Driver'}
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