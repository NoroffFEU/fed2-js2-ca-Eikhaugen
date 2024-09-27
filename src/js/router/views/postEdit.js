import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from '../../ui/global/logout';
import { onUpdatePost } from "../../ui/post/update";
import { readPost } from "../../api/post/read.js";
import { getPostIDFromURL } from "../../utilities/getPostIDFromURL.js";

async function init() {

  setLogoutListener();
  authGuard();
  const postID = getPostIDFromURL();

  if (!postID) {
    console.error("Post ID is missing from the URL.");
    alert("Error: Unable to load post data.");
    return;
  }

  const form = document.forms.editPost;

  if (!form) {
    console.error("Form 'editPost' not found in the document.");
    return;
  }

  try {
    const postData = await readPost(postID);

    form.title.value = postData.title;
    form.post.value = postData.body;
    form.image.value = postData.media || "";
    form.tags.value = postData.tags ? postData.tags.join(", ") : "";
  } catch (error) {
    console.error("Error fetching post data:", error);
    alert("Error: Unable to load post data.");
  }

  form.addEventListener("submit", onUpdatePost);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
