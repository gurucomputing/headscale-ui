# Headscale-UI
A web frontend for the [headscale](https://github.com/juanfont/headscale) Tailscale-compatible coordination server.

## Installation
Headscale-UI is designed to compile to a vanilla SPA that can be statically hosted on any site. Just take the latest build and host using a file server such as [caddy](https://caddyserver.com/), [apache httpd](https://httpd.apache.org/) or [nginx](https://www.nginx.com/). A sample Caddyfile is provided for self signed TLS certificates, and can be easily adjusted to proper HTTPS hosting.

While not currently embedded into the headscale binary, there is no reason why the compiled files couldn't be embedded in the future.

> :warning: Headscale (not headscale-ui) requires special configuration to provide CORS headers for headscale-ui to operate. See [This Github Issue](https://github.com/juanfont/headscale/issues/623) for details

## Development
Development can be done either by using the official development docker image, or via a normal nodejs installation.
### Quick Start (Docker)
Run the following `docker` command:
`docker run -p 443:443 -p 3000:3000 -v "$(pwd)"/data:/data ghcr.io/gurucomputing/headscale-ui:latest`

or on a selinux enabled distro (like fedora):
`docker run -p 443:443 -p 3000:3000 -v "$(pwd)"/data:/data:Z ghcr.io/gurucomputing/headscale-ui:latest`
A full browser based vscode development environment will be found at `http://<your-ip>:3000/?tkn=<your authentication token>`. The authentication token will be printed in your docker logs, and must be included in the URL.

> You can set a custom connection token using the $CONNECTION_TOKEN environment variable

Once started, the development environment can be found at `/data/headscale-ui` inside vscode. The development server (including hot reloading) will be found at port 443. The `npm run dev` process can be accessed within tmux, accessed with `tmux a` in the vscode terminal.

### Remapping port 443
You may wish to remap port 443 to something else (like 9443). You *cannot* remap via docker directly (IE: `docker run -p 9443:443`): doing so breaks the hot-reload mechanism. Instead, you must change the port the server runs on, and map it correctly (IE: `docker run -p 9443:9443`). You can change the server port under `package.json` once the container is loaded (see below gif for details):

![](/documentation/assets/README_ports.gif)

If you wish to do the same with the `npm run stage` mechanism, you can edit the included `Caddyfile` to run on the correct port, changing `:443` to the appropriate port.

### Docker Guide
see [docker environment](/documentation/Docker) for additional variables and options

### Quick Start (npm)
Clone the repository with `git clone https://github.com/gurucomputing/headscale-ui`, navigate to the project directory, and install with `npm install`.

Development environment can be ran with `npm run dev`. Static site can be generated with `npm run build`. Testing (and potentially even production) can be ran with `npm run stage` *if* caddy is installed in your distribution (red hat/fedora can install with `sudo dnf install caddy`).

### Style Guide
see [style](/documentation/Style.md) for details

## Architecture
See [architecture](/documentation/Architecture.md) for details