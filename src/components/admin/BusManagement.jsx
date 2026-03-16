import React, { useState, useEffect } from 'react';
import { getBuses, createBus, updateBus, deleteBus } from '../../services/adminService';
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
  DollarSign,
  Calendar
} from 'lucide-react';

const CITIES = [
  'Kampala',
  'Jinja',
  'Mbarara',
  'Gulu',
  'Entebbe',
  'Nairobi',
  'Kigali',
  'Dar es Salaam',
  'Juba',
  'Bujumbura',
  'Arusha',
  'Mombasa',
  'Kisumu',
  'Dodoma',"Lira", "Arua", "Masaka", "Mbale",
  "Fort Portal", "Kabale", "Kasese", "Soroti", "Kitgum", "Hoima",
];

const BusManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormState = {
    busNumber: '',
    busType: 'Standard',
    totalSeats: 53,
    amenities: {
      wifi: false,
      ac: false,
      usbCharging: false,
      entertainment: false,
      bulletproof: false
    },
    route: {
      from: '',
      to: '',
      departureDate: '',
      departureTime: '',
      arrivalTime: '',
      distance: '',
      price: ''
    },
    operator: {
      name: '',
      contact: '',
      logo: ''
    },
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch buses on component mount
  useEffect(() => {
    fetchBuses();
  }, []);

const fetchBuses = async () => {
  setIsLoading(true);
  try {
    const data = await getBuses();
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
        setBuses(buses.filter(b => (b._id || b.id) !== id));
      } catch (err) {
        console.error("Error deleting bus:", err);
        alert("Failed to delete bus.");
      }
    }
  };

  const openEditModal = (bus) => {
    setFormData({
      busNumber: bus.busNumber || '',
      busType: bus.busType || 'Standard',
      totalSeats: bus.totalSeats || 53,
      amenities: {
        wifi: bus.amenities?.wifi || false,
        ac: bus.amenities?.ac || false,
        usbCharging: bus.amenities?.usbCharging || false,
        entertainment: bus.amenities?.entertainment || false,
        bulletproof: bus.amenities?.bulletproof || false
      },
      route: {
        from: bus.route?.from || '',
        to: bus.route?.to || '',
        departureDate: bus.route?.departureDate
          ? new Date(bus.route.departureDate).toISOString().split('T')[0]
          : '',
        departureTime: bus.route?.departureTime || '',
        arrivalTime: bus.route?.arrivalTime || '',
        distance: bus.route?.distance || '',
        price: bus.route?.price || ''
      },
      operator: {
        name: bus.operator?.name || '',
        contact: bus.operator?.contact || '',
        logo: bus.operator?.logo || ''
      },
      status: bus.status || 'active'
    });
    setSelectedBus(bus);
    setIsEditing(true);
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing && selectedBus) {
        const updatedBus = await updateBus(selectedBus._id || selectedBus.id, formData);
        setBuses(buses.map(b => (b._id || b.id) === (updatedBus._id || updatedBus.id) ? updatedBus : b));
      } else {
        const newBus = await createBus(formData);
        setBuses([...buses, newBus]);
      }
      setShowAddModal(false);
      setIsEditing(false);
      setSelectedBus(null);
      setFormData(initialFormState);
    } catch (err) {
      console.error("Error saving bus:", err);
      alert(err.response?.data?.message || "Failed to save bus.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const filteredBuses = buses.filter(bus => {
    const busNumStr = bus.busNumber || '';
    const operatorStr = bus.operator?.name || '';
    const matchesSearch = busNumStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operatorStr.toLowerCase().includes(searchTerm.toLowerCase());
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
      case 'usbCharging': case 'usb': return <Zap size={14} className="text-blue-500" title="USB Charging" />;
      case 'entertainment': return <Tv size={14} className="text-blue-500" title="Entertainment" />;
      case 'bulletproof': return <Shield size={14} className="text-blue-500" title="Bulletproof" />;
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
          onClick={() => {
            setFormData(initialFormState);
            setIsEditing(false);
            setShowAddModal(true);
          }}
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
                    <p className="text-sm text-gray-500">{bus.operator?.name || 'Unknown Operator'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bus.status)}`}>
                    {bus.status}
                  </span>
                </div>

                {/* Bus Info */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Bus size={14} />
                    <span>{bus.busType}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users size={14} />
                    <span>{bus.totalSeats} seats</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {bus.amenities && Object.keys(bus.amenities)
                    .filter(key => bus.amenities[key] === true)
                    .map((amenity) => (
                      <AmenityIcon key={amenity} amenity={amenity} active={true} />
                  ))}
                  {(!bus.amenities || !Object.values(bus.amenities).some(v => v === true)) && (
                    <span className="text-xs text-gray-400">No amenities listed</span>
                  )}
                </div>
                {/* Route + Departure Date */}
                <div className="mb-3 space-y-2">
                  {/* Route row */}
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                    {bus.route && bus.route.from && bus.route.to ? (
                      <span className="text-sm text-gray-700 font-medium">
                        {bus.route.from} → {bus.route.to}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Route unassigned</span>
                    )}
                  </div>

                  {/* Departure date — prominent block */}
                  {(() => {
                    if (!bus.route?.departureDate) {
                      return (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-400 italic">No departure date set</span>
                        </div>
                      );
                    }
                    const depDate = new Date(bus.route.departureDate);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    depDate.setHours(0, 0, 0, 0);
                    const isPast   = depDate < today;
                    const isToday  = depDate.getTime() === today.getTime();
                    const colorCls = isPast
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : isToday
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-green-50 border-green-200 text-green-700';
                    const label = isPast ? 'Departed' : isToday ? "Departs Today" : 'Upcoming Departure';
                    return (
                      <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${colorCls}`}>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
                            <p className="text-sm font-bold">
                              {new Date(bus.route.departureDate).toLocaleDateString('en-GB', {
                                weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-70">Time</p>
                          <p className="text-sm font-bold">{bus.route.departureTime || '—'}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Driver Info */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Driver</p>
                      <p className="font-medium">{bus.driver?.name || 'Unassigned'}</p>
                    </div>
                  </div>
                </div>

                {/* Maintenance Info */}
                {/* <div className="mt-3 pt-3 border-t border-gray-100">
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
                </div> */}

                {/* Actions */}
                <div className="mt-4 flex items-center justify-end space-x-2">
                  <button 
                    onClick={() => openEditModal(bus)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} className="text-gray-600" />
                  </button>
                  {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Copy size={16} className="text-gray-600" />
                  </button> */}
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

      {/* Add/Edit Bus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditing ? 'Edit Bus' : 'Add New Bus'}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Core Bus Info */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Core Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 border rounded-lg" 
                        value={formData.busNumber}
                        onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bus Type *</label>
                      <select 
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.busType}
                        onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
                      >
                        <option value="Standard">Standard</option>
                        <option value="Luxury">Luxury</option>
                        <option value="VIP">VIP</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats *</label>
                      <input 
                        type="number" 
                        required
                        className="w-full px-4 py-2 border rounded-lg" 
                        value={formData.totalSeats}
                        onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select 
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Operator Info */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Operator Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Operator Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 border rounded-lg" 
                        value={formData.operator.name}
                        onChange={(e) => setFormData({ ...formData, operator: { ...formData.operator, name: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Operator Contact</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg" 
                        value={formData.operator.contact}
                        onChange={(e) => setFormData({ ...formData, operator: { ...formData.operator, contact: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>

                {/* Route Info */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Assigned Route</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From *</label>
                      <select 
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        value={formData.route.from}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, from: e.target.value } })}
                      >
                        <option value="">Select Origin</option>
                        {CITIES.map(city => (
                          <option key={`from-${city}`} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To *</label>
                      <select 
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                        value={formData.route.to}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, to: e.target.value } })}
                      >
                        <option value="">Select Destination</option>
                        {CITIES.map(city => (
                          <option key={`to-${city}`} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time *</label>
                      <input 
                        type="time" 
                        required
                        className="w-full px-4 py-2 border rounded-lg" 
                        value={formData.route.departureTime}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, departureTime: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time *</label>
                      <input 
                        type="time" 
                        required
                        className="w-full px-4 py-2 border rounded-lg" 
                        value={formData.route.arrivalTime}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, arrivalTime: e.target.value } })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date *</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.route.departureDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, departureDate: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Distance (e.g. 300km)</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.route.distance}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, distance: e.target.value } })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (UGX) *</label>
                      <input
                        type="number"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.route.price}
                        onChange={(e) => setFormData({ ...formData, route: { ...formData.route, price: Number(e.target.value) } })}
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Amenities</h3>
                  <div className="flex flex-wrap gap-4">
                    {Object.keys(formData.amenities).map((key) => (
                      <label key={key} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-500" 
                          checked={formData.amenities[key]}
                          onChange={(e) => setFormData({
                            ...formData,
                            amenities: { ...formData.amenities, [key]: e.target.checked }
                          })}
                        />
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Bus')}
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

export default BusManagement;