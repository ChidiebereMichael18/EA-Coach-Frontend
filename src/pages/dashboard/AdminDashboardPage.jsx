import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DashboardOverview from '../../components/admin/DashboardOverview';
import UserManagement from '../../components/admin/UserManagement';
import BusManagement from '../../components/admin/BusManagement';
import BookingManagement from '../../components/admin/BookingManagement';
import RouteManagement from '../../components/admin/RouteManagement';
import PaymentManagement from '../../components/admin/PaymentManagement';
import DriverManagement from '../../components/admin/DriverManagement';

const AdminDashboardPage = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) {
      navigate('/admin/login', { replace: true });
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user?.role !== 'admin') {
        navigate('/admin/login', { replace: true });
        return;
      }
      setAdmin({
        ...user,
        permissions: ['manage_users', 'manage_buses', 'manage_bookings', 'view_reports'],
      });
    } catch {
      navigate('/admin/login', { replace: true });
    } finally {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/admin/login', { replace: true });
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'buses':
        return <BusManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'routes':
        return <RouteManagement />;
      case 'drivers':
        return <DriverManagement />;
      case 'payments':
        return <PaymentManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!authChecked || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onLogout={handleLogout}
          admin={admin}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader 
            admin={admin}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
          
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;