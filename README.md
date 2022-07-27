# Headscale-UI
A web frontend for the [headscale](https://github.com/juanfont/headscale) Tailscale-compatible coordination server.

## Installation
Headscale-UI is currently released as a static site: just take the release and host with your favorite web server. Headscale-UI expects to be served from the `/web` path to avoid overlap with headscale on the same domain.

### Docker Installation
If you are using docker, you can install `headscale` alongside `headscale-ui`, like so:

```yaml
version: '3.5'
services:
  headscale:
    image: headscale/headscale:latest-alpine
    container_name: headscale
    volumes:
      - ./container-config:/etc/headscale
      - ./container-data/data:/var/lib/headscale
    # ports:
      # - 27896:8080
    command: headscale serve
    restart: unless-stopped
  headscale-ui:
    image: ghcr.io/gurucomputing/headscale-ui:latest
    container_name: headscale-ui
    security_opt:
      - label:disable
    networks:
      - reverseproxy-nw
    # ports:
      # - 9443:443
```

Headscale UI serves on port 443 and uses a self signed cert by default.

### Proxy Settings
You will need a reverse proxy to install `headscale-ui` on the your domain. Here is an example [Caddy Config](https://caddyserver.com/) to achieve this:
```
https://hs.yourdomain.com.au {
	reverse_proxy /web* https://headscale-ui {
		transport http {
			tls_insecure_skip_verify
		}
	}

	reverse_proxy * http://headscale:8080
}

```

### Cross Domain Installation
If you do not want to configure headscale-ui on the same subdomain as headscale, you must intercept headscale traffic via your reverse proxy to fix CORS (see https://github.com/juanfont/headscale/issues/623). Here is an example fix with Caddy:
```
hs.yourdomain.com.au {
  @hs-options {
    host hs.yourdomain.com.au
    method OPTIONS
  }
  @hs-other {
    host hs.yourdomain.com.au
  }
  handle @hs-options {
    header {
      Access-Control-Allow-Origin https://hs-ui.yourdomain.au
      Access-Control-Allow-Headers *
      Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE"
    }
    respond 204
  }
  handle @hs-other {
    reverse_proxy http://headscale:8080 {
      header_down Access-Control-Allow-Origin https://hs-ui.yourdomain.com.au
      header_down Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE"
      header_down Access-Control-Allow-Headers *
    }
  }
}
```

## Development
Development can be done either by using the official development docker image, or via a normal nodejs installation.
### Quick Start (Docker)
* `docker run -p 443:443 -p 3000:3000 -v "$(pwd)"/data:/data ghcr.io/gurucomputing/headscale-ui:latest`

A full browser based vscode development environment will be found at `http://<your-ip>:3000/?tkn=<your authentication token>`. The authentication token will be printed in your docker logs, and must be included in the URL.

> You can set a custom authentication token using the $CONNECTION_TOKEN environment variable

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