import { getApiBase, getDefaultErrorMessage } from './client';

/**
 * Fetch buses by route (from / to). No auth required.
 * @param {{ from?: string, to?: string }} params
 * @returns {Promise<{ success: boolean, data?: array, errorMessage?: string }>}
 */
export async function getBuses(params = {}) {
  let response = null;
  try {
    const q = new URLSearchParams();
    if (params.from) q.set('from', params.from);
    if (params.to) q.set('to', params.to);
    const query = q.toString();
    const url = `${getApiBase()}/api/buses${query ? `?${query}` : ''}`;
    response = await fetch(url);
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
