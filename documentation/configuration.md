## Traefik Configuration
(Thanks @DennisGaida)
```yaml
  headscale:
    image: headscale/headscale:latest
    container_name: headscale
    restart: unless-stopped
    networks:
      - traefik_proxy
    command: headscale serve
    volumes:
      - $DOCKERDIR/headscale/config:/etc/headscale
    labels:
      - "traefik.enable=true"
      ## HTTP Routers
      - "traefik.http.routers.headscale-rtr.entrypoints=https"
      - "traefik.http.routers.headscale-rtr.rule=Host(`hs.${DOMAIN_PUBLIC}`)"
      ## Middlewares
      - "traefik.http.routers.headscale-rtr.middlewares=chain-no-auth@file"
      ## HTTP Services
      - "traefik.http.routers.headscale-rtr.service=headscale-svc"
      - "traefik.http.services.headscale-svc.loadbalancer.server.port=8080"

  headscale-ui:
    image: ghcr.io/gurucomputing/headscale-ui:latest
    container_name: headscale-ui
    restart: unless-stopped
    networks:
      - traefik_proxy
    labels:
      - "traefik.enable=true"
      ## HTTP Routers
      - "traefik.http.routers.headscale_ui-rtr.entrypoints=https"
      - "traefik.http.routers.headscale_ui-rtr.rule=Host(`hs.${DOMAIN_PUBLIC}`) && PathPrefix(`/web`)"
      ## Middlewares
      - "traefik.http.routers.headscale_ui-rtr.middlewares=chain-no-auth@file"
      ## HTTP Services
      - "traefik.http.routers.headscale_ui-rtr.service=headscale_ui-svc"
      - "traefik.http.services.headscale_ui-svc.loadbalancer.server.port=443"
      - "traefik.http.services.headscale_ui-svc.loadbalancer.server.scheme=https"
      - "traefik.http.services.headscale_ui-svc.loadbalancer.serversTransport=disableSSLCheck@file"
```

and `traefik.yaml`
```yaml
http:
  serversTransports:
    disableSSLCheck:
      insecureSkipVerify: true
```