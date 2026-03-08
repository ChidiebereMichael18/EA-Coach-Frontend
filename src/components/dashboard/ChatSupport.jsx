import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  MessageCircle,
  HelpCircle,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

const ChatSupport = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your EA Coach assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const commonQuestions = [
    "How do I change my booking?",
    "What payment methods do you accept?",
    "Can I cancel my ticket?",
    "What's your baggage policy?",
    "How early should I arrive at the terminal?",
    "Do you offer student discounts?"
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
const botResponses = {
  default: "I'll help you with that. Let me check the information for you.",
  
  // Greetings
  hello: "Hi there! I'm here to help you with any questions about your bus bookings, payments, and more. What can I assist you with today?",
  hi: "Hello! How can I assist you today? If you have any questions about your bookings, payments, or our services, feel free to ask!",
  hey: "Hey! Great to have you here. How can I help you today?",
  morning: "Good morning! Hope you're having a great day. How can I assist you with your travel plans?",
  afternoon:" Good afternoon! What can I help you with regarding your bus bookings or travel questions?",
  evening: "Good evening! How can I assist you with your travel arrangements?",

  // Booking related
  booking: "You can change your booking through the 'Booking History' section. Select the trip and click 'Modify Booking'.",
  "change booking": "To change your booking, go to 'Booking History', select your trip, and click 'Modify Booking'. Changes must be made at least 3 hours before departure.",
  "new booking": "To make a new booking, simply go to the home page, select your departure city, destination, and travel date, then choose your preferred bus and seats!",
  "booking history": "You can view all your past and upcoming bookings in the 'Booking History' section under your profile.",
  "booking confirmation": "Your booking confirmation is sent to your registered email and phone number via SMS shortly after payment is complete.",
  "booking id": "Your booking ID can be found in your confirmation email or under 'Booking History' in your account.",

  // Payment related
  payment: "We accept MTN MoMo, Airtel Money, Visa, Mastercard, and bank transfers.",
  "payment failed": "If your payment failed, please check your mobile money balance or card details and try again. If the issue persists, contact your bank or reach out to our support team.",
  "payment pending": "Pending payments are usually resolved within 5–10 minutes. If it takes longer, please contact our support team with your booking ID.",
  refund: "Refunds are processed within 3–5 business days back to your original payment method. You'll receive a confirmation SMS/email once processed.",
  receipt: "Your payment receipt is sent to your email after a successful transaction. You can also download it from 'Booking History'.",
  "mobile money": "We support MTN Mobile Money and Airtel Money. Simply select your preferred option at checkout and follow the prompts.",

  // Cancellation
  cancel: "Yes, you can cancel your ticket up to 2 hours before departure. Refund policies apply.",
  "cancellation policy": "Cancellations made more than 24 hours before departure receive a full refund. Cancellations within 24 hours receive a 50% refund. No refunds within 2 hours of departure.",
  "how to cancel": "To cancel your booking, go to 'Booking History', find your trip, and click 'Cancel Booking'. You'll receive a confirmation and refund details via email.",

  // Baggage
  baggage: "You're allowed one carry-on bag (7kg) and one checked bag (20kg). Additional baggage fees may apply.",
  "extra baggage": "Extra baggage beyond the 20kg limit is charged at UGX 5,000 per additional kg. Please declare extra baggage at the terminal.",
  "lost luggage": "If your luggage is lost, please report it immediately at the terminal or call our support line. We'll work to locate it as quickly as possible.",

  // Arrival & Departure
  arrival: "We recommend arriving at least 1 hour before departure for domestic trips and 2 hours for international trips.",
  departure: "Please check your ticket for the exact departure time. Buses depart on schedule, so please arrive early.",
  late: "If you miss your bus, please contact our support team immediately. Rebooking may be possible depending on seat availability, though additional charges may apply.",
  delay: "In case of delays, you'll be notified via SMS and email. You can also check real-time bus status in the app under 'My Trips'.",

  // Seats
  seats: "You can select your preferred seat during the booking process. Window, aisle, and front seats are available based on availability.",
  "seat upgrade": "Seat upgrades to premium or executive class can be done during booking or through 'Modify Booking' if available on your route.",
  "seat map": "Our interactive seat map is available during booking so you can choose exactly where you'd like to sit.",

  // Discounts & Offers
  student: "Yes! We offer a 10% discount for students with valid ID. Contact support to apply.",
  discount: "We offer discounts for students, senior citizens, and group bookings. Check our 'Offers' page for current promotions.",
  promo: "Promo codes can be applied at checkout. Visit our 'Offers' page or subscribe to our newsletter to get the latest deals.",
  group: "Group bookings of 10 or more passengers receive a 15% discount. Contact our support team to arrange a group booking.",

  // Routes & Destinations
  routes: "We currently operate routes across Uganda and to neighbouring countries including Kenya, Rwanda, Tanzania, and South Sudan.",
  international: "Our international routes include Kampala–Nairobi, Kampala–Kigali, Kampala–Dar es Salaam, and Kampala–Juba. Check the booking page for schedules.",
  schedule: "Bus schedules vary by route. You can view all available departure times on the booking page by selecting your route and date.",
  stops: "Most of our buses make scheduled stops along the route. You can view all stops when selecting your bus during booking.",

  // Account & Support
  account: "You can manage your account details, bookings, and preferences under the 'Profile' section in the app.",
  password: "To reset your password, click 'Forgot Password' on the login page. A reset link will be sent to your registered email.",
  contact: "You can reach our support team via live chat, email at support@eacoach.com, or call us at +256 700 000 000. We're available 24/7.",
  support: "Our customer support team is available 24/7. You can chat with us here, email support@eacoach.com, or call +256 700 000 000.",
  complaint: "We're sorry to hear you had an issue. Please email your complaint to complaints@eacoach.com with your booking ID and we'll respond within 24 hours.",

  // Bus amenities
  wifi: "WiFi is available on select premium and executive buses. Look for the WiFi icon when choosing your bus during booking.",
  amenities: "Depending on the bus class, amenities include WiFi, air conditioning, USB charging ports, reclining seats, and onboard entertainment.",
  ac: "Air conditioning is available on all our executive and premium class buses.",

  // Farewell
  bye: "Goodbye! Have a safe and comfortable journey. Feel free to chat with us anytime!",
  thanks: "You're welcome! Is there anything else I can help you with?",
  "thank you": "Happy to help! Let me know if you need anything else.",
};

const getBotResponse = (message) => {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (msg.includes("good morning")) return botResponses["morning"];
  if (msg.includes("good afternoon")) return botResponses["afternoon"];
  if (msg.includes("good evening")) return botResponses["evening"];
  if (msg.includes("hello") || msg.includes("hi ") || msg === "hi") return botResponses["hello"];
  if (msg.includes("hey")) return botResponses["hey"];

  // Farewells & thanks
  if (msg.includes("bye") || msg.includes("goodbye")) return botResponses["bye"];
  if (msg.includes("thank you") || msg.includes("thanks")) return botResponses["thank you"];

  // Booking
  if (msg.includes("change") && msg.includes("booking")) return botResponses["change booking"];
  if (msg.includes("new booking") || msg.includes("make a booking") || msg.includes("book a bus")) return botResponses["new booking"];
  if (msg.includes("booking history") || msg.includes("past booking") || msg.includes("my booking")) return botResponses["booking history"];
  if (msg.includes("booking id") || msg.includes("booking number") || msg.includes("booking reference")) return botResponses["booking id"];
  if (msg.includes("confirmation")) return botResponses["booking confirmation"];
  if (msg.includes("booking")) return botResponses["booking"];

  // Payment
  if (msg.includes("payment failed") || msg.includes("payment not going through") || msg.includes("transaction failed")) return botResponses["payment failed"];
  if (msg.includes("payment pending") || msg.includes("payment processing")) return botResponses["payment pending"];
  if (msg.includes("refund")) return botResponses["refund"];
  if (msg.includes("receipt") || msg.includes("invoice")) return botResponses["receipt"];
  if (msg.includes("mobile money") || msg.includes("momo") || msg.includes("mtn") || msg.includes("airtel")) return botResponses["mobile money"];
  if (msg.includes("pay") || msg.includes("payment") || msg.includes("visa") || msg.includes("mastercard")) return botResponses["payment"];

  // Cancellation
  if (msg.includes("how to cancel") || msg.includes("how do i cancel")) return botResponses["how to cancel"];
  if (msg.includes("cancellation policy") || msg.includes("cancel policy")) return botResponses["cancellation policy"];
  if (msg.includes("cancel")) return botResponses["cancel"];

  // Baggage
  if (msg.includes("extra baggage") || msg.includes("additional baggage") || msg.includes("overweight")) return botResponses["extra baggage"];
  if (msg.includes("lost") && msg.includes("luggage")) return botResponses["lost luggage"];
  if (msg.includes("baggage") || msg.includes("luggage") || msg.includes("bag")) return botResponses["baggage"];

  // Timing
  if (msg.includes("miss") && msg.includes("bus")) return botResponses["late"];
  if (msg.includes("delay") || msg.includes("late")) return botResponses["delay"];
  if (msg.includes("arrive") || msg.includes("arrival") || msg.includes("when should i get")) return botResponses["arrival"];
  if (msg.includes("depart") || msg.includes("departure") || msg.includes("leave")) return botResponses["departure"];

  // Seats
  if (msg.includes("upgrade") && msg.includes("seat")) return botResponses["seat upgrade"];
  if (msg.includes("seat map") || msg.includes("choose seat") || msg.includes("select seat")) return botResponses["seat map"];
  if (msg.includes("seat") || msg.includes("window") || msg.includes("aisle")) return botResponses["seats"];

  // Discounts
  if (msg.includes("group") && (msg.includes("book") || msg.includes("discount"))) return botResponses["group"];
  if (msg.includes("promo") || msg.includes("coupon") || msg.includes("promo code")) return botResponses["promo"];
  if (msg.includes("student")) return botResponses["student"];
  if (msg.includes("discount") || msg.includes("offer") || msg.includes("deal")) return botResponses["discount"];

  // Routes
  if (msg.includes("international") || msg.includes("nairobi") || msg.includes("kigali") || msg.includes("dar") || msg.includes("juba")) return botResponses["international"];
  if (msg.includes("schedule") || msg.includes("timetable") || msg.includes("time table")) return botResponses["schedule"];
  if (msg.includes("stop") || msg.includes("stopover")) return botResponses["stops"];
  if (msg.includes("route") || msg.includes("destination") || msg.includes("where do you go")) return botResponses["routes"];

  // Amenities
  if (msg.includes("wifi") || msg.includes("internet")) return botResponses["wifi"];
  if (msg.includes("ac") || msg.includes("air condition") || msg.includes("air con")) return botResponses["ac"];
  if (msg.includes("amenit") || msg.includes("facilities") || msg.includes("usb") || msg.includes("charging")) return botResponses["amenities"];

  // Account & Support
  if (msg.includes("password") || msg.includes("forgot") || msg.includes("reset")) return botResponses["password"];
  if (msg.includes("account") || msg.includes("profile")) return botResponses["account"];
  if (msg.includes("complaint") || msg.includes("complain")) return botResponses["complaint"];
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("call")) return botResponses["contact"];
  if (msg.includes("support") || msg.includes("help") || msg.includes("assist")) return botResponses["support"];

  // Fallback
  return "I'm sorry, I didn't quite understand that. Could you rephrase your question? You can ask me about bookings, payments, cancellations, baggage, routes, seats, or discounts. I'm here to help! 😊";
};

     const response = getBotResponse(inputMessage);
      const lowerInput = inputMessage.toLowerCase();

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Chat Support</h1>
          <p className="text-gray-600">Get instant help from our AI assistant or contact our team</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Bot className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">EA Coach Assistant</h3>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Bot size={16} className="text-gray-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <HelpCircle size={18} className="text-primary" />
              <span>Quick Questions</span>
            </h3>
            <div className="space-y-2">
              {commonQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Contact Support Team</h3>
            <div className="space-y-3">
              <a href="tel:+256700123456" className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors">
                <Phone size={18} />
                <span>+256 700 123 456</span>
              </a>
              <a href="mailto:support@eacoach.com" className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors">
                <Mail size={18} />
                <span>support@eacoach.com</span>
              </a>
              <div className="pt-3">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle size={18} />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Operating Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;