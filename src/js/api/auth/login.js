import { API_AUTH_LOGIN, API_KEY } from '../constants';
/**
 * Logs in a user by sending a POST request with the provided email and password to the API.
 * 
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the response data, including the access token on success.
 * @throws {Error} If the request fails or if the login credentials are incorrect.
 */
export async function apiLogin({ email, password }) {
    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during API login:", error);
      return { error: error.message };
    }
  }
  