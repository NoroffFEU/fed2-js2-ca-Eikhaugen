import { onRegister } from "../../ui/auth/register";
import { setLogoutListener } from '../../ui/global/logout';
document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener(); 
});

const form = document.forms.register;

form.addEventListener("submit", onRegister);
