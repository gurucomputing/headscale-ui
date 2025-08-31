# script variables
PB_VERSION=0.29.3
PB_URL=https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip
PB_RELEASE="pocketbase_${PB_VERSION}_linux_amd64.zip"

cd /opt
### Download pocketbase
curl -LJO "$PB_URL"

### Extract and move into directory
unzip $PB_RELEASE -d /opt/pb
rm $PB_RELEASE