import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bus, 
  Calendar, 
  Map, 
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

const AdminSidebar = ({ currentView, setCurrentView, isOpen, setIsOpen, onLogout, admin }) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
    { id: 'users', label: 'User Management', icon: Users, color: 'from-green-500 to-green-600' },
    { id: 'buses', label: 'Bus Management', icon: Bus, color: 'from-orange-500 to-orange-600' },
    { id: 'bookings', label: 'Booking Management', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    // { id: 'routes', label: 'Route Management', icon: Map, color: 'from-pink-500 to-pink-600' },
    { id: 'payments', label: 'Payments', icon: CreditCard, color: 'from-indigo-500 to-indigo-600' },
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
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl flex flex-col
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <span className="text-xl font-bold text-white">EA Coach</span>
              <span className="block text-xs text-gray-400">Admin Panel</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
              {admin?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{admin?.name}</p>
              <p className="text-xs text-gray-400 truncate">{admin?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
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
                      transition-all duration-200 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-700'
                      }
                    `}
                  >
                    {/* Background Pattern */}
                    {isActive && (
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-white rounded-full"></div>
                        <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white rounded-full"></div>
                      </div>
                    )}
                    
                    <Icon size={20} className="relative z-10" />
                    <span className="font-medium relative z-10">{item.label}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="ml-auto relative z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 group"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Toggle Button (Desktop) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 hidden lg:block bg-gray-800 border border-gray-700 rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow text-gray-400 hover:text-white"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;