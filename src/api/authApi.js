const API_BASE = import.meta.env.VITE_API_URL || 'https://ea-coach-backend.onrender.com';

function getDefaultMessage(response, err) {
  if (err && !response) {
    return 'Unable to connect. Please check your connection and try again.';
  }
  if (!response) return 'Something went wrong. Please try again.';
  if (response.status === 401) return 'Invalid email or password.';
  if (response.status === 400) return 'Invalid request. Please check your details.';
  if (response.status >= 500) return 'Server error. Please try again later.';
  return response.statusText || 'Something went wrong. Please try again.';
}

/**
 * Login user
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, data?: object, errorMessage?: string }>}
 */
export async function login(credentials) {
  let response = null;
  try {
    response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        errorMessage: data?.message || getDefaultMessage(response, null),
      };
    }
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      errorMessage: getDefaultMessage(response, err),
    };
  }
}

/**
 * Register user
 * @param {{ name: string, email: string, phone: string, password: string }} userData
 * @returns {Promise<{ success: boolean, data?: object, errorMessage?: string }>}
 */
export async function register(userData) {
  let response = null;
  try {
    response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        errorMessage: data?.message || getDefaultMessage(response, null),
      };
    }
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      errorMessage: getDefaultMessage(response, err),
    };
  }
}
