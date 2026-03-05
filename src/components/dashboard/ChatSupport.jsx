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
        booking: "You can change your booking through the 'Booking History' section. Select the trip and click 'Modify Booking'.",
        payment: "We accept MTN MoMo, Airtel Money, Visa, Mastercard, and bank transfers.",
        cancel: "Yes, you can cancel your ticket up to 2 hours before departure. Refund policies apply.",
        baggage: "You're allowed one carry-on bag (7kg) and one checked bag (20kg). Additional baggage fees may apply.",
        arrival: "We recommend arriving at least 1 hour before departure for domestic trips and 2 hours for international trips.",
        student: "Yes! We offer a 10% discount for students with valid ID. Contact support to apply."
      };

      let response = botResponses.default;
      const lowerInput = inputMessage.toLowerCase();
      
      if (lowerInput.includes('change') || lowerInput.includes('modify')) {
        response = botResponses.booking;
      } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
        response = botResponses.payment;
      } else if (lowerInput.includes('cancel')) {
        response = botResponses.cancel;
      } else if (lowerInput.includes('baggage') || lowerInput.includes('luggage')) {
        response = botResponses.baggage;
      } else if (lowerInput.includes('arrive') || lowerInput.includes('early')) {
        response = botResponses.arrival;
      } else if (lowerInput.includes('student') || lowerInput.includes('discount')) {
        response = botResponses.student;
      }

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