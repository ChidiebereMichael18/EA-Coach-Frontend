import React from 'react';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';

const AdminHeader = ({ admin, toggleSidebar, isSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  const notifications = [
    { id: 1, message: 'New booking received', time: '2 min ago', type: 'booking' },
    { id: 2, message: 'Payment of UGX 150,000 completed', time: '10 min ago', type: 'payment' },
    { id: 3, message: 'New user registered', time: '25 min ago', type: 'user' },
    { id: 4, message: 'Bus maintenance alert', time: '1 hour ago', type: 'alert' },
  ];

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
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search users, bookings, buses..."
              className="ml-2 bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-500">Last login: {new Date().toLocaleDateString()}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="text-sm text-primary hover:text-blue-600 w-full text-center">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                {admin?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700">{admin?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-2">
                  {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Account Settings
                  </button> */}
                  {/* <div className="border-t my-2"></div> */}
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent border-none focus:outline-none text-sm w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;