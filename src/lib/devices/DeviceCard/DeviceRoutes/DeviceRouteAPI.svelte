<script context="module" lang="ts">
	import type { Route } from '$lib/common/classes';

	export async function approveDeviceRoute(deviceID: string, routes: [string]): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		let endpointURL = `/api/v1/node/${deviceID}/approve_routes`;

		await fetch(headscaleURL + endpointURL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${headscaleAPIKey}`
			},
			body: JSON.stringify({
				routes: routes
			})
		})
			.then((response) => {
				if (response.ok) {
					// return the api data
					return response;
				} else {
					return response.text().then((text) => {
						throw JSON.parse(text).message;
					});
				}
			})
			.catch((error) => {
				throw error;
			});
	}
</script>
