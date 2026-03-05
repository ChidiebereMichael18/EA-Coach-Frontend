import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard, 
  Download,
  Eye,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';

const BookingHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API call
  const bookings = [
    {
      id: 'BUS24031234',
      from: 'Kampala',
      to: 'Nairobi',
      date: '2024-03-15',
      time: '08:00',
      bus: 'Jaguar Executive',
      seats: ['12A', '12B'],
      totalAmount: 'UGX 300,000',
      paymentMethod: 'MTN MoMo',
      status: 'completed',
      type: 'one-way'
    },
    {
      id: 'BUS24031235',
      from: 'Kampala',
      to: 'Mbarara',
      date: '2024-03-20',
      time: '14:00',
      bus: 'Gateway Bus',
      seats: ['8B'],
      totalAmount: 'UGX 25,000',
      paymentMethod: 'Card',
      status: 'confirmed',
      type: 'one-way'
    },
    {
      id: 'BUS24031236',
      from: 'Kampala',
      to: 'Jinja',
      date: '2024-02-28',
      time: '09:00',
      bus: 'Nile Star',
      seats: ['15C'],
      totalAmount: 'UGX 15,000',
      paymentMethod: 'Airtel Money',
      status: 'cancelled',
      type: 'one-way'
    },
    {
      id: 'BUS24031237',
      from: 'Kampala',
      to: 'Kigali',
      date: '2024-03-25',
      time: '06:00',
      bus: 'Mash Poa',
      seats: ['22A', '22B', '22C'],
      totalAmount: 'UGX 360,000',
      paymentMethod: 'Card',
      status: 'pending',
      type: 'round-trip'
    }
  ];

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

  const filteredBookings = bookings.filter(booking => {
    if (filter !== 'all' && booking.status !== filter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        booking.id.toLowerCase().includes(search) ||
        booking.from.toLowerCase().includes(search) ||
        booking.to.toLowerCase().includes(search)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking History</h1>
          <p className="text-gray-600">View and manage all your past and upcoming trips</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <Download size={18} />
          <span>Export</span>
        </button>
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
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Booking ID</span>
                  <p className="font-semibold text-gray-800">{booking.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              {/* Journey Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium text-gray-800">{booking.from} → {booking.to}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="text-primary flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-800">{booking.date} at {booking.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CreditCard className="text-primary flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium text-gray-800">{booking.totalAmount}</p>
                    <p className="text-xs text-gray-500">{booking.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="text-primary flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-medium text-gray-800">{booking.seats.join(', ')}</p>
                    <p className="text-xs text-gray-500">{booking.bus}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                  <Eye size={16} />
                  <span className="text-sm">View Details</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                  <Download size={16} />
                  <span className="text-sm">Download Ticket</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;