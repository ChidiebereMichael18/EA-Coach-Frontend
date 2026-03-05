import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

const Header = ({ user, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="ml-2 bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-700">
                {user?.name || 'Guest User'}
              </p>
              <p className="text-xs text-gray-500">{user?.email || 'guest@example.com'}</p>
            </div>
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="ml-2 bg-transparent border-none focus:outline-none text-sm w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;