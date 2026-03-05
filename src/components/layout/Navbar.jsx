import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Routes', href: '/routes' },
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group ">
            <Bus className="w-8 h-8 text-primary transition-transform group-hover:scale-110 " />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EA Coach
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-2 text-gray-600 hover:text-blue-500  transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 group-hover:left-0 transition-all duration-300"></span>
                <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 group-hover:right-0 transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              to="/booking"
              className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <div className="flex flex-col h-full p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center text-lg font-medium"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;