import React, { useState, useEffect } from 'react';
import { Info, Wifi, Zap, Wind, Tv, Coffee } from 'lucide-react';

const SeatMap = ({ busType, pricePerSeat, onSeatSelect, onConfirm, maxSelectable = 5 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = [3, 7, 14, 20, 27, 35, 41, 48]; // Mock booked seats

  // Build a proper 2-2 layout
  // Rows 1–13: 4 seats per row (A, B | aisle | C, D) = 52 seats
  // Row 14 (back row): 5 seats across = 5 seats  → total 57, trim to 53
  const ROWS = 13;
  const COLS = ['A', 'B', 'C', 'D']; // A,B = left; C,D = right

  const generateSeats = () => {
    const seats = [];
    let seatNum = 1;

    for (let row = 1; row <= ROWS; row++) {
      COLS.forEach(col => {
        if (seatNum > 52) return;
        seats.push({
          id: `${row}${col}`,
          number: seatNum,
          row,
          col,
          isBooked: bookedSeats.includes(seatNum),
          isWindow: col === 'A' || col === 'D',
          isBackRow: false,
        });
        seatNum++;
      });
    }

    // Back row: seats 53–57 (5 seats)
    for (let b = 0; b < 5; b++) {
      seats.push({
        id: `back-${b}`,
        number: seatNum++,
        row: 14,
        col: String(b),
        isBooked: bookedSeats.includes(seatNum - 1),
        isWindow: b === 0 || b === 4,
        isBackRow: true,
      });
    }

    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.number === seat.number);
      if (isSelected) return prev.filter(s => s.number !== seat.number);
      if (prev.length >= maxSelectable) {
        alert(`You can only select up to ${maxSelectable} seats.`);
        return prev;
      }
      return [...prev, seat];
    });
  };

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats]);

  const getSeatStyle = (seat) => {
    if (seat.isBooked) return 'bg-red-100 border-red-300 text-red-400 cursor-not-allowed';
    if (selectedSeats.some(s => s.number === seat.number))
      return 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105';
    if (seat.isWindow)
      return 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 cursor-pointer';
    return 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 cursor-pointer';
  };

  // Group non-back-row seats by row
  const rowSeats = {};
  for (let r = 1; r <= ROWS; r++) {
    rowSeats[r] = seats.filter(s => s.row === r && !s.isBackRow);
  }
  const backRowSeats = seats.filter(s => s.isBackRow);

  const amenities = [
    { icon: Wifi, label: 'WiFi', available: true },
    { icon: Wind, label: 'AC', available: true },
    { icon: Zap, label: 'USB', available: true },
    { icon: Tv, label: 'Entertainment', available: busType === 'Executive' || busType === 'VIP' },
    { icon: Coffee, label: 'Snacks', available: busType !== 'Standard' },
  ];

  const totalAmount = selectedSeats.length * pricePerSeat;

  return (
    <div className="space-y-6">

      {/* Amenities */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-blue-500" />
          <span className="font-semibold text-gray-700 text-sm">Bus Amenities</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {amenities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400 line-through'
              }`}>
                <Icon size={12} />
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-white border-gray-300" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-emerald-50 border-emerald-300" />
          <span>Window</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-blue-500 border-blue-600" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-red-100 border-red-300" />
          <span>Booked</span>
        </div>
        <span className="text-gray-400">· Max {maxSelectable} seats</span>
      </div>

      {/* Bus Body */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden">

        {/* Bus Front */}
        <div className="bg-gray-800 py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <span className="text-xl">🚌</span>
            <span className="font-bold text-sm tracking-widest uppercase">Front</span>
          </div>
          <div className="bg-gray-600 rounded px-3 py-1 text-xs text-gray-300 font-mono">
            DRIVER
          </div>
        </div>

        {/* Column Headers */}
        <div className="flex items-center justify-center gap-1 py-3 border-b border-gray-200 bg-white/60">
          <div className="w-8" /> {/* row number spacer */}
          <div className="flex gap-1">
            <div className="w-10 text-center text-xs font-bold text-gray-400">A</div>
            <div className="w-10 text-center text-xs font-bold text-gray-400">B</div>
          </div>
          <div className="w-8 text-center text-xs text-gray-300">☰</div>
          <div className="flex gap-1">
            <div className="w-10 text-center text-xs font-bold text-gray-400">C</div>
            <div className="w-10 text-center text-xs font-bold text-gray-400">D</div>
          </div>
        </div>

        {/* Seat Rows */}
        <div className="py-4 px-4 space-y-2">
          {Object.keys(rowSeats).map(rowNum => {
            const row = rowSeats[rowNum];
            const left = row.filter(s => s.col === 'A' || s.col === 'B').sort((a, b) => a.col > b.col ? 1 : -1);
            const right = row.filter(s => s.col === 'C' || s.col === 'D').sort((a, b) => a.col > b.col ? 1 : -1);

            return (
              <div key={rowNum} className="flex items-center justify-center gap-1">
                {/* Row number */}
                <div className="w-8 text-center text-xs text-gray-400 font-mono">{rowNum}</div>

                {/* Left 2 seats */}
                <div className="flex gap-1">
                  {left.map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.isBooked}
                      title={`Seat ${seat.number} (${seat.isWindow ? 'Window' : 'Aisle'})${seat.isBooked ? ' - Booked' : ''}`}
                      className={`
                        w-10 h-10 rounded-lg border-2 text-xs font-bold
                        transition-all duration-150 select-none
                        ${getSeatStyle(seat)}
                      `}
                    >
                      {seat.isBooked ? '✕' : seat.number}
                    </button>
                  ))}
                </div>

                {/* Aisle */}
                <div className="w-8 flex items-center justify-center">
                  <div className="h-8 w-px bg-gray-300 border-dashed" />
                </div>

                {/* Right 2 seats */}
                <div className="flex gap-1">
                  {right.map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.isBooked}
                      title={`Seat ${seat.number} (${seat.isWindow ? 'Window' : 'Aisle'})${seat.isBooked ? ' - Booked' : ''}`}
                      className={`
                        w-10 h-10 rounded-lg border-2 text-xs font-bold
                        transition-all duration-150 select-none
                        ${getSeatStyle(seat)}
                      `}
                    >
                      {seat.isBooked ? '✕' : seat.number}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Back Row - 5 seats across */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300">
            <p className="text-center text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Back Row</p>
            <div className="flex items-center justify-center gap-1">
              {backRowSeats.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isBooked}
                  title={`Seat ${seat.number}${seat.isBooked ? ' - Booked' : ''}`}
                  className={`
                    w-10 h-10 rounded-lg border-2 text-xs font-bold
                    transition-all duration-150 select-none
                    ${getSeatStyle(seat)}
                  `}
                >
                  {seat.isBooked ? '✕' : seat.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-gray-800">
              {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
            </span>
            <span className="text-lg font-bold text-blue-600">
              UGX {totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSeats
              .sort((a, b) => a.number - b.number)
              .map(seat => (
                <span
                  key={seat.number}
                  onClick={() => handleSeatClick(seat)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-red-400 transition-colors"
                  title="Click to deselect"
                >
                  {seat.number} ×
                </span>
              ))}
          </div>
          <button
            onClick={onConfirm}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Confirm {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} →
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatMap;