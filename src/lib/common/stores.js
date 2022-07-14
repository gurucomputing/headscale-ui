import { writable } from 'svelte/store';

// used to store the value of an alert across all components
export const alertStore = writable('');
// stores the theme
export const headscaleThemeStore = writable('');
// stores URL and API Key
export const headscaleURLStore = writable('');
export const headscaleAPIKeyStore = writable('');
// stores user and device data
export const headscaleUserStore = writable([{ id: '', name: '', createdAt: '' }]);
export const headscaleDeviceStore = writable('');