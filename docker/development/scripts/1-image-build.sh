#!/bin/sh

# script environment
# turn on bash logging
set -x

# script variables
OPENVSCODE_URL="https://github.com/gitpod-io/openvscode-server/releases/download/openvscode-server-v$OPENVSCODE_VERSION/openvscode-server-v$OPENVSCODE_VERSION-linux-x64.tar.gz"
OPENVSCODE_RELEASE="openvscode-server-v$OPENVSCODE_VERSION-linux-x64"
CADDY_URL="https://caddyserver.com/api/download?os=linux&arch=amd64"

# install dependencies
# tmux     used for monitoring secondary processes
# sudo     for running specific commands as root
apt-get update
apt-get install -y tmux sudo

# set the default shell to the chosen shell
usermod --shell ${SHELL} node

# Add the ability to set file permissions on /data to the non-privileged user
echo "ALL ALL=NOPASSWD: /bin/chown -R 1000\:1000 /data" >> /etc/sudoers

# install openVSCode
cd /opt

### Download Open VSCode
curl -LJO "$OPENVSCODE_URL"

### Extract and move into directory
tar -xzf "$OPENVSCODE_RELEASE.tar.gz"
mv $OPENVSCODE_RELEASE openvscode-server
rm -f "$OPENVSCODE_RELEASE.tar.gz"

### download caddy
curl -LJO "$CADDY_URL"
chmod +x caddy_linux_amd64
mv caddy_linux_amd64 /usr/bin/caddy

# create data and home directories
mkdir -p /data/home

# set tmux to use mouse scroll
echo "set -g mouse on" > /data/home/.tmux.conf

chown -R 1000:1000 /data