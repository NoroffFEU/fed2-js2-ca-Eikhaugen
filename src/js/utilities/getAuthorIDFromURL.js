/**
 * Retrieves the author ID from the URL query parameters.
 *
 * @returns {string|null} The author ID if present, otherwise null.
 */
export function getAuthorIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('authorID');
}
