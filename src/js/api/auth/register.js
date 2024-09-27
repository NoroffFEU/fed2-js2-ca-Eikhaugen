import { API_AUTH_REGISTER } from "../constants";


/**
 * Registers a new user by sending a POST request to the registration API.
 * 
 * This function constructs the necessary headers and request body based on the provided 
 * user data and sends it to the registration endpoint. Optionally, bio, avatar, and banner 
 * can be included if provided.
 * 
 * @async
 * @param {Object} userData - The user data object.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user's account.
 * @param {string} [userData.bio] - Optional bio for the user's profile.
 * @param {string} [userData.banner] - Optional URL for the user's profile banner image.
 * @param {string} [userData.avatar] - Optional URL for the user's profile avatar image.
 * 
 * @returns {Promise<Object>} A promise that resolves with the server's response in JSON format.
 * @throws Will throw an error if the fetch request fails.
 */
export async function register({ name, email, password, bio, banner, avatar }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const rawData = {
    name: name, 
    email: email, 
    password: password, 
  };

  if (bio) {
    rawData.bio = bio; 
  }

  if (avatar) {
    rawData.avatar = {
      url: avatar, 
      alt: "My avatar alt text",
    };
  }

  if (banner) {
    rawData.banner = {
      url: banner, 
      alt: "My banner alt text",
    };
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(rawData), 
    redirect: "follow"
  };

  return fetch(API_AUTH_REGISTER, requestOptions)
    .then((response) => response.json()) 
    .then((result) => {
      return result; 
    })
    .catch((error) => {
      console.error(error);
      throw error; 
    });
}

