import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import Home from '../../components/dashboard/Home';
import BookingHistory from '../../components/dashboard/BookingHistory';
import ChatSupport from '../../components/dashboard/ChatSupport';
import Profile from '../../components/dashboard/Profile';
import { getProfile } from '../../api/dashboardApi';
import { ChevronLeft } from 'lucide-react';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const [currentView, setCurrentView] = useState(viewParam === 'bookings' ? 'bookings' : 'home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (viewParam === 'bookings') setCurrentView('bookings');
  }, [viewParam]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    getProfile()
      .then((res) => {
        if (res.success && res.data) {
          const { password, ...rest } = res.data;
          setUser(rest);
          localStorage.setItem('user', JSON.stringify(rest));
        }
      })
      .finally(() => setAuthChecked(true));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home user={user} />;
      case 'bookings':
        return <BookingHistory />;
      case 'chat':
        return <ChatSupport />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            user={user}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
            onLogout={handleLogout}
          />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            {currentView !== 'home' && (
              <button
                onClick={() => setCurrentView('home')}
                className="mb-6 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 text-gray-700 transition-all font-medium group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard Home</span>
              </button>
            )}
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;