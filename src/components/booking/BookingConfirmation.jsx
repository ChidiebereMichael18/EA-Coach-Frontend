import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';
import { CheckCircle, Download, Printer, Share2, Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';

const BookingConfirmation = ({ bookingId, bookingData, onNewBooking }) => {
  const ticketRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [aiTip, setAiTip] = useState('');

  React.useEffect(() => {
    if (bookingData?.to && import.meta.env.VITE_OPENAI_API_KEY) {
      setAiTip('Loading personalized travel tip...');
      const fetchAi = async () => {
        try {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                { role: 'system', content: 'You are EA Coach AI. Generate a very brief 1-sentence fun fact or travel tip about the destination.' },
                { role: 'user', content: `Destination: ${bookingData.to}` }
              ],
              max_tokens: 50
            })
          });
          const data = await res.json();
          if (data.choices && data.choices[0]) {
            setAiTip(data.choices[0].message.content);
          } else {
            setAiTip('');
          }
        } catch (e) {
          console.error('AI Error:', e);
          setAiTip('');
        }
      };
      fetchAi();
    }
  }, [bookingData?.to]);

  const handleDownload = async () => {
    const printElement = ticketRef.current;
    if (!printElement) {
       alert("Ticket element not found.");
       return;
    }
    
    setIsDownloading(true);
    try {
      const imgData = await domtoimage.toJpeg(printElement, { quality: 1.0, bgcolor: '#ffffff' });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      const pdfHeight = (img.height * pdfWidth) / img.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`EACoach-Ticket-${bookingId}.pdf`);
    } catch (err) {
      console.error("Failed to download ticket", err);
      alert("Failed to generate PDF ticket: " + (err.message || String(err)));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `My EA Coach bus ticket from ${bookingData?.from} to ${bookingData?.to} is confirmed! Booking ID: ${bookingId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EA Coach Booking Confirmation',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Booking Details copied to clipboard!');
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
      <div ref={ticketRef} className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
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
                  <MapPin className="text-blue-500" size={18} />
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
              <Calendar className="text-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-semibold">{new Date(bookingData.date).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Clock className="text-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-semibold">{bookingData.time}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <Users className="text-blue-500 mb-1" size={18} />
              <p className="text-xs text-gray-500">Seats</p>
              <p className="font-semibold">{bookingData.seats.map(s => s.number).join(', ')}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <CreditCard className="text-blue-500 mb-1" size={18} />
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
          <div className="border-t border-gray-200 pt-4 mt-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium capitalize">{bookingData.paymentMethod}</span>
            </div>
          </div>

          {/* AI Tip Section */}
          {aiTip && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                 ✨ EA Coach AI Tip for {bookingData.to}
              </p>
              <p className="text-sm text-gray-700 italic">"{aiTip}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Ticket</span>
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center bg-green-500 text-white space-x-2 px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Share2 size={18} />
          <span>Share Ticket</span>
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
          {/* <li>• You can cancel or modify your booking up to 2 hours before departure</li> */}
          <li>• For any assistance, contact our 24/7 support team</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingConfirmation;