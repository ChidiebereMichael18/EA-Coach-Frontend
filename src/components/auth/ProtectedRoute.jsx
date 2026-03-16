import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute — wraps any route that requires a logged-in user.
 * Props:
 *  - adminOnly: also require role === 'admin'
 *  - redirectTo: where to send unauthenticated users (default '/login')
 */
const ProtectedRoute = ({ children, adminOnly = false, redirectTo = '/login' }) => {
  const location = useLocation();

  const token = localStorage.getItem('token');
  let user = null;
  try {
    const raw = localStorage.getItem('user');
    if (raw) user = JSON.parse(raw);
  } catch {
    user = null;
  }

  // Not logged in at all
  if (!token || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Logged in but not admin, and this is an admin-only route
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
