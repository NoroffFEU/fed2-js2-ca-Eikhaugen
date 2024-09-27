import { register } from '../../api/auth/register.js';


/**
 * Handles the registration form submission event.
 * 
 * This function is triggered when the user submits the registration form. It prevents the default form
 * submission, gathers the input values (name, email, password, bio, avatar, banner) from the form fields, 
 * and calls the `register` API function. If the registration is successful, it redirects the user to 
 * the login page. In case of an error, it logs the error and shows an alert.
 * 
 * @async
 * @param {Event} event - The form submission event object.
 * 
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 */
export async function onRegister(event) {
    event.preventDefault(); 


    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        bio: document.getElementById('bio') ? document.getElementById('bio').value : null, 
        avatar: document.getElementById('avatar') ? document.getElementById('avatar').value : null, 
        banner: document.getElementById('banner') ? document.getElementById('banner').value : null,
    };

    try {
        const result = await register(formData);

        if (result) {
            alert('Registration successful! Redirecting to login...');
            window.location.href = '/auth/login/'; 
        }
    } catch (error) {
        console.error(error);
        alert(`Registration failed: ${error.message}`);
    }
}
