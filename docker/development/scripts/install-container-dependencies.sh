# install dependencies
# tmux           used for monitoring secondary processes
# sudo           for running specific commands as root
# ncdu           file navigation
# caddy          web server
apt-get update
apt-get install -y --no-install-recommends tmux sudo git ncdu caddy
apt-get clean