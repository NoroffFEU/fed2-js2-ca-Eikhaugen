import "./css/style.css";
import router from "./js/router";
import { setLogoutListener } from './js/ui/global/logout';
document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener(); 
});

await router(window.location.pathname);

