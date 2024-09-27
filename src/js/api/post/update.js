import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { getKey } from "../auth/key";

/**
 * Updates a post with the given ID.
 *
 * @param {string} id - The ID of the post to update.
 * @param {Object} data - The data to update the post with.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 */
export async function updatePost(id, data) {
  const myHeaders = new Headers();
  myHeaders.append("X-Noroff-API-Key", API_KEY);

  const token = await getKey();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, requestOptions);

    if (!response.ok) {
      // Capture and log detailed error information
      const errorData = await response.json();
      console.error("Server Error:", errorData);
      throw new Error(`Failed to update post: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}


