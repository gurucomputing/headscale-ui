import { writable } from 'svelte/store';

// used to store the value of an alert across all components
export const alert = writable('');
// stores the theme
export const headscaleThemeStore = writable('');