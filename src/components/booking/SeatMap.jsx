import React, { useState, useEffect } from 'react';
import { Info, User, Wifi, Zap, Wind, Tv, Coffee } from 'lucide-react';

const SeatMap = ({ busType, pricePerSeat, onSeatSelect, onConfirm, maxSelectable = 5 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([5, 12, 18, 25, 33, 42]); // Mock booked seats
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Generate 53 seats with realistic layout
  const generateSeats = () => {
    const seats = [];
    // Left side seats (12 seats: 1-3, 5-7, 9-11, 13-15)
    const leftSeats = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15];
    // Right side seats (34 seats: 16-49)
    const rightSeats = Array.from({ length: 34 }, (_, i) => i + 16);
    // Back row (4 seats: 50-53)
    const backSeats = [50, 51, 52, 53];

    [...leftSeats, ...rightSeats, ...backSeats].forEach(seatNumber => {
      let row = Math.floor((seatNumber - 1) / 4) + 1;
      let column = ((seatNumber - 1) % 4) + 1;
      
      // Adjust for left side gaps
      if (seatNumber <= 15) {
        if (seatNumber <= 3) row = 1;
        else if (seatNumber <= 7) row = 2;
        else if (seatNumber <= 11) row = 3;
        else row = 4;
      }

      seats.push({
        number: seatNumber,
        row,
        column,
        isBooked: bookedSeats.includes(seatNumber),
        isSelected: false,
        isAisle: column === 2 || column === 3,
        isWindow: column === 1 || column === 4,
        isLeftSide: seatNumber <= 15,
        isBackRow: seatNumber >= 50
      });
    });

    return seats.sort((a, b) => a.number - b.number);
  };

  const [seats, setSeats] = useState(generateSeats());

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.number === seat.number);
      
      if (isSelected) {
        return prev.filter(s => s.number !== seat.number);
      } else {
        if (prev.length >= maxSelectable) {
          alert(`You can only select up to ${maxSelectable} seats per booking.`);
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  const getSeatColor = (seat) => {
    if (seat.isBooked) return 'bg-red-500 cursor-not-allowed';
    if (selectedSeats.some(s => s.number === seat.number)) return 'bg-yellow-400 hover:bg-yellow-500';
    if (hoveredSeat === seat.number) return 'bg-blue-400 hover:bg-blue-500';
    return 'bg-green-500 hover:bg-green-600';
  };

  const getSeatIcon = (seat) => {
    if (seat.isBooked) return '✕';
    if (seat.isWindow) return '🪟';
    return '';
  };

  // Group seats by rows for display
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const amenities = [
    { icon: Wifi, label: 'Free WiFi', available: true },
    { icon: Wind, label: 'AC', available: true },
    { icon: Zap, label: 'USB Charging', available: true },
    { icon: Tv, label: 'Entertainment', available: busType === 'Executive' },
    { icon: Coffee, label: 'Snacks', available: busType !== 'Standard' }
  ];

  return (
    <div className="space-y-6">
      {/* Bus Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Info size={18} className="text-bg-blue-500" />
          <span className="font-semibold">Bus Amenities</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                  item.available 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat Legend */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-lg"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-lg"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-400 rounded-lg"></div>
          <span className="text-sm">Window</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Max {maxSelectable} seats per booking</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="relative bg-white p-6 rounded-lg shadow-inner">
        {/* Driver Area */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-lg">
            <span className="font-semibold">🚌 DRIVER</span>
          </div>
        </div>

        {/* Seat Map Grid */}
        <div className="max-w-3xl mx-auto">
          {Object.keys(seatsByRow).map(rowNum => (
            <div key={rowNum} className="flex justify-center mb-2">
              {/* Left side seats */}
              <div className="flex space-x-2 mr-4">
                {seatsByRow[rowNum]
                  .filter(seat => seat.isLeftSide)
                  .sort((a, b) => a.column - b.column)
                  .map(seat => (
                    <button
                      key={seat.number}
                      onClick={() => handleSeatClick(seat)}
                      onMouseEnter={() => setHoveredSeat(seat.number)}
                      onMouseLeave={() => setHoveredSeat(null)}
                      disabled={seat.isBooked}
                      className={`
                        relative w-12 h-12 rounded-lg flex items-center justify-center
                        text-white font-semibold transition-all duration-200
                        transform hover:scale-105 hover:shadow-lg
                        ${getSeatColor(seat)}
                        ${seat.isWindow ? 'border-2 border-blue-300' : ''}
                      `}
                      title={`Seat ${seat.number}${seat.isWindow ? ' (Window)' : ''}`}
                    >
                      {seat.number}
                      {seat.isWindow && (
                        <span className="absolute -top-1 -right-1 text-xs">🪟</span>
                      )}
                    </button>
                  ))}
              </div>

              {/* Aisle */}
              <div className="w-8 flex items-center justify-center">
                <span className="text-gray-400 text-xs">◊</span>
              </div>

              {/* Right side seats */}
              <div className="flex space-x-2">
                {seatsByRow[rowNum]
                  .filter(seat => !seat.isLeftSide && !seat.isBackRow)
                  .sort((a, b) => a.column - b.column)
                  .map(seat => (
                    <button
                      key={seat.number}
                      onClick={() => handleSeatClick(seat)}
                      onMouseEnter={() => setHoveredSeat(seat.number)}
                      onMouseLeave={() => setHoveredSeat(null)}
                      disabled={seat.isBooked}
                      className={`
                        relative w-12 h-12 rounded-lg flex items-center justify-center
                        text-white font-semibold transition-all duration-200
                        transform hover:scale-105 hover:shadow-lg
                        ${getSeatColor(seat)}
                        ${seat.isWindow ? 'border-2 border-blue-300' : ''}
                      `}
                      title={`Seat ${seat.number}${seat.isWindow ? ' (Window)' : ''}`}
                    >
                      {seat.number}
                      {seat.isWindow && (
                        <span className="absolute -top-1 -right-1 text-xs">🪟</span>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          ))}

          {/* Back Row */}
          <div className="mt-8">
            <div className="text-center mb-2">
              <span className="text-sm text-gray-500">Back Row</span>
            </div>
            <div className="flex justify-center space-x-2">
              {seats
                .filter(seat => seat.isBackRow)
                .sort((a, b) => a.number - b.number)
                .map(seat => (
                  <button
                    key={seat.number}
                    onClick={() => handleSeatClick(seat)}
                    onMouseEnter={() => setHoveredSeat(seat.number)}
                    onMouseLeave={() => setHoveredSeat(null)}
                    disabled={seat.isBooked}
                    className={`
                      relative w-12 h-12 rounded-lg flex items-center justify-center
                      text-white font-semibold transition-all duration-200
                      transform hover:scale-105 hover:shadow-lg
                      ${getSeatColor(seat)}
                    `}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Seat Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>• Window seats have extra legroom and a window view</p>
          <p>• Aisle seats provide easier access to the aisle</p>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-500/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Selected Seats:</span>
            <span className="text-bg-blue-500 font-bold">
              UGX {(selectedSeats.length * pricePerSeat).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSeats.map(seat => (
              <span
                key={seat.number}
                className="px-3 py-1 bg-yellow-400 text-gray-800 rounded-full text-sm font-semibold"
              >
                Seat {seat.number}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {selectedSeats.length} seat(s) selected
            </p>
            <button
              onClick={onConfirm}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirm Seats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;