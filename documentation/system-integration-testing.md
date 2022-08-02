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
