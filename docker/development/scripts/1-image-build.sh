#!/bin/sh

# script environment
# turn on bash logging, exit on error
set -ex

# # create a non-root user. Not needed for node image
# useradd -m -d /data/home dev-user

# set new home directory
mkdir -p /data/home
usermod -d /data/home node

# Add the ability to set file permissions on /data to the non-privileged user
echo "ALL ALL=NOPASSWD: /bin/chown -R 1000\:1000 /data" >> /etc/sudoers

# install dependencies
/staging/scripts/install-container-dependencies.sh
/staging/scripts/install-openvscode-server.sh

# set tmux to use mouse scroll
echo "set -g mouse on" > /data/home/.tmux.conf

chown -R 1000:1000 /data