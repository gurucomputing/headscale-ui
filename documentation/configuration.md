# Traefik Configuration

(Thanks [DennisGaida](https://github.com/DennisGaida) and [Niek](https://github.com/Niek))

Below is a complete docker-compose example for bringing up Traefik + headscale + headscale-ui. Run with: `docker-compose up -d` and headscale-ui will be accessible at <http://localhost/web>.

```yaml
version: '3.9'

services:
  headscale:
    image: headscale/headscale:latest
    pull_policy: always
    container_name: headscale
    restart: unless-stopped
    command: serve
    volumes:
      - ./headscale/config:/etc/headscale
      - ./headscale/data:/var/lib/headscale
    labels:
      - traefik.enable=true
      - traefik.http.routers.headscale-rtr.rule=PathPrefix(`/`) # you might want to add: && Host(`your.domain.name`)"
      - traefik.http.services.headscale-svc.loadbalancer.server.port=8080

  headscale-ui:
    image: ghcr.io/gurucomputing/headscale-ui:latest
    pull_policy: always
    container_name: headscale-ui
    restart: unless-stopped
    labels:
      - traefik.enable=true
      - traefik.http.routers.headscale-ui-rtr.rule=PathPrefix(`/web`) # you might want to add: && Host(`your.domain.name`)"
      - traefik.http.services.headscale-ui-svc.loadbalancer.server.port=8080

  traefik:
    image: traefik:latest
    pull_policy: always
    restart: unless-stopped
    container_name: traefik
    command:
      - --api.insecure=true # remove in production
      - --providers.docker
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --global.sendAnonymousUsage=false
    ports:
      - 80:80
      - 443:443
      - 8080:8080 # web UI (enabled with api.insecure)
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik/certificates:/certificates
```

# NGINX Proxy Manager Configuration

If running Headscale and Headscale UI outside of a consolidated docker-compose file (as above), NGINX Proxy Manager is another easy way to run all three. NGINX Proxy Manager is an easy way to run Headscale and Headscale UI behind a reverse proxy that can manager SSL certs automatically. This assumes the following:

1. Headscale is set up on your Docker host (or another location you can route to) per the instructions [here](https://github.com/juanfont/headscale). 
2. NGINX Proxy Manager is running and you can use it to generate SSL certificates. More information on NGINX Proxy Manager are [here](https://github.com/NginxProxyManager/nginx-proxy-manager).

Use this simplified docker-compose file to run headscale-ui:

```yaml
version: '3.5'
services:
  headscale-ui:
    image: ghcr.io/gurucomputing/headscale-ui:latest
    restart: unless-stopped
    container_name: headscale-ui
    ports:
      - 8443:443 # Use the port of your choice, but map it to 443 on the container
```

Once all three services are running, set up Headscale and Headscale UI _by creating a proxy host_:

1. Details: Enter the FQDN you will be using for Headscale and Headscale UI, and enable Websockets Support and Block Common Exploits. 
2. SSL: Select or create the SSL certificate you'll be using for the entire FQDN where both will run. Make sure to enable Force SSL, HTTP/2 Support, HSTS and HSTS Subdomains.
3. Advanced: In the text box, add the following to manage the Headscale UI path properly: 
  ```json
    location /web/ {
      proxy_pass https://XXX.XXX.XXX.XXXX:port/web/;
  }
  ```

# Nginx Example Configuration
From https://github.com/gurucomputing/headscale-ui/issues/71

```
map $http_upgrade $connection_upgrade {
    default      keep-alive;
    'websocket'  upgrade;
    ''           close;
}

server {
    server_name headscale-01.example.com;

    location /web {
        alias /usr/local/www/headscale-ui;
        index index.html;
    }

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $server_name;
        proxy_redirect http:// https://;
        proxy_buffering off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
    }

    listen 443 ssl;
    ssl_certificate fullchain.pem;
    ssl_certificate_key privkey.pem;
    [...]
}

server {
    if ($host = headscale-01.example.com) {
        return 301 https://$host$request_uri;
    }

    server_name headscale-01.example.com;
    listen 80;
    return 404;
}
```
