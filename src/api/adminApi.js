import { getApiBase, getAuthHeaders, getDefaultErrorMessage } from './client';

async function request(method, path, body = null) {
  let response = null;
  try {
    const options = { method, headers: getAuthHeaders() };
    if (body) options.body = JSON.stringify(body);
    response = await fetch(`${getApiBase()}/api/admin${path}`, options);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { success: false, errorMessage: data?.message || getDefaultErrorMessage(response, null) };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, errorMessage: getDefaultErrorMessage(response, err) };
  }
}

export async function getAdminUsers() {
  const res = await request('GET', '/users');
  if (res.success) return { success: true, data: Array.isArray(res.data) ? res.data : [] };
  return res;
}

export async function getAdminBuses() {
  const res = await request('GET', '/buses');
  if (res.success) return { success: true, data: Array.isArray(res.data) ? res.data : [] };
  return res;
}

export async function createAdminBus(body) {
  return request('POST', '/buses', body);
}

export async function updateAdminBus(id, body) {
  return request('PUT', `/buses/${id}`, body);
}

export async function deleteAdminBus(id) {
  return request('DELETE', `/buses/${id}`);
}

export async function getAdminBookings() {
  const res = await request('GET', '/bookings');
  if (res.success) return { success: true, data: Array.isArray(res.data) ? res.data : [] };
  return res;
}

export async function getAdminDrivers() {
  const res = await request('GET', '/drivers');
  if (res.success) return { success: true, data: Array.isArray(res.data) ? res.data : [] };
  return res;
}

export async function createAdminDriver(body) {
  return request('POST', '/drivers', body);
}

export async function deleteAdminDriver(id) {
  return request('DELETE', `/drivers/${id}`);
}
