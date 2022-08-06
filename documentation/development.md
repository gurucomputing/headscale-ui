## Development Documentation

Development can be done either by using the official development docker image, or via a normal nodejs installation.

## Testing

All branches should undergo manual testing as specified in the [Testing](./testing.md) document. If someone is well versed in unit automation tests for browser front ends, please educate me! For now do it manually before making a pull request.

### Quick Start (Docker)
* `docker run -p 443:443 -p 3000:3000 -v "$(pwd)"/data:/data ghcr.io/gurucomputing/headscale-ui-dev:latest`

A full browser based vscode development environment will be found at `http://<your-ip>:3000/?tkn=<your authentication token>`. The authentication token will be printed in your docker logs, and must be included in the URL.

> You can set a custom authentication token using the $CONNECTION_TOKEN environment variable

Once started, the development environment can be found at `/data/headscale-ui` inside vscode. The development server (including hot reloading) will be found at port 443. The running `npm run dev` process can be accessed within tmux, accessed with `tmux a` in the vscode terminal.

### Remapping port 443
You may wish to remap port 443 to something else (like 9443). You *cannot* remap via docker directly (IE: `docker run -p 9443:443`): doing so breaks the hot-reload mechanism. Instead, you must change the port the server runs on, and map it correctly (IE: `docker run -p 9443:9443`). You can change the server port under `package.json` once the container is loaded (see below gif for details):

![](/documentation/assets/README_ports.gif)

If you wish to do the same with the `npm run stage` mechanism, you can edit the included `Caddyfile` to run on the correct port, changing `:443` to the appropriate port.

### Additional Docker Commands

| Variable | Description | Example |
|----|----|----|
| AUTOINITIALZE | On first load, will automatically initialise and clone the repository | `true` |
| USE_CONNECTION_TOKEN | sets a connection token for VSCode Server. <https://github.com/gitpod-io/openvscode-server#securing-access-to-your-ide> | `true` |
| CONNECTION_TOKEN | Set to a secret to have some measure of protection for vscode. Randomized if left blank | `my_secret_token` |
| PROJECT_NAME | name of the project you are cloning in | `headscale-ui` |
| PROJECT_URL | url of the project you are cloning in | `https://github.com/gurucomputing/headscale-ui` |
| AUTOSTART | will automatically run the headscale server on container load within `tmux` | `true` |
| DEV_COMMAND | sets the autostart command | `npm run dev` |

### Quick Start (npm)
Clone the repository with `git clone https://github.com/gurucomputing/headscale-ui`, navigate to the project directory, and install with `npm install`.

Development environment can be ran with `npm run dev`. Static site can be generated with `npm run build`. Testing (and potentially even production) can be ran with `npm run stage` *if* caddy is installed in your distribution (red hat/fedora can install with `sudo dnf install caddy`).