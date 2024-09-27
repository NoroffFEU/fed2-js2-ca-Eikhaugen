export function getPostIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postID');
}
