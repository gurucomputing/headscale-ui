<script context="module" lang="ts">
	import { Route } from '$lib/common/classes';

	export async function getDeviceRoutes(deviceID: string): Promise<Route[]> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for getting users
		let endpointURL = '/api/v1/machine/' + deviceID + '/routes';

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
      // check if the returned object is the legacy or current API object for routes
      // convert to a route object if it is legacy
      if(data.routes.advertisedRoutes) {
        let advertisedRoutesList: string[] = data.routes.advertisedRoutes
        advertisedRoutesList.forEach(legacyRoute => {
          let route = new Route();
          route.prefix = legacyRoute;
          route.enabled = data.routes.enabledRoutes.contains(legacyRoute)
          headscaleRouteList.push( route );
        });

      } else {
        headscaleRouteList = data.routes;
      }
		});
		return headscaleRouteList;
	}

	export async function enableDeviceRoute(deviceID: string, routes: string[]): Promise<any> {
		// variables in local storage
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// endpoint url for getting users
		let endpointURL =
			'/api/v1/machine/' +
			deviceID +
			'/routes?' +
			routes
				.map(encodeURIComponent)
				.map((route) => `routes=${route}`)
				.join('&');

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
