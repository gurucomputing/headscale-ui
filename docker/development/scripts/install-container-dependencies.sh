# install dependencies
# tmux           used for monitoring secondary processes
# sudo           for running specific commands as root
# ncdu           file navigation
# caddy          web server
# unzip          unzipping
# curl           curl
# bash           bash shell
apt-get update
apt-get install -y --no-install-recommends tmux sudo git ncdu caddy unzip curl bash
apt-get clean