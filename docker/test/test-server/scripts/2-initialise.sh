#!/bin/sh

#----#
# placeholder for testing
# while true; do sleep 1; done
#----#

# copy everything from staging
if [ ! -f /data/Caddyfile ];
then
  echo "no Caddyfile detected, copying across default config"
  cp /staging/Caddyfile /data/Caddyfile
fi

if [ ! -f /data/caddy ];
then
  echo "no caddy directory detected, copying across default config"
  cp -r /staging/caddy /data/caddy
fi

# start caddy
echo "Starting Caddy"
/usr/sbin/caddy run --adapter caddyfile --config /data/Caddyfile
