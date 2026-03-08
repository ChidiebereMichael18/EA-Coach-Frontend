import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Download,
  Eye,
  Filter,
  Search,
  AlertCircle
} from 'lucide-react';
import { getMyBookings } from '../../api/dashboardApi';

const formatDate = (d) => {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
};

const BookingHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyBookings()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setBookings(res.data);
        } else {
          setError(res.errorMessage || 'Failed to load bookings');
        }
      })
      .catch(() => setError('Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-600';
      case 'completed':
        return 'bg-blue-100 text-blue-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const statusForFilter = (b) => b.bookingStatus || b.paymentStatus || 'confirmed';
  const filteredBookings = bookings.filter((booking) => {
    if (filter !== 'all' && statusForFilter(booking) !== filter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const id = (booking.bookingId || booking._id || '').toString().toLowerCase();
      const from = (booking.route?.from || '').toLowerCase();
      const to = (booking.route?.to || '').toLowerCase();
      return id.includes(search) || from.includes(search) || to.includes(search);
    }
    return true;
  });

  const formatAmount = (n) => (n != null ? `UGX ${Number(n).toLocaleString()}` : '—');
  const seatLabel = (b) => (b.bookedSeats && b.bookedSeats.length ? b.bookedSeats.join(', ') : '—');
  const busLabel = (b) => b.bus?.busNumber || b.bus?.busType || '—';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking History</h1>
          <p className="text-gray-600">View and manage all your past and upcoming trips</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by booking ID or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => {
          const status = statusForFilter(booking);
          return (
            <div key={booking._id || booking.bookingId} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Booking ID</span>
                    <p className="font-semibold text-gray-800">{booking.bookingId || booking._id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-medium text-gray-800">{booking.route?.from ?? '—'} → {booking.route?.to ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="text-primary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-800">{formatDate(booking.route?.departureDate)} at {booking.route?.departureTime ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CreditCard className="text-primary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium text-gray-800">{formatAmount(booking.totalAmount)}</p>
                      <p className="text-xs text-gray-500">{booking.paymentMethod ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="text-primary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium text-gray-800">{seatLabel(booking)}</p>
                      <p className="text-xs text-gray-500">{busLabel(booking)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                  <span className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Eye size={16} />
                    <span>View Details</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Download size={16} />
                    <span>Download Ticket</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{bookings.length === 0 ? 'No bookings yet.' : 'No bookings match your filters.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;