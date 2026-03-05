import React from 'react';
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bus
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, isOpen, setIsOpen, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Booking History', icon: Calendar },
    { id: 'chat', label: 'Chat & Support', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 bg-white shadow-xl flex flex-col
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bus className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EA Coach
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut size={20} className="text-gray-400 group-hover:text-red-600" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Toggle Button (Desktop) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 hidden lg:block bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;