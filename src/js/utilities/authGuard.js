/**
 * Checks if the user is authenticated by verifying if the access token exists in localStorage.
 * If the user is not logged in, it displays an alert and redirects them to the login page.
 *
 * @returns {void} Redirects unauthenticated users to the login page.
 */
export function authGuard() {
  if (!localStorage.accessToken) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
