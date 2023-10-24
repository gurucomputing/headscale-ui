<script context="module" lang="ts">
	import type { Route } from '$lib/common/classes';

	export async function getDeviceRoutes(deviceID: string): Promise<Route[]> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for getting users
		let endpointURL = '/api/v1/node/' + deviceID + '/routes';

		//returning variables
		let headscaleRouteList: Route[] = [];
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
					return response.text().then((text) => {
						throw JSON.parse(text).message;
					});
				}
			})
			.catch((error) => {
				throw error;
			});

		await headscaleDeviceResponse.json().then((data) => {
			headscaleRouteList = data.routes;
		});
		return headscaleRouteList;
	}

	export async function modifyDeviceRoutes(deviceID: string, routeList: Route[], routeID: number): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';
		let endpointURL = '';

		routeList.forEach((route) => {
			if (route.id == routeID) {
				endpointURL = `/api/v1/routes/${routeID}/`;
				if (route.enabled) {
					endpointURL += 'enable';
				} else {
					endpointURL += 'disable';
				}
			}
		});
		//returning variables
		let headscaleDeviceResponse: Response = new Response();

		await fetch(headscaleURL + endpointURL, {
			method: 'POST',
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
