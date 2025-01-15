<script context="module" lang="ts">
	import type { Device, User } from './classes';

	export function sortUsers(users: User[]): User[] {
		let sortKey = localStorage.getItem('headscaleUserSort') || '';
		let sortDirection = localStorage.getItem('headscaleUserSortDirection') || '';
		let sortedUsers = users;

		let collator = new Intl.Collator([], { numeric: true });
		if (sortDirection == 'ascending') {
			switch (sortKey) {
				case 'id':
					sortedUsers = users.sort((a: User, b: User) => collator.compare(a.id, b.id));
					break;
				case 'createdAt':
					sortedUsers = users.sort((a: User, b: User) => -collator.compare(a.createdAt, b.createdAt));
					break;
				case 'name':
					sortedUsers = users.sort((a: User, b: User) => collator.compare(a.name, b.name));
					break;
			}
		}
		if (sortDirection == 'descending') {
			switch (sortKey) {
				case 'id':
					sortedUsers = users.sort((a: User, b: User) => -collator.compare(a.id, b.id));
					break;
				case 'createdAt':
					sortedUsers = users.sort((a: User, b: User) => collator.compare(a.createdAt, b.createdAt));
					break;
				case 'name':
					sortedUsers = users.sort((a: User, b: User) => -collator.compare(a.name, b.name));
					break;
			}
		}

		return sortedUsers;
	}

	export function sortDevices(devices: Device[]): Device[] {
		let sortKey = localStorage.getItem('headscaleDeviceSort') || '';
		let sortDirection = localStorage.getItem('headscaleDeviceSortDirection') || '';
		let sortedDevices = devices;

		let collator = new Intl.Collator([], { numeric: true });
		if (sortDirection == 'ascending') {
			switch (sortKey) {
				case 'id':
					sortedDevices = devices.sort((a: Device, b: Device) => collator.compare(a.id, b.id));
					break;
				case 'lastSeen':
					sortedDevices = devices.sort((a: Device, b: Device) => -collator.compare(a.lastSeen, b.lastSeen));
					break;
				case 'givenName':
					sortedDevices = devices.sort((a: Device, b: Device) => collator.compare(a.givenName, b.givenName));
					break;
			}
		}
		if (sortDirection == 'descending') {
			switch (sortKey) {
				case 'id':
					sortedDevices = devices.sort((a: Device, b: Device) => -collator.compare(a.id, b.id));
					break;
				case 'lastSeen':
					sortedDevices = devices.sort((a: Device, b: Device) => collator.compare(a.lastSeen, b.lastSeen));
					break;
				case 'givenName':
					sortedDevices = devices.sort((a: Device, b: Device) => -collator.compare(a.givenName, b.givenName));
					break;
			}
		}

		return sortedDevices;
	}
</script>
