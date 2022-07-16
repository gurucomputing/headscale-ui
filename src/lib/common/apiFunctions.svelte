<script context="module" lang="ts">
import { Device, User } from "$lib/common/classes";

	export async function getUsers(): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for getting users
		let endpointURL = '/api/v1/namespace';

		//returning variables
		let headscaleUsers = new User;
		let headscaleUsersResponse: Response = new Response();

		await fetch(headscaleURL + endpointURL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${headscaleAPIKey}`
			}
		})
			.then((response) => {
				if (response.ok) {
					// return the api data
					headscaleUsersResponse = response;
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});

		await headscaleUsersResponse.json().then((data) => {
			headscaleUsers = data.namespaces;
		});
		return headscaleUsers;
	}

	export async function editUser(currentUsername: string, newUsername: string): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for editing users
		let endpointURL = '/api/v1/namespace/' + currentUsername + '/rename/' + newUsername;

		await fetch(headscaleURL + endpointURL, {
			method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${headscaleAPIKey}`
				}
			})
			.then((response) => {
				if (response.ok) {
					return response
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	export async function removeUser(currentUsername: string): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for editing users
		let endpointURL = '/api/v1/namespace/' + currentUsername;

		await fetch(headscaleURL + endpointURL, {
			method: 'DELETE',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${headscaleAPIKey}`
				}
			})
			.then((response) => {
				if (response.ok) {
					return response
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	export async function newUser(newUsername: string): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for editing users
		let endpointURL = '/api/v1/namespace';

		await fetch(headscaleURL + endpointURL, {
			method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${headscaleAPIKey}`
				},
				body: JSON.stringify({
					name: newUsername.toLowerCase()
				})
			})
			.then((response) => {
				if (response.ok) {
					return response
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	export async function getDevices(): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for getting users
		let endpointURL = '/api/v1/machine';

		//returning variables
		let headscaleDevices = new Device();
		let headscaleDeviceResponse: Response = new Response();

		await fetch(headscaleURL + endpointURL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${headscaleAPIKey}`
			}
		})
			.then((response) => {
				if (response.ok) {
					// return the api data
					headscaleDeviceResponse = response;
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});

		await headscaleDeviceResponse.json().then((data) => {
			headscaleDevices = data.machines;
		});
		return headscaleDevices;
	}

	export async function newDevice(key: string, userName: string): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for editing users
		let endpointURL = '/api/v1/machine/register';

		await fetch(headscaleURL + endpointURL + "?namespace=" + userName + "&key=" + key, {
			method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${headscaleAPIKey}`
				}
			})
			.then((response) => {
				if (response.ok) {
					return response
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	export async function removeDevice(deviceID: string): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for removing devices
		let endpointURL = '/api/v1/machine/' + deviceID;

		await fetch(headscaleURL + endpointURL, {
			method: 'DELETE',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${headscaleAPIKey}`
				}
			})
			.then((response) => {
				if (response.ok) {
					return response
				} else {
					return response.text().then(text => { throw JSON.parse(text).message });
				}
			})
			.catch((error) => {
				throw error;
			});
	}
</script>
