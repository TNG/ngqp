#!/usr/bin/env bash
# TODO: Copy README

yarn run lint || exit 1

rm -rf dist/
yarn run changelog:build || exit 1
yarn run core:build || exit 1
yarn run schematics:build || exit 1

# TODO Why does this not work?
cd dist/ngqp/core && npm publish