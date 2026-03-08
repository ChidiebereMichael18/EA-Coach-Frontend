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

/**
 * Create a booking. Requires auth.
 * @param {{ busId: string, from: string, to: string, departureDate: string, departureTime: string, passengers: array, totalSeats: number, totalAmount: number, paymentMethod: string }} body
 * @returns {Promise<{ success: boolean, data?: object, errorMessage?: string }>}
 */
export async function createBooking(body) {
  let response = null;
  try {
    response = await fetch(`${getApiBase()}/api/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
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
 * Update booking payment status. Requires auth.
 * @param {string} bookingId - MongoDB _id of the booking
 * @param {string} paymentStatus - 'pending' | 'completed' | 'failed' | 'refunded'
 * @returns {Promise<{ success: boolean, data?: object, errorMessage?: string }>}
 */
export async function updatePaymentStatus(bookingId, paymentStatus) {
  let response = null;
  try {
    response = await fetch(`${getApiBase()}/api/bookings/${bookingId}/pay`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ paymentStatus }),
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
