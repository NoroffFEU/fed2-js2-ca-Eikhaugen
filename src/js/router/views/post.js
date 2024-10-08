import { readPost } from '../../api/post/read';
import { setLogoutListener } from '../../ui/global/logout';
import { getPostIDFromURL } from '../../utilities/getPostIDFromURL';
import { getLoggedInUserName } from '../../utilities/getLoggedInUserName';
import { onDeletePost } from '../../ui/post/delete';

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
    renderPost();
});

async function renderPost() {
    const postID = getPostIDFromURL();

    try {
        const post = await readPost(postID);

        const loggedInUserName = getLoggedInUserName();
        const isOwnProfile = post.author.name === loggedInUserName;

        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = '';

        const postMedia = post.media && post.media.url
            ? `<img class="post-media" src="${post.media.url}" alt="${post.media.alt || 'Post media'}">`
            : '';

        const authorAvatar = post.author && post.author.avatar && post.author.avatar.url
            ? `<img class="author-img" src="${post.author.avatar.url}" alt="${post.author.name}'s avatar">`
            : '<img class="author-img" src="/images/default-avatar.png" alt="Default avatar">';

        const postHTML = `
        <div class="post">
            <div class="author" data-authorID="${post.author.name}">
                ${authorAvatar}
                <span class="author-name">${post.author.name}</span>
            </div>
            <div class="post-content">
                ${postMedia}
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
            ${isOwnProfile ? `
                <div class="post-actions">
                    <button class="delete-btn" data-post-id="${post.id}">Delete</button>
                    <a href="./edit/?postID=${post.id}" class="edit-btn">Edit</a>
                </div>
            ` : ''}
        </div>
        `;

        postContainer.innerHTML += postHTML;

        if (isOwnProfile) {
            const deleteButton = postContainer.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                onDeletePost(post.id);
            });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        displayError('Failed to load post. Please try again later.');
    }
}

function displayError(message) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

renderPost()
