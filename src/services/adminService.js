import axios from 'axios';

// The backend proxy handles matching /api automatically
const API_URL = 'https://ea-coach-backend.onrender.com/api/admin';

// Bus Management
export const getBuses = async () => {
  const response = await axios.get(`${API_URL}/buses`);
  return response.data;
};

export const createBus = async (busData) => {
  const response = await axios.post(`${API_URL}/buses`, busData);
  return response.data;
};

export const updateBus = async (id, busData) => {
  const response = await axios.put(`${API_URL}/buses/${id}`, busData);
  return response.data;
};

export const deleteBus = async (id) => {
  const response = await axios.delete(`${API_URL}/buses/${id}`);
  return response.data;
};

// Driver Management
export const getDrivers = async () => {
  const response = await axios.get(`${API_URL}/drivers`);
  return response.data;
};

export const createDriver = async (driverData) => {
  const response = await axios.post(`${API_URL}/drivers`, driverData);
  return response.data;
};

export const updateDriver = async (id, driverData) => {
  const response = await axios.put(`${API_URL}/drivers/${id}`, driverData);
  return response.data;
};

export const deleteDriver = async (id) => {
  const response = await axios.delete(`${API_URL}/drivers/${id}`);
  return response.data;
};

// Booking / Payment Management
export const getBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};
