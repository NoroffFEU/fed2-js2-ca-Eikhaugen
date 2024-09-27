import { deletePost  } from '../../api/post/delete';  // Import API to delete post

/**
 * Handles the post deletion logic.
 * @param {Event} event - The click event from the delete button.
 */
export async function onDeletePost(postID) {

    if (confirm('Are you sure you want to delete this post?')) {
        try {
            const success = await deletePost(postID);
            if (success) {
               window.location.reload()

                alert('Post deleted successfully');
            } else {
                alert('Failed to delete post.');
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Failed to delete post.');
        }
    }
}


