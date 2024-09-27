/**
 * Adds a click event listener to all buttons with the class 'logout-btn'.
 * When clicked, the function removes the 'accessToken' from localStorage 
 * and redirects the user to the login page.
 * 
 * @returns {void}
 */
export function setLogoutListener() {
    const logoutButtons = document.querySelectorAll('.logout-btn'); 

    logoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userID');
            window.location.href = "/auth/login/";
        });
    });
}
