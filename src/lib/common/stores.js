import { writable } from 'svelte/store';
import { Device } from '$lib/common/classes';

// used to store the value of an alert across all components
export const alertStore = writable('');
// used to determine if the API is functioning
export const apiTestStore = writable('');
// stores the theme
export const headscaleThemeStore = writable('');
// stores URL and API Key
export const headscaleURLStore = writable('');
export const headscaleAPIKeyStore = writable('');
// stores user and device data
export const headscaleUserStore = writable([{ id: '', name: '', createdAt: '' }]);
export const headscaleDeviceStore = writable([new Device()]);