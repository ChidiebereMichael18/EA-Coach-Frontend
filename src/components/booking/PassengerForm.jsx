import React, { useState } from 'react';
import { User, Phone, Mail, IdCard, Calendar, Users } from 'lucide-react';

const PassengerForm = ({ seatCount, selectedSeats, busPrice, onSubmit }) => {
  const [passengers, setPassengers] = useState(
    Array(seatCount).fill().map((_, index) => ({
      id: index + 1,
      seatNumber: selectedSeats[index]?.number || '',
      fullName: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      idType: 'National ID',
      idNumber: ''
    }))
  );

  const [errors, setErrors] = useState({});

  const handleChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
    
    // Clear error for this field
    if (errors[`${index}-${field}`]) {
      setErrors(prev => ({ ...prev, [`${index}-${field}`]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    passengers.forEach((passenger, index) => {
      if (!passenger.fullName.trim()) {
        newErrors[`${index}-fullName`] = 'Name is required';
      } else if (passenger.fullName.length < 3) {
        newErrors[`${index}-fullName`] = 'Name must be at least 3 characters';
      }
      
      if (!passenger.age) {
        newErrors[`${index}-age`] = 'Age is required';
      } else if (passenger.age < 1 || passenger.age > 120) {
        newErrors[`${index}-age`] = 'Please enter a valid age';
      }
      
      if (!passenger.gender) {
        newErrors[`${index}-gender`] = 'Gender is required';
      }
      
      if (!passenger.phone) {
        newErrors[`${index}-phone`] = 'Phone number is required';
      } else if (!/^[0-9+\-\s()]{10,}$/.test(passenger.phone)) {
        newErrors[`${index}-phone`] = 'Please enter a valid phone number';
      }
      
      if (passenger.email && !/\S+@\S+\.\S+/.test(passenger.email)) {
        newErrors[`${index}-email`] = 'Please enter a valid email';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(passengers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Passenger Forms */}
      {passengers.map((passenger, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Users className="text-bg-blue-500" size={20} />
            </div>
            <h3 className="text-lg font-semibold">
              Passenger {index + 1} {selectedSeats[index] && `- Seat ${selectedSeats[index].number}`}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={passenger.fullName}
                  onChange={(e) => handleChange(index, 'fullName', e.target.value)}
                  placeholder="Enter full name"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500 ${
                    errors[`${index}-fullName`] ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors[`${index}-fullName`] && (
                <p className="mt-1 text-xs text-red-500">{errors[`${index}-fullName`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handleChange(index, 'age', e.target.value)}
                  placeholder="Enter age"
                  min="1"
                  max="120"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500 ${
                    errors[`${index}-age`] ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors[`${index}-age`] && (
                <p className="mt-1 text-xs text-red-500">{errors[`${index}-age`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                value={passenger.gender}
                onChange={(e) => handleChange(index, 'gender', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500 ${
                  errors[`${index}-gender`] ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors[`${index}-gender`] && (
                <p className="mt-1 text-xs text-red-500">{errors[`${index}-gender`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => handleChange(index, 'phone', e.target.value)}
                  placeholder="+256 XXX XXX XXX"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500 ${
                    errors[`${index}-phone`] ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors[`${index}-phone`] && (
                <p className="mt-1 text-xs text-red-500">{errors[`${index}-phone`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handleChange(index, 'email', e.target.value)}
                  placeholder="Enter email"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500 ${
                    errors[`${index}-email`] ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors[`${index}-email`] && (
                <p className="mt-1 text-xs text-red-500">{errors[`${index}-email`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Type
              </label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={passenger.idType}
                  onChange={(e) => handleChange(index, 'idType', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
                >
                  <option>National ID</option>
                  <option>Passport</option>
                  <option>Driving Permit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                value={passenger.idNumber}
                onChange={(e) => handleChange(index, 'idNumber', e.target.value)}
                placeholder="Enter ID number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default PassengerForm;