import { API_SOCIAL_PROFILES, API_KEY } from '../constants';
import { getKey } from '../auth/key';

/**
 * Fetches profile data for a given username.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} A promise that resolves to the profile data.
 * @throws Will throw an error if the network request fails.
 */
export async function readProfile(username) {

  const myHeaders = new Headers();
  myHeaders.append('X-Noroff-API-Key', API_KEY);

  const token = await getKey();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch profile data for ${username}: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}


export async function readProfiles(limit, page) {}
