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
</script>
