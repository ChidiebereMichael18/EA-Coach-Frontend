import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  ArrowLeft,
  ChevronLeft,
  Bus,
  AlertCircle,
} from "lucide-react";
import Header from "../../components/dashboard/Header";
import { getBuses } from "../../api/busApi";
import { createBooking } from "../../api/dashboardApi";

const LOCATIONS = [
  "Kampala", "Jinja", "Mbarara", "Gulu", "Lira", "Arua", "Masaka", "Mbale",
  "Fort Portal", "Kabale", "Kasese", "Soroti", "Kitgum", "Hoima",
  "Nairobi", "Kigali", "Dar es Salaam","Dodoma, Bujumbura, Arusha, Mombasa, Kisumu"
];


function mapBusFromApi(bus) {
  const a = bus.amenities || {};
  const amenities = [
    a.wifi && "WiFi",
    a.ac && "AC",
    a.usbCharging && "USB",
    a.entertainment && "Entertainment",
    a.bulletproof && "Secure",
  ].filter(Boolean);
  return {
    _id: bus._id,
    id: bus._id,
    company: bus.operator?.name || bus.busNumber || "—",
    logo: "🚌",
    type: bus.busType || "Standard",
    departureTime: bus.route?.departureTime || "—",
    arrivalTime: bus.route?.arrivalTime || "—",
    duration: "—",
    price: bus.route?.price ?? 0,
    amenities,
    availableSeats: bus.totalSeats ?? 53,
    totalSeats: bus.totalSeats ?? 53,
    busNumber: bus.busNumber || "—",
  };
}

function mapPaymentMethodForApi(method) {
  if (method === "card") return "card";
  if (method === "mtn" || method === "airtel") return "mobile_money";
  return "cash";
}

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    from: queryParams.get("from") || "Kampala",
    to: queryParams.get("to") || "Nairobi",
    date: queryParams.get("date") || new Date().toISOString().split("T")[0],
  });
  const [searchData, setSearchData] = useState({
    from: formData.from,
    to: formData.to,
    date: formData.date,
  });
  const [availableBuses, setAvailableBuses] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [bookingError, setBookingError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    try {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    } catch {
      setUser(null);
    }
    setAuthChecked(true);
  }, [navigate]);

  useEffect(() => {
    if (!selectedBus && currentStep > 1) {
      setCurrentStep(1);
    }
  }, [selectedBus, currentStep]);

  useEffect(() => {
    const from = queryParams.get("from");
    const to = queryParams.get("to");
    if (from && to) {
      handleSearch({ 
        from, 
        to, 
        date: queryParams.get("date") || formData.date 
      });
    }
  }, []);

  const handleSearch = (searchParams) => {
    setSearchData({ ...searchParams });
    setSearchError(null);
    setSearchLoading(true);
    getBuses({ from: searchParams.from, to: searchParams.to })
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setAvailableBuses(res.data.map(mapBusFromApi));
        } else {
          setSearchError(res.errorMessage || "Failed to load buses.");
        }
      })
      .catch(() => setSearchError("Failed to load buses."))
      .finally(() => setSearchLoading(false));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.from || !formData.to) {
      setSearchError("Please select from and destination.");
      return;
    }
    handleSearch(formData);
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

  const handlePaymentComplete = async (method) => {
    if (!selectedBus || !selectedSeats.length || !passengerDetails.length) return;

    setBookingError(null);
    setPaymentMethod(method);

    const passengers = passengerDetails.map((p, i) => ({
      name: p.fullName?.trim() || p.name || "",
      age: Number(p.age) || 0,
      gender: p.gender || "Other",
      seatNumber: selectedSeats[i]?.number ?? i + 1,
    }));

    const totalAmount = selectedSeats.length * (selectedBus.price || 0);
    const result = await createBooking({
      busId: selectedBus._id,
      from: searchData.from,
      to: searchData.to,
      departureDate: searchData.date,
      departureTime: selectedBus.departureTime,
      passengers,
      totalSeats: selectedSeats.length,
      totalAmount,
      paymentMethod: mapPaymentMethodForApi(method),
    });

    if (result.success && result.data) {
      setBookingId(result.data.bookingId || result.data._id);
      setBookingComplete(true);
    } else {
      setBookingError(result.errorMessage || "Booking failed. Please try again.");
      throw new Error(result.errorMessage);
    }
  };

  const steps = [
    { number: 1, name: "Select Bus", icon: Search },
    { number: 2, name: "Choose Seats", icon: Bus },
    { number: 3, name: "Passenger Info", icon: "👤" },
    { number: 4, name: "Payment", icon: "💳" },
  ];

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 text-gray-700 transition-all font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        {!bookingComplete && (
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                        ${currentStep > step.number
                          ? "bg-green-500 text-white"
                          : currentStep === step.number
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                        }`}
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
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* From Field */}
                      <div className="relative">
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          <MapPin className="inline-block mr-2 text-blue-600" size={18} />
                          From
                        </label>
                        <select
                          value={formData.from}
                          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium transition-all"
                        >
                          <option value="">Select departure city</option>
                          {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
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
                          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-800 font-medium transition-all"
                        >
                          <option value="">Select destination</option>
                          {LOCATIONS.map((dest) => (
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
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
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

                {searchError && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    {searchError}
                  </div>
                )}

                {/* Available Buses */}
                {!searchData.from || !searchData.to ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">🚌</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Where are you headed?
                    </h3>
                    <p className="text-gray-500">
                      Select from and destination, then search to see available buses.
                    </p>
                  </div>
                ) : searchLoading ? (
                  <div className="bg-white rounded-xl shadow-md p-12 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-600">Loading buses...</span>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Available Buses</h2>
                    <div className="space-y-4">
                      {availableBuses.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                          No buses found for this route. Try different cities or dates.
                        </div>
                      ) : (
                        availableBuses.map((bus) => (
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
                                      <span className="px-3 py-1 bg-blue-500/10 rounded-full text-xs font-semibold">
                                        {bus.type}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                      Bus No: {bus.busNumber}
                                    </p>
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
                                      <p className="text-sm text-gray-500">Departure</p>
                                      <p className="text-xl font-bold text-gray-800">
                                        {bus.departureTime}
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm text-gray-500">Arrival</p>
                                      <p className="text-xl font-bold text-gray-800">
                                        {bus.arrivalTime}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-2">{bus.duration}</p>
                                  <div className="flex items-center space-x-4 mt-3">
                                    <div className="text-right">
                                      <p className="text-sm text-gray-500">Price per seat</p>
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
                                    <span className="text-sm text-gray-600">Available Seats:</span>
                                    <span className="font-semibold text-green-600">
                                      {bus.availableSeats}/{bus.totalSeats}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full ${
                                          i < Math.ceil((bus.availableSeats / bus.totalSeats) * 5)
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
                        ))
                      )}
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
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-all font-medium group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Back to bus selection</span>
                </button>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Select Your Seats</h2>
                    <p className="text-gray-600">
                      {selectedBus.company} • {selectedBus.departureTime} • {searchData.date}
                    </p>
                  </div>
                  <SeatMap
                    busType={selectedBus.type}
                    pricePerSeat={selectedBus.price}
                    onSeatSelect={handleSeatSelect}
                    onConfirm={handleSeatConfirm}
                    maxSelectable={5}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Passenger Details */}
            {currentStep === 3 && selectedSeats.length > 0 && (
              <div className="space-y-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-all font-medium group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Back to seat selection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PassengerForm
                      seatCount={selectedSeats.length}
                      selectedSeats={selectedSeats}
                      busPrice={selectedBus.price}
                      onSubmit={handlePassengerSubmit}
                    />
                  </div>
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
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-all font-medium group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Back to passenger details</span>
                </button>

                <PaymentSection
                  totalAmount={selectedSeats.length * selectedBus.price}
                  busDetails={selectedBus}
                  seats={selectedSeats}
                  passengers={passengerDetails}
                  onPaymentComplete={handlePaymentComplete}
                  bookingError={bookingError}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default BookingPage;