import { apiLogin } from '../../api/auth/login.js';
/**
 * Handles the login form submission by preventing default form behavior,
 * retrieving email and password, and calling the API to log the user in.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Redirects the user to the homepage on success.
 */
export async function onLogin(event) {
  event.preventDefault(); 

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const result = await apiLogin({ email, password });

  if (result.error) {
    alert("Login failed: " + result.error);
  } else {
    localStorage.setItem("accessToken", result.data.accessToken); 
    localStorage.setItem("userID", result.data.name);
  
    window.location.href = "/";
  }
}
