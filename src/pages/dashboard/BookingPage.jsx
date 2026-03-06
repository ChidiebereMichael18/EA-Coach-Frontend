import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SeatMap from "../../components/booking/SeatMap";
import BookingSummary from "../../components/booking/BookingSummary";
import PassengerForm from "../../components/booking/PassengerForm";
import PaymentSection from "../../components/booking/PaymentSection";
import BookingConfirmation from "../../components/booking/BookingConfirmation";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  ChevronLeft,
  Bus,
} from "lucide-react";
import Header from "../../components/dashboard/Header";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      from: '',
      to: '',
      date: ''
    });
  const [searchData, setSearchData] = useState({
    from: queryParams.get("from") || "Kampala",
    to: queryParams.get("to") || "Nairobi",
    date: queryParams.get("date") || new Date().toISOString().split("T")[0],
  });
  const [availableBuses, setAvailableBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");

useEffect(() => {
  if (!selectedBus && currentStep > 1) {
    setCurrentStep(1);
  }
}, [selectedBus, currentStep]);


 const ugandaLocations = [
    'Kampala',
    'Jinja',
    'Mbarara',
    'Gulu',
    'Lira',
    'Arua',
    'Masaka',
    'Mbale',
    'Fort Portal',
    'Kabale',
    'Kasese',
    'Soroti',
    'Kitgum',
    'Hoima','Nairobi', 'Kigali', 'Dar es Salaam'
  ];

  const destinations = [
    'Kampala',
    'Jinja',
    'Mbarara',
    'Gulu',
    'Lira',
    'Arua',
    'Masaka',
    'Mbale',
    'Fort Portal',
    'Kabale',
    'Kasese',
    'Soroti',
    'Kitgum',
    'Hoima', 'Nairobi', 'Kigali', 'Dar es Salaam'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search
    console.log('Searching:', formData);
  };
  // Mock data - replace with API calls
  useEffect(() => {
    // Simulate fetching available buses
    const mockBuses = [
      {
        id: 1,
        company: "Jaguar Executive",
        logo: "🚌",
        type: "Executive",
        departureTime: "08:00",
        arrivalTime: "18:00",
        duration: "10h",
        price: 150000,
        amenities: ["WiFi", "AC", "USB", "Meals", "Entertainment"],
        availableSeats: 45,
        totalSeats: 53,
        busNumber: "JX-001",
      },
      {
        id: 2,
        company: "Gateway Bus",
        logo: "🚍",
        type: "Luxury",
        departureTime: "09:00",
        arrivalTime: "19:00",
        duration: "10h",
        price: 120000,
        amenities: ["WiFi", "AC", "USB", "Snacks"],
        availableSeats: 38,
        totalSeats: 53,
        busNumber: "GW-002",
      },
      {
        id: 3,
        company: "Nile Star",
        logo: "⭐",
        type: "VIP",
        departureTime: "07:00",
        arrivalTime: "17:00",
        duration: "10h",
        price: 135000,
        amenities: ["WiFi", "AC", "USB", "Entertainment", "Blanket"],
        availableSeats: 42,
        totalSeats: 53,
        busNumber: "NS-003",
      },
      {
        id: 4,
        company: "Mash Poa",
        logo: "⚡",
        type: "Standard",
        departureTime: "06:00",
        arrivalTime: "16:00",
        duration: "10h",
        price: 100000,
        amenities: ["AC", "USB"],
        availableSeats: 50,
        totalSeats: 53,
        busNumber: "MP-004",
      },
    ];
    setAvailableBuses(mockBuses);
  }, [searchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchData.to) {
      alert("Please select a destination");
      return;
    }
    // In real app: fetch from API using searchData
    // Mock buses are already loaded via useEffect
    console.log("Searching:", searchData);
  };

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setCurrentStep(2);
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleSeatConfirm = () => {
    if (selectedSeats.length > 0) {
      setCurrentStep(3);
    }
  };


  const handlePassengerSubmit = (passengers) => {
    setPassengerDetails(passengers);
    setCurrentStep(4);
  };

const handlePaymentComplete = (method) => {
  if (!selectedBus) return; // Safety guard

  setPaymentMethod(method);
  const newBookingId = `BK-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  setBookingId(newBookingId);
  setBookingComplete(true);

  const bookingData = {
    id: newBookingId,
    bookingId: newBookingId,
    from: searchData.from,
    to: searchData.to,
    date: searchData.date,
    time: selectedBus.departureTime,
    company: selectedBus.company,
    busNumber: selectedBus.busNumber,
    seats: selectedSeats,
    amount: selectedSeats.length * selectedBus.price,
    price: selectedBus.price,
    status: 'confirmed',
    bookingDate: new Date().toISOString(),
    passengers: passengerDetails,
    paymentMethod: method,
  };

  const existingBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
  existingBookings.push(bookingData);
  localStorage.setItem('userBookings', JSON.stringify(existingBookings));
};

  const steps = [
    { number: 1, name: "Select Bus", icon: Search },
    { number: 2, name: "Choose Seats", icon: Bus },
    { number: 3, name: "Passenger Info", icon: "👤" },
    { number: 4, name: "Payment", icon: "💳" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        {!bookingComplete && (
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center">
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      ${
                        currentStep > step.number
                          ? "bg-green-500 text-white"
                          : currentStep === step.number
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }
                    `}
                    >
                      {currentStep > step.number ? "✓" : step.number}
                    </div>
                    <span
                      className={`ml-2 hidden sm:block text-sm font-medium
                      ${currentStep >= step.number ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2
                      ${currentStep > step.number + 1 ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {bookingComplete ? (
          <BookingConfirmation
            bookingId={bookingId}
            bookingData={{
              from: searchData.from,
              to: searchData.to,
              date: searchData.date,
              time: selectedBus?.departureTime,
              company: selectedBus?.company,
              busNumber: selectedBus?.busNumber,
              seats: selectedSeats,
              amount: selectedSeats.length * selectedBus?.price,
              passengers: passengerDetails,
              paymentMethod,
            }}
            onNewBooking={() => {
              setCurrentStep(1);
              setSelectedBus(null);
              setSelectedSeats([]);
              setPassengerDetails([]);
              setPaymentMethod("");
              setBookingComplete(false);
            }}
          />
        ) : (
          <>
            {/* Step 1: Search and Bus Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-2">
                          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              {/* From Field */}
                              <div className="relative">
                                <label className="block text-sm font-bold text-gray-800 mb-3">
                                  <MapPin className="inline-block mr-2 text-blue-600" size={18} />
                                  From
                                </label>
                                <select
                                  value={formData.from}
                                  onChange={(e) => setFormData({...formData, from: e.target.value})}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium transition-all"
                                >
                                  <option value="">Select departure city</option>
                                  {ugandaLocations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                  ))}
                                </select>
                              </div>
              
                              {/* To Field */}
                              <div className="relative">
                                <label className="block text-sm font-bold text-gray-800 mb-3">
                                  <MapPin className="inline-block mr-2 text-orange-600" size={18} />
                                  To
                                </label>
                                <select
                                  value={formData.to}
                                  onChange={(e) => setFormData({...formData, to: e.target.value})}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-800 font-medium transition-all"
                                >
                                  <option value="">Select destination</option>
                                  {destinations.map(dest => (
                                    <option key={dest} value={dest}>{dest}</option>
                                  ))}
                                </select>
                              </div>
              
                              {/* Date Field */}
                              <div className="relative">
                                <label className="block text-sm font-bold text-gray-800 mb-3">
                                  <Calendar className="inline-block mr-2 text-green-600" size={18} />
                                  Date
                                </label>
                                <input
                                  type="date"
                                  value={formData.date}
                                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                                  min={new Date().toISOString().split('T')[0]}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-gray-800 font-medium transition-all"
                                />
                              </div>
              
                              {/* Search Button */}
                              <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group self-end"
                              >
                                <Search size={20} />
                                <span>Search</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </form>
                        </div>

                {/* Available Buses */}
                {!searchData.to ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">🚌</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Where are you headed?
                    </h3>
                    <p className="text-gray-500">
                      Select a destination above to see available buses.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Available Buses</h2>
                    <div className="space-y-4">
                      {availableBuses.map((bus) => (
                        <div
                          key={bus.id}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              {/* Bus Info */}
                              <div className="flex items-start space-x-4">
                                <div className="bg-blue-500/10 p-4 rounded-xl text-3xl">
                                  {bus.logo}
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="text-xl font-bold text-gray-800">
                                      {bus.company}
                                    </h3>
                                    <span className="px-3 py-1 bg-blue-500/10 text-bg-blue-500 rounded-full text-xs font-semibold">
                                      {bus.type}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Bus No: {bus.busNumber}
                                  </p>

                                  {/* Amenities */}
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {bus.amenities.map((amenity, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Time & Price */}
                              <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                                <div className="flex items-center space-x-4">
                                  <div className="text-center">
                                    <p className="text-sm text-gray-500">
                                      Departure
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                      {bus.departureTime}
                                    </p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-gray-500">
                                      Arrival
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                      {bus.arrivalTime}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                  {bus.duration}
                                </p>
                                <div className="flex items-center space-x-4 mt-3">
                                  <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                      Price per seat
                                    </p>
                                    <p className="text-2xl font-bold text-blue-500">
                                      UGX {bus.price.toLocaleString()}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleBusSelect(bus)}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                                  >
                                    Select Bus
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Seat Availability */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-600">
                                    Available Seats:
                                  </span>
                                  <span className="font-semibold text-green-600">
                                    {bus.availableSeats}/{bus.totalSeats}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${
                                        i <
                                        Math.ceil(
                                          (bus.availableSeats /
                                            bus.totalSeats) *
                                            5,
                                        )
                                          ? "bg-green-500"
                                          : "bg-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Seat Selection */}
            {currentStep === 2 && selectedBus && (
              <div className="space-y-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>Back to bus selection</span>
                </button>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      Select Your Seats
                    </h2>
                    <p className="text-gray-600">
                      {selectedBus.company} • {selectedBus.departureTime} •{" "}
                      {searchData.date}
                    </p>
                  </div>

                  <SeatMap
                    busType={selectedBus.type}
                    pricePerSeat={selectedBus.price}
                    onSeatSelect={handleSeatSelect}
                    onConfirm={handleSeatConfirm}
                    maxSelectable={5} // Maximum seats per booking
                  />
                </div>
              </div>
            )}

            {/* Step 3: Passenger Details */}
            {currentStep === 3 && selectedSeats.length > 0 && (
              <div className="space-y-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>Back to seat selection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Passenger Form */}
                  <div className="lg:col-span-2">
                    <PassengerForm
                      seatCount={selectedSeats.length}
                      selectedSeats={selectedSeats}
                      busPrice={selectedBus.price}
                      onSubmit={handlePassengerSubmit}
                    />
                  </div>

                  {/* Booking Summary Sidebar */}
                  <div className="lg:col-span-1">
                    <BookingSummary
                      bus={selectedBus}
                      seats={selectedSeats}
                      date={searchData.date}
                      from={searchData.from}
                      to={searchData.to}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && passengerDetails.length > 0 && (
              <div className="space-y-6">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>Back to passenger details</span>
                </button>

                <PaymentSection
                  totalAmount={selectedSeats.length * selectedBus.price}
                  busDetails={selectedBus}
                  seats={selectedSeats}
                  passengers={passengerDetails}
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default BookingPage;
