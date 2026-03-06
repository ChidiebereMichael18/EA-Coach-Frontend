import React, { useState } from 'react';
import { CreditCard, Smartphone, Landmark, Shield, AlertCircle } from 'lucide-react';

const PaymentSection = ({ totalAmount, busDetails, seats, passengers, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [mobileDetails, setMobileDetails] = useState({
    number: '',
    provider: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      icon: CreditCard,
      providers: ['Visa', 'Mastercard'],
      processingTime: 'Instant'
    },
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: Smartphone,
      providers: ['MTN'],
      processingTime: 'Instant'
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      icon: Smartphone,
      providers: ['Airtel'],
      processingTime: 'Instant'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Landmark,
      providers: ['All Banks'],
      processingTime: '1-2 hours'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentComplete(paymentMethod);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Payment Methods */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

          {/* Payment Method Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`
                    relative p-4 border-2 rounded-xl transition-all
                    ${isSelected 
                      ? 'border-bg-blue-500 bg-blue-500/5' 
                      : 'border-gray-200 hover:border-bg-blue-500/30'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">{method.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {method.providers.join(' • ')}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        ⚡ {method.processingTime}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Payment Forms */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Card Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({
                    ...cardDetails,
                    number: formatCardNumber(e.target.value)
                  })}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({
                      ...cardDetails,
                      expiry: e.target.value
                    })}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({
                      ...cardDetails,
                      cvv: e.target.value
                    })}
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({
                    ...cardDetails,
                    name: e.target.value
                  })}
                  placeholder="Name on card"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
                />
              </div>
            </div>
          )}

          {(paymentMethod === 'mtn' || paymentMethod === 'airtel') && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {paymentMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money'} Details
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={mobileDetails.number}
                  onChange={(e) => setMobileDetails({
                    ...mobileDetails,
                    number: e.target.value
                  })}
                  placeholder="07XXXXXXXX"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-bg-blue-500"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    You will receive a prompt on your phone to authorize this payment of UGX {totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Bank Transfer Details</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank</span>
                    <span className="font-medium">Centenary Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name</span>
                    <span className="font-medium">EA Coach Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-bg-blue-500">UGX {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Use your booking ID as the payment reference. Your booking will be confirmed once we receive the payment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-xl text-bg-blue-500">
                UGX {totalAmount.toLocaleString()}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Bus</span>
                <span className="font-medium">{busDetails.company}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Seats</span>
                <span className="font-medium">{seats.map(s => s.number).join(', ')}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Passengers</span>
                <span className="font-medium">{passengers.length}</span>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Shield size={16} className="text-green-500" />
            <span>Secure payment powered by SSL encryption</span>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={!paymentMethod || isProcessing}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>Complete Payment</span>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By completing this payment, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;