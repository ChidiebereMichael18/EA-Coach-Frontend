import { getApiBase, getAuthHeaders, getDefaultErrorMessage } from './client';

/**
 * @returns {Promise<{ success: boolean, data?: object, errorMessage?: string }>}
 */
export async function getProfile() {
  let response = null;
  try {
    response = await fetch(`${getApiBase()}/api/auth/profile`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        errorMessage: data?.message || getDefaultErrorMessage(response, null),
      };
    }
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      errorMessage: getDefaultErrorMessage(response, err),
    };
  }
}

/**
 * @returns {Promise<{ success: boolean, data?: { totalAmount: number, totalBookings: number, scope: string }, errorMessage?: string }>}
 */
export async function getTotalBookingAmount() {
  let response = null;
  try {
    response = await fetch(`${getApiBase()}/api/auth/bookings/total-amount`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        errorMessage: data?.message || getDefaultErrorMessage(response, null),
      };
    }
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      errorMessage: getDefaultErrorMessage(response, err),
    };
  }
}

/**
 * @returns {Promise<{ success: boolean, data?: array, errorMessage?: string }>}
 */
export async function getMyBookings() {
  let response = null;
  try {
    response = await fetch(`${getApiBase()}/api/bookings/mybookings`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        errorMessage: data?.message || getDefaultErrorMessage(response, null),
      };
    }
    return { success: true, data: Array.isArray(data) ? data : [] };
  } catch (err) {
    return {
      success: false,
      errorMessage: getDefaultErrorMessage(response, err),
    };
  }
}
