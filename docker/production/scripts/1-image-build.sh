#!/bin/sh
set -x

#clone the project
git clone ${PROJECT_URL} ${PROJECT_NAME}

# install the project
cd ${PROJECT_NAME}
npm install

# build the project
npm run build