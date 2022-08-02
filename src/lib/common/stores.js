import { writable } from 'svelte/store';
import { Device, User } from '$lib/common/classes';

// used to store the value of an alert across all components
export const alertStore = writable('');
// used to determine if the API is functioning
export const apiTestStore = writable('');
// stores the theme
export const themeStore = writable('');
// stores URL and API Key
export const URLStore = writable('');
export const APIKeyStore = writable('');
// stores preauth key preference
export const preAuthHideStore = writable(false);
// stores user and device data
export const userStore = writable([new User()]);
export const deviceStore = writable([new Device()]);
// stores search state
export const userSearchStore = writable('');
// stores sorting preferences
export const deviceSortStore = writable('id');
export const deviceSortDirectionStore = writable('ascending');
export const userSortStore = writable('id');
export const sortDirectionStore = writable('ascending');