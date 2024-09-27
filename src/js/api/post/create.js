import { API_SOCIAL_POSTS } from "../constants";
import { headers as customHeaders } from "../headers"; 
import { getKey } from "../auth/key";

/**
 * Sends a request to create a new post on the API.
 * 
 * This function sends a POST request to the server with the post details 
 * (title, body, tags, and media). It adds necessary headers, including authorization and API key, 
 * and sends the data as a JSON payload.
 * 
 * @async
 * @param {Object} postData - The post data object.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body/content of the post.
 * @param {string[]} postData.tags - An array of tags associated with the post.
 * @param {string} postData.media - The URL of the media (image) associated with the post.
 * 
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
export async function createPost({ title, body, tags, media }) {
  const myHeaders = new Headers(); 
  myHeaders.append("Content-Type", "application/json");
  const token = await getKey(); 
  myHeaders.append("Authorization", `Bearer ${token}`); 

  const apiKeyHeader = customHeaders();
  const [key, value] = apiKeyHeader.entries().next().value;
  myHeaders.append(key, value); 

  const postData = {
    title: title,
    body: body,
  };

  if (tags) {
    postData.tags = [tags]; 
  }

  if (media) {
    postData.media = {
      url: media,
      alt: "Image alt text",
    };
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(postData),
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, requestOptions);
    const result = await response.json();
    
    if (response.ok) {
      alert("Post created successfully!");

      window.location.href = "/";
    } else {
      console.error(result);
      alert("Error creating post: " + result.message);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Failed to create post. Please try again later.");
  }
}
