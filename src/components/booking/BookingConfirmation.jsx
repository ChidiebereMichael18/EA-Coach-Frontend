import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Printer, Share2, Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';

const BookingConfirmation = ({ bookingId, bookingData, onNewBooking }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Download ticket feature coming soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'EA Coach Booking Confirmation',
        text: `Your booking ${bookingId} has been confirmed!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Booking ID: ${bookingId}`);
      alert('Booking ID copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your booking has been successfully completed. A confirmation has been sent to your email.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-bg-blue-500 to-secondary p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Booking ID</p>
              <p className="text-2xl font-bold">{bookingId}</p>
            </div>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
              Confirmed
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Route */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-xl font-bold text-gray-800">{bookingData.from}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="border-t-2 border-dashed border-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <MapPin className="text-bg-blue-500" size={18} />
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">To</p>
              <p className="text-xl font-bold text-gray-800">{bookingData.to}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <Calendar className="text-bg-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-semibold">{new Date(bookingData.date).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Clock className="text-bg-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-semibold">{bookingData.time}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Users className="text-bg-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Seats</p>
              <p className="font-semibold">{bookingData.seats.map(s => s.number).join(', ')}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <CreditCard className="text-bg-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-semibold">UGX {bookingData.amount.toLocaleString()}</p>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-3">Passenger Details</h3>
            <div className="space-y-3">
              {bookingData.passengers.map((passenger, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Passenger {index + 1} (Seat {bookingData.seats[index]?.number})
                  </span>
                  <span className="font-medium">{passenger.fullName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium capitalize">{bookingData.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download size={18} />
          <span>Download Ticket</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center bg-blue-400 text-white space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Printer size={18} />
          <span>Print Ticket</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center bg-green-400 text-white space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Additional Links */}
      <div className="flex justify-center space-x-6">
        <Link
          to="/dashboard"
          className="text-blue-500 hover:text-blue-600 font-semibold"
        >
          View in Dashboard
        </Link>
        <button
          onClick={onNewBooking}
          className="text-gray-600 hover:text-red-400 font-semibold"
        >
          Book Another Trip
        </button>
      </div>

      {/* Important Information */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Please arrive at the terminal at least 1 hour before departure</li>
          <li>• Carry a valid ID matching the name on the ticket</li>
          <li>• You can cancel or modify your booking up to 2 hours before departure</li>
          <li>• For any assistance, contact our 24/7 support team</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingConfirmation;