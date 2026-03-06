import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import BookingPage from './pages/dashboard/BookingPage';
import HomePage from './pages/Homepage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:view" element={<DashboardPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/routes" element={<div>Routes Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;