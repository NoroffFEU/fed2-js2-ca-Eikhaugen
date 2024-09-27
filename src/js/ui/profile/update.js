import { updateProfile } from "../../api/profile/update";

/**
 * Handles the profile update form submission event.
 *
 * This function prevents the default form submission behavior,
 * extracts the form data (bio, avatar, banner), and sends the
 * data to the server to update the user's profile using the
 * `updateProfile` API function.
 *
 * On successful update, the page is reloaded to reflect the changes.
 *
 * @async
 * @function onUpdateProfile
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the profile is updated.
 * @throws Will throw an error if updating the profile fails.
 */
export async function onUpdateProfile(event) {
    event.preventDefault();

    const form = event.target;
    const bio = form.bio.value;
    const banner = form.banner.value; 
    const avatar = form.avatar.value;

    try {
        await updateProfile(bio, avatar, banner);
        location.reload();
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}
