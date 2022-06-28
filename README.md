# Headscale-UI
A web frontend for the [headscale](https://github.com/juanfont/headscale) Tailscale-compatible coordination server.

## Installation
Headscale-UI is designed to compile to a vanilla SPA that can be statically hosted on any site. Just take the latest build and host using a file server such as [caddy](https://caddyserver.com/), [apache httpd](https://httpd.apache.org/) or [nginx](https://www.nginx.com/). A sample Caddyfile is provided for self signed TLS certificates, and can be easily adjusted to proper HTTPS hosting.

> :warning: Headscale requires special configuration to provide CORS headers for headscale-ui to operate. See [This Github Issue](https://github.com/juanfont/headscale/issues/623) for details

## Development

### Style Guide
see [style](/documentation/Style.md) for details

## Architecture
See [architecture](/documentation/Architecture.md) for details