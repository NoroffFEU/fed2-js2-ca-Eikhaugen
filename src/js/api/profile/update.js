import { API_SOCIAL_PROFILES } from "../constants";
import { API_KEY } from "../constants";
import { getKey } from "../auth/key";
import { getLoggedInUserName } from "../../utilities/getLoggedInUserName";

/**
 * Updates the profile of the logged-in user by sending a PUT request to the API.
 *
 * @async
 * @function updateProfile
 * @param {string} bio - The new bio text for the user's profile.
 * @param {string} avatar - The URL of the new avatar image.
 * @param {string} banner - The URL of the new banner image.
 * @returns {Promise<Object>} A promise that resolves to the updated profile data.
 * @throws Will throw an error if the fetch request fails.
 */
export async function updateProfile(bio, avatar, banner) {
  const myHeaders = new Headers();
  myHeaders.append("X-Noroff-API-Key", API_KEY);

  const token = await getKey();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const rawData = {
    bio: bio,
    banner: {
      url: banner,
      alt: "banner alt",
    },
    avatar: {
      url: avatar,
      alt: "avatar alt",
    },
  };

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(rawData),
    redirect: "follow",
  };

  const username = getLoggedInUserName();
  const url = `${API_SOCIAL_PROFILES}/${username}`;

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
