#!/usr/bin/env bash
set -ex

USERNAME=anthonyrawlinsuom
IMAGE=lfmc-staging

# ensure we're up to date
git pull

npm version patch
PACKAGE_VERSION= node -pe "require('./package.json').version"

# run build
make build

# tag it
git add -A
git commit -m "version $PACKAGE_VERSION"
git tag -a "$PACKAGE_VERSION" -m "version $PACKAGE_VERSION"
git push
git push --tags
docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$PACKAGE_VERSION
# push it
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$PACKAGE_VERSION
