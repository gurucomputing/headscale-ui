# script variables
OPENVSCODE_VERSION="1.103.1"
OPENVSCODE_URL="https://github.com/gitpod-io/openvscode-server/releases/download/openvscode-server-v$OPENVSCODE_VERSION/openvscode-server-v$OPENVSCODE_VERSION-linux-x64.tar.gz"
OPENVSCODE_RELEASE="openvscode-server-v$OPENVSCODE_VERSION-linux-x64"

# install openVSCode
cd /opt

### Download Open VSCode
curl -LJO "$OPENVSCODE_URL"

### Extract and move into directory
tar -xzf "$OPENVSCODE_RELEASE.tar.gz"
mv $OPENVSCODE_RELEASE openvscode-server
rm -f "$OPENVSCODE_RELEASE.tar.gz"