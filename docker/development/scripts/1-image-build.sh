#!/bin/sh

# script environment
# turn on bash logging
set -x

# script variables
OPENVSCODE_URL="https://github.com/gitpod-io/openvscode-server/releases/download/openvscode-server-v$OPENVSCODE_VERSION/openvscode-server-v$OPENVSCODE_VERSION-linux-x64.tar.gz"
OPENVSCODE_RELEASE="openvscode-server-v$OPENVSCODE_VERSION-linux-x64"

# install dependencies
# ncurses         basic command line QOL improvements
# tmux            used for monitoring secondary processes
# git             It's git!
# fish            prettier shell
# caddy           file server for stage testing
dnf install -y ncurses tmux git fish caddy

# Add the ability to set file permissions on /data to the non-privileged user
echo "ALL ALL=NOPASSWD: /bin/chown -R 1000\:1000 /data" >> /etc/sudoers

# install nodejs
dnf module install -y nodejs:${NODEJS_VERSION}

# create the non-root user
groupadd -g 1000 nodejs
useradd -u 1000 -g 1000 nodejs

# set the default shell to the chosen shell
usermod --shell ${SHELL} nodejs

# Add the ability to set file permissions to the non-privileged user
echo "ALL ALL=NOPASSWD: /bin/chown -R 1000\:1000 /data" >> /etc/sudoers

# install openVSCode
cd /opt

### Download Open VSCode
curl -LJO "$OPENVSCODE_URL"

### Extract and move into directory
tar -xzf "$OPENVSCODE_RELEASE.tar.gz"
mv $OPENVSCODE_RELEASE openvscode-server
rm -f "$OPENVSCODE_RELEASE.tar.gz"

# create data and home directories
mkdir -p /data/home

# set tmux to use mouse scroll
echo "set -g mouse on" > /data/home/.tmux.conf

chown -R 1000:1000 /data