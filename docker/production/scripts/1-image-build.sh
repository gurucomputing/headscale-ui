#!/bin/sh
set -x

#clone the project
git clone ${PROJECT_URL} ${PROJECT_NAME}

# add dependencies
# jq for parsing version information
apk add --no-cache jq

# install the project
cd ${PROJECT_NAME}
npm install

# inject the version number
VERSION=$(jq -r '.version' package.json)
sed -i "s/insert-version/${VERSION}/g" ./src/routes/settings.html.svelte

# build the project
npm run build