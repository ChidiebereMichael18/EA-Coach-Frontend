import React, { useState, useEffect } from 'react';
import { getBookings } from '../../services/adminService';
import { 
  Calendar, 
  Search, 
  Filter, 
  Eye,
  Download,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Users,
  DollarSign,
  MoreVertical,
  Edit2,
  Trash2,
  Send,
  AlertCircle
} from 'lucide-react';

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showBookingDetails, setShowBookingDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await getBookings();
      // Ensure data falls back to default empty structures if backend didn't supply them
      const formattedData = data.map(booking => ({
        ...booking,
        user: booking.user || { name: 'Unknown User', email: '', phone: '' },
        bus: booking.bus || { busNumber: 'Unknown Bus', busType: '' },
        route: booking.route || { from: '', to: '', departureDate: '', departureTime: '', arrivalTime: '' },
        passengers: booking.passengers || [],
        seats: booking.bookedSeats || [],
      }));
      setBookings(formattedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings data.");
    } finally {
      setIsLoading(false);
    }
  };



  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'completed':
        return 'bg-blue-100 text-blue-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'failed':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      (booking.bookingId && booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.user && booking.user.name && booking.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.user && booking.user.email && booking.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.route && `${booking.route.from} ${booking.route.to}`.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || booking.bookingStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    pending: bookings.filter(b => b.bookingStatus === 'pending').length,
    completed: bookings.filter(b => b.bookingStatus === 'completed').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'cancelled').length,
    totalRevenue: bookings.reduce((acc, b) => acc + b.totalAmount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking Management</h1>
        <p className="text-gray-600">View and manage all bookings across the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-primary">
            UGX {(stats.totalRevenue / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by booking ID, customer name, or route..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10 py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Bookings Table */}
      {!isLoading && !error && (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id || booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{booking.bookingId}</p>
                    <p className="text-xs text-gray-500">{new Date(booking.createdAt || booking.bookingDate).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                        {booking.user.name ? booking.user.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{booking.user.name}</p>
                        <p className="text-xs text-gray-500">{booking.user.phone || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={12} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{booking.route.from} → {booking.route.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{booking.bus.company || booking.bus.busType || ''} {booking.bus.busNumber ? `(${booking.bus.busNumber})` : ''}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{booking.route.departureDate ? new Date(booking.route.departureDate).toLocaleDateString() : ''}</p>
                    <p className="text-xs text-gray-500">{booking.route.departureTime || ''} {booking.route.arrivalTime ? `- ${booking.route.arrivalTime}` : ''}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Users size={12} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{booking.seats.join(', ')}</span>
                    </div>
                    <p className="text-xs text-gray-500">{booking.passengers.length} passenger(s)</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">UGX {booking.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{booking.paymentMethod}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setShowBookingDetails(booking)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Printer size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded-lg transition-colors">
                        <XCircle size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1 to {filteredBookings.length} of {bookings.length} bookings
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Booking Details Modal */}
      {showBookingDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                <button
                  onClick={() => setShowBookingDetails(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Booking Details Content */}
              <div className="space-y-6">
                {/* Status Bar */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(showBookingDetails.bookingStatus)}`}>
                    {showBookingDetails.bookingStatus}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(showBookingDetails.paymentStatus)}`}>
                    Payment: {showBookingDetails.paymentStatus}
                  </span>
                  <span className="text-sm text-gray-500">
                    Booked on: {new Date(showBookingDetails.createdAt || showBookingDetails.bookingDate).toLocaleString()}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{showBookingDetails.user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{showBookingDetails.user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{showBookingDetails.user.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Trip Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{showBookingDetails.route.from}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{showBookingDetails.route.to}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{showBookingDetails.route.departureDate ? new Date(showBookingDetails.route.departureDate).toLocaleDateString() : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{showBookingDetails.route.departureTime}</p>
                    </div>
                  </div>
                </div>

                {/* Bus Details */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Bus Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Bus Number</p>
                      <p className="font-medium">{showBookingDetails.bus.number || showBookingDetails.bus.busNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{showBookingDetails.bus.company || 'EA Coach'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{showBookingDetails.bus.type || showBookingDetails.bus.busType}</p>
                    </div>
                  </div>
                </div>

                {/* Passengers */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Passengers</h3>
                  <div className="space-y-2">
                    {showBookingDetails.passengers.map((passenger, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{passenger.name}</p>
                          <p className="text-sm text-gray-500">Seat: {showBookingDetails.seats[index]}</p>
                        </div>
                        <div className="text-sm text-gray-600">
                          Age: {passenger.age} • {passenger.gender}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">UGX {showBookingDetails.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">{showBookingDetails.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">UGX {showBookingDetails.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {showBookingDetails.specialRequests && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Special Requests</h3>
                    <p className="text-gray-600">{showBookingDetails.specialRequests}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Send size={16} />
                    <span>Send Reminder</span>
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                    <Download size={16} />
                    <span>Download Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;