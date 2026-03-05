import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="mb-8">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop"
            alt="Customer support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-white mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Need Help With Your Booking?</h3>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Our support team is available 24/7 to assist you with routes, payments, and any questions you may have.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-sm opacity-90">+256 700 123 456</p>
                <p className="text-sm opacity-90">+256 700 789 012</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-sm opacity-90">support@eacoach.com</p>
                <p className="text-sm opacity-90">info@eacoach.com</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="text-sm opacity-90">Chat with our team</p>
                <p className="text-sm opacity-90">Available 24/7</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/booking"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 group"
              >
                <span>Start Booking</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;