#!/usr/bin/env bash

# If any command fails, stop immediately
set -e -o pipefail

cd dist/ngqp/core; npm publish --access public --registry https://registry.npmjs.org/; cd -

git push --tags
