import { writable } from 'svelte/store';

// used to store the value of an alert across all components
export const alertStore = writable('');
// stores the theme
export const headscaleThemeStore = writable('');
// stores URL and API Key
export const headscaleURLStore = writable('');
export const headscaleAPIKeyStore = writable('');