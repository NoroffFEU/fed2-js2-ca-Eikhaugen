/**
 * Retrieves the logged-in user's username from localStorage.
 *
 * @returns {string|null} The username if present, otherwise null.
 */
export function getLoggedInUserName() {
    return localStorage.getItem('userID');
}
