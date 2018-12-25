#!/usr/bin/env bash
# TODO: Update website
# TODO: --dry-run (changelog, no publish)

# If any command fails, stop immediately
set -e -o pipefail

echo "[1] Linting"
yarn run lint

echo "[2] Removing dist folder"
rm -rf dist/

echo "[3] Updating CHANGELOG"
cd projects/ngqp/core && standard-version --infile ../../../CHANGELOG.md && cd -

echo "[4] Building @ngqp/core"
yarn run core:build

echo "[5] Building schematics"
yarn run schematics:build

echo "[6] Copy README and LICENSE"
cp README.md dist/ngqp/core
cp LICENSE dist/ngqp/core

echo "[7] Pushing to remote"
git push

echo "[8] Publishing to npm"
cd dist/ngqp/core && npm publish --access public && cd -