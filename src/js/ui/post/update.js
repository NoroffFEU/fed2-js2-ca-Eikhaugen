import { updatePost } from "../../api/post/update";
import { getPostIDFromURL } from "../../utilities/getPostIDFromURL";

/**
 * Handles the form submission for updating a post.
 *
 * @async
 * @function onUpdatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */
export async function onUpdatePost(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.title.value.trim();
  const body = form.post.value.trim();
  const imageUrl = form.image.value.trim();
  const altText = form.alt.value.trim(); 
  const tagsInput = form.tags.value.trim();

  const postID = getPostIDFromURL();

  if (!postID) {
    console.error("Post ID is missing from the URL.");
    alert("Error: Unable to update post. Post ID is missing.");
    return;
  }

  const data = {
    title,
    body,
  };

  if (tagsInput) {
    const tags = tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
    if (tags.length > 0) {
      data.tags = tags;
    }
  }

  if (imageUrl) {
    data.media = {
      url: imageUrl,
      alt: altText || "",
    };
  }

  try {
    await updatePost(postID, data);
    alert("Post successfully updated!");
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Error updating post. Please try again.");
  }
}
