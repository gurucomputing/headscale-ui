<script context="module" lang="ts">
	// function to get a list of users from the endpoint. Returns an array of users
	export async function getUsers(): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for getting users
		let endpointURL = '/api/v1/namespace';

		//returning variables
		let headscaleUsers = [{ name: '', id: '', createdAt: '' }];
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
					throw new Error(response.status + " when trying to generate user list. " + response.statusText);
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
					throw new Error(response.status + " when trying to edit user. " + response.statusText);
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
					throw new Error(response.status + " when trying to delete user. " + response.statusText);
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
		let headscaleDevices = [{ id: '', name: '', lastSeen: '', ipAddresses: [''] }];
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
					throw new Error(response.status + " when trying to generate user list. " + response.statusText);
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
</script>
