<script context="module" lang="ts">
	export async function TestAPI(): Promise<boolean> {
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';
		let apiStatus = false;
		// using /api/v1/machine until headscale provides an endpoint to test a key against
		await fetch(headscaleURL + '/api/v1/machine', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${headscaleAPIKey}`
			}
		})
			.then((response) => {
				apiStatus = response.ok;
			})
			.catch((error) => {
				apiStatus = false;
			});
		return apiStatus;
	}
</script>
