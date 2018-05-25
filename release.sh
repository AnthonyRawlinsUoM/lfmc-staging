#!/usr/bin/env bash
set -ex

USERNAME=anthonyrawlinsuom
IMAGE=lfmc-staging

# ensure we're up to date
git pull

npm version patch
PACKAGE_VERSION= node -pe "require('./package.json').version"
echo $PACKAGE_VERSION>"VERSION"
# bump version
old_version=`cat VERSION`
docker run --rm -v "$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

# run build
make build

# tag it
git add -A
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags
docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
# push it
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$version
