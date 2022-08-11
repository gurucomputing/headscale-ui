#!/bin/sh

#----#
# placeholder for testing
# while true; do sleep 1; done
#----#

# check if /data/Caddyfile exists, copy across if not
if [ ! -f /data/Caddyfile ];
then
  echo "no Caddyfile detected, copying across default config"
  cp /staging/Caddyfile /data/Caddyfile
fi

echo "Starting Caddy"
/usr/sbin/caddy run --adapter caddyfile --config /data/Caddyfile
