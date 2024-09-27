import { createPost } from "../../api/post/create";

/**
 * Event handler for creating a new post.
 * 
 * This function is triggered when the post creation form is submitted.
 * It prevents the default form submission behavior, extracts the form data,
 * and calls the `createPost` API function to send the data to the server.
 * 
 * @param {Event} event - The event object from the form submission.
 * 
 * @returns {Promise<void>} A promise that resolves when the post is created, or logs an error if the post creation fails.
 */
export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.title.value;
  const body = form.post.value; 
  const media = form.image.value;
  const tags = form.tags.value; 

  try {
    await createPost({ title, body, tags, media });
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
