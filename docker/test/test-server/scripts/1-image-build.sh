#!/bin/sh
set -x

# temporarily set the caddy home to staging
export XDG_DATA_HOME=/staging

# create the group and user
addgroup -S appgroup && adduser -D appuser -G appgroup

# install caddy plus dependencies
apk add --no-cache caddy nss-tools

# install tailscale
echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
apk add -U --no-cache tailscale
rc-update add tailscale

# do a dry run of caddy to install the certificates
caddy start
caddy trust -adapter caddyfile -config /staging/Caddyfile
caddy stop

# set the caddy directory to the non-root user
# commented out for now as we need root anyway for tailscale
# chown -R 1000:1000 /staging/caddy