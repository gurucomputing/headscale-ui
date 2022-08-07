#!/bin/sh
set -x

#clone the project
git clone ${PROJECT_URL} ${PROJECT_NAME}

# install the project
cd ${PROJECT_NAME}
npm install

# inject the version number
sed -i 's/insert-version/${{ steps.gathervars.outputs.VERSION }}/g' ./src/routes/settings.html.svelte

# build the project
npm run build