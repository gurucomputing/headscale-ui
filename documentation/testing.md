## Using the Test Dockerfiles
The `/docker/test` folder contains a number of local test containers for testing before release. Specifically, the `docker-compose` creates a local environment with self signed keys, and the `docker-compose-workers` set up a bunch of clients that trust those keys.

To use this environment, do the following:
* Navigate to the `/docker/test/test-server` directory
* Create a test network: `docker network create headscale-ui-test-network`
* Stand up the `docker-compose` with `docker-compose up -d`. This will expose an HTTP (not https) portal on `8080`
* Generate an API key with `docker exec headscale-test-backend headscale apikeys create`
* Paste the api key into the UI at `http://<your-ip>:8080/web`
* Generate a pre-auth key that's reusable and ephemeral. save it into `.env` in the `test-workers` folder as the following:
  * `PREAUTH_KEY=<Your Preauth Key>`
* move to the `test-workers` directory, and stand up the works with `docker-compose up -d`
* Run your tests in the UI
* Bring down the environment(s) with `docker-compose down`. By default nothing is persisted.

## Tests Before Release
Eventually it would be nice to automate this, but I've found a front end is difficult to fully automate testing. Prove me wrong other users!

## User Testing
* Create a User
* Delete a User
* Rename a User
* Create a PreAuth Key
* Try all Sort Categories

## Device Testing
* Add a Device with a Preauth Key
* Add a Device with a machine key
* Add a Device with OIDC (if set up to do so)
* Rename a Device
* Try all sort categories
* Create a Tag
* Delete a Tag
* Delete a Device
* Add and approve a route (if set up to do so)
* Change the assigned user for a device

## Failure Test
* Test messages (both console and alerts) with failed apikey
* Test recovery once apikey is back
* Test messages (both console and alerts) with failed URL
* Test recovery once URL is back

## Settings Test
* Verify version comes across once released

## Docker Test
* Verify setting a custom PORT environment variable does not break the image
