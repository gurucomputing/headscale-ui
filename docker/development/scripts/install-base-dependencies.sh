# install dependencies
# tmux           used for monitoring secondary processes
# sudo           for running specific commands as root
# git            for source countrol
# pwgen          for creating randomized passwords/secrets on the fly
# ncdu           file navigation
# unzip          file extraction and compression
# rsync          folder structure copying
dnf install -y --setopt=install_weak_deps=False tmux sudo git pwgen ncdu unzip rsync
dnf clean all
