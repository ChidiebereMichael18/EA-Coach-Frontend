import React from 'react';
import { Bus, Calendar, MapPin, Clock, Users, CreditCard, Shield, CheckCircle } from 'lucide-react';

const BookingSummary = ({ bus, seats, date, from, to }) => {
  const totalAmount = seats.length * bus.price;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
      
      {/* Bus Details */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Bus className="text-bg-blue-500" size={20} />
          </div>
          <div>
            <p className="font-semibold">{bus.company}</p>
            <p className="text-sm text-gray-500">{bus.type} • {bus.busNumber}</p>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start space-x-3">
          <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="font-medium">{from}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-medium">{to}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Calendar className="text-gray-400 flex-shrink-0 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{new Date(date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Clock className="text-gray-400 flex-shrink-0 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Departure Time</p>
            <p className="font-medium">{bus.departureTime}</p>
          </div>
        </div>
      </div>

      {/* Selected Seats */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Users size={18} className="text-gray-400" />
          <p className="text-sm text-gray-500">Selected Seats</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seats.map(seat => (
            <span
              key={seat.number}
              className="px-3 py-1 bg-yellow-400 text-gray-800 rounded-full text-sm font-semibold"
            >
              {seat.number}
            </span>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per seat</span>
            <span className="font-medium">UGX {bus.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Number of seats</span>
            <span className="font-medium">{seats.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Service fee</span>
            <span className="font-medium">UGX 0</span>
          </div>
        </div>
        
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-bg-blue-500">UGX {totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CheckCircle size={16} className="text-green-500" />
          <span>Secure booking</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CheckCircle size={16} className="text-green-500" />
          <span>Free cancellation up to 2 hours before departure</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield size={16} className="text-green-500" />
          <span>Your data is protected</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;