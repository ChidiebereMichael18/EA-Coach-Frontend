import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Download,
  Eye,
  Filter,
  Search,
  AlertCircle,
  X,
  Bus,
  User
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

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef(null);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDownloadTicket = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
    // Allow modal to render fully before generating PDF
    setTimeout(() => {
      generatePDF(booking);
    }, 300);
  };

  const generatePDF = async (booking) => {
    const printElement = ticketRef.current;
    if (!printElement) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(printElement, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`EACoach-Ticket-${booking.bookingId || booking._id}.pdf`);
    } catch (err) {
      console.error("Failed to download ticket", err);
      alert("Failed to generate PDF ticket.");
    } finally {
      setIsDownloading(false);
    }
  };

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
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-medium text-gray-800">{booking.route?.from ?? '—'} → {booking.route?.to ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-800">{formatDate(booking.route?.departureDate)} at {booking.route?.departureTime ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CreditCard className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium text-gray-800">{formatAmount(booking.totalAmount)}</p>
                      <p className="text-xs text-gray-500">{booking.paymentMethod ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium text-gray-800">{seatLabel(booking)}</p>
                      <p className="text-xs text-gray-500">{busLabel(booking)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                  <button 
                    onClick={() => handleViewDetails(booking)}
                    className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  <button 
                    onClick={() => handleDownloadTicket(booking)}
                    disabled={isDownloading}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Download size={16} />
                    <span>Download Ticket</span>
                  </button>
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

      {/* Ticket Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b flex items-center justify-between bg-white rounded-t-xl z-10 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-800">Booking Ticket</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
                disabled={isDownloading}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
              {/* Ticket UI - This is what will be captured */}
              <div 
                ref={ticketRef} 
                className="bg-white p-6 rounded-lg border-2 border-gray-200 relative overflow-hidden shadow-sm mx-auto max-w-xl"
              >
                {/* Brand Header */}
                <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-6 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-blue-500 tracking-tight">EA Coach</h1>
                    <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-semibold">Premium Travel</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ticket ID</p>
                    <p className="text-sm font-bold text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                      {selectedBooking.bookingId || selectedBooking._id}
                    </p>
                  </div>
                </div>

                {/* Main Ticket Info */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">Passenger</p>
                    <div className="flex flex-col space-y-3">
                       {selectedBooking.passengers && selectedBooking.passengers.length > 0 ? (
                         selectedBooking.passengers.map((p, i) => (
                           <div key={i} className="flex flex-col">
                             <span className="font-bold text-gray-800 flex items-center">
                               <User size={14} className="mr-2 text-gray-400"/>{p.name}
                             </span>
                             {(p.age || p.gender) && (
                               <span className="text-xs text-gray-500 ml-5 mt-0.5">
                                 {p.age && `Age: ${p.age}`} {p.age && p.gender && ' • '} {p.gender && `${p.gender}`}
                               </span>
                             )}
                           </div>
                         ))
                       ) : (
                         <span className="font-bold text-gray-800 flex items-center">
                           <User size={14} className="mr-2 text-gray-400"/>
                           {selectedBooking.user?.name || 'Passenger'}
                         </span>
                       )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">Status</p>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${getStatusColor(statusForFilter(selectedBooking))}`}>
                      {statusForFilter(selectedBooking)}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-xl p-5 mb-8 border border-blue-100/50 relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative z-10">
                    <div>
                      <p className="text-xs text-blue-400 uppercase tracking-widest mb-1 font-semibold">From</p>
                      <p className="text-xl font-bold text-gray-800">{selectedBooking.route?.from || '—'}</p>
                      <p className="text-sm text-gray-600 mt-1 font-medium">{formatDate(selectedBooking.route?.departureDate)}</p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center px-2 py-4 md:py-0">
                      <div className="w-full h-px bg-blue-200 relative">
                        <Bus size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 bg-blue-50/50 px-1" />
                      </div>
                      <p className="text-xs text-blue-500 mt-3 font-bold uppercase tracking-widest bg-blue-100 px-2 py-0.5 rounded-full">
                        {selectedBooking.route?.departureTime || '—'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-blue-400 uppercase tracking-widest mb-1 font-semibold">To</p>
                      <p className="text-xl font-bold text-gray-800">{selectedBooking.route?.to || '—'}</p>
                      <p className="text-sm text-gray-600 mt-1 font-medium">{selectedBooking.route?.arrivalTime || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Footer details */}
                <div className="grid grid-cols-3 gap-4 bg-white border-t-2 border-gray-100 pt-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Bus Info</p>
                    <p className="font-semibold text-gray-800">{busLabel(selectedBooking)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Seats</p>
                    <p className="font-bold text-blue-500 text-lg">{seatLabel(selectedBooking)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Total Paid</p>
                    <p className="font-bold text-gray-800 text-lg">{formatAmount(selectedBooking.totalAmount)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-white rounded-b-xl flex justify-end space-x-3 flex-shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                disabled={isDownloading}
              >
                Close
              </button>
              <button
                onClick={() => generatePDF(selectedBooking)}
                disabled={isDownloading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;