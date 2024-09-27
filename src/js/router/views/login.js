import { onLogin } from "../../ui/auth/login";
import { setLogoutListener } from '../../ui/global/logout';
document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener(); 
});
/**
 * Sets up an event listener for the login form submission. If the form is found, 
 * it adds a submit event listener to trigger the login functionality.
 * 
 * @returns {void} Logs an error message if the form is not found.
 */
const form = document.forms.login;

if (form) {
  form.addEventListener("submit", onLogin);
} else {
  console.error("Login form not found");
}
