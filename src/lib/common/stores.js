import { writable } from 'svelte/store';
import { Device, User, ACL } from '$lib/common/classes';

// 
// localStorage Stores (global scope, saves to the browser)
// 

// stores the theme
export const themeStore = writable('');
// stores URL and API Key
export const URLStore = writable('');
export const APIKeyStore = writable('');
// stores sorting preferences
export const deviceSortStore = writable('id');
export const deviceSortDirectionStore = writable('ascending');
export const userSortStore = writable('id');
export const sortDirectionStore = writable('ascending');
// stores preauth key preference
export const preAuthHideStore = writable(false);

// Dev Setting Stores
// Shows or Hides ACL Settings
export const showACLPagesStore = writable(false);

// 
// Normal Stores (global scope, saves until refresh)
// 
// stores user and device data
export const userStore = writable([new User()]);
export const userFilterStore = writable([new User()]);
export const deviceStore = writable([new Device()]);
export const deviceFilterStore = writable([new Device()]);
// stores ACL object
export const aclStore = writable(new ACL());
// used to store the value of an alert across all components
export const alertStore = writable('');
// used to determine if the API is functioning
export const apiTestStore = writable('');
// stores search state
export const userSearchStore = writable('');
export const deviceSearchStore = writable('');