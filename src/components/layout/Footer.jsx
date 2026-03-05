import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">EA Coach</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for bus travel across Uganda and East Africa. Book tickets easily, securely, and instantly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/routes" className="text-gray-400 hover:text-primary transition-colors">Popular Routes</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-primary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-primary transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-400">Kampala Road, Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span className="text-gray-400">+256 700 123 456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <span className="text-gray-400">support@eacoach.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EA Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;