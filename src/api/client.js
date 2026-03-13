const API_BASE = import.meta.env.VITE_API_URL || 'https://ea-coach-backend.onrender.com';

export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function getApiBase() {
  return API_BASE;
}

export function getDefaultErrorMessage(response, err) {
  if (err && !response) {
    return 'Unable to connect. Please check your connection and try again.';
  }
  if (!response) return 'Something went wrong. Please try again.';
  if (response.status === 401) return 'Please sign in again.';
  if (response.status >= 500) return 'Server error. Please try again later.';
  return response.statusText || 'Something went wrong.';
}
