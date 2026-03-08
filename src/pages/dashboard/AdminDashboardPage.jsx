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
  const [admin, setAdmin] = useState({
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  permissions: ['manage_users', 'manage_buses', 'manage_bookings', 'view_reports']
});
  const navigate = useNavigate();


  // useEffect(() => {
  //   // Check if admin is logged in
  //   const adminData = localStorage.getItem('admin');
  //   const userData = JSON.parse(localStorage.getItem('user'));
    
  //   if (adminData) {
  //     setAdmin(JSON.parse(adminData));
  //   } else if (userData?.role === 'admin') {
  //     // If user is admin but no admin data, create it
  //     const newAdminData = {
  //       ...userData,
  //       permissions: ['manage_users', 'manage_buses', 'manage_bookings', 'view_reports']
  //     };
  //     localStorage.setItem('admin', JSON.stringify(newAdminData));
  //     setAdmin(newAdminData);
  //   } else {
  //     // Redirect to login if not admin
  //     navigate('/admin');
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/admin/login');
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

  // if (!admin) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

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