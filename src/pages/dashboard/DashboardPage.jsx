import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import Home from '../../components/dashboard/Home';
import BookingHistory from '../../components/dashboard/BookingHistory';
import ChatSupport from '../../components/dashboard/ChatSupport';
import Profile from '../../components/dashboard/Profile';

const DashboardPage = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user data from localStorage or API
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       setUser(JSON.parse(userData));
//     } else {
//       // Redirect to login if not authenticated
//       navigate('/login');
//     }
//   }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

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
          />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;