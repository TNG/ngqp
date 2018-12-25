#!/usr/bin/env bash

# If any command fails, stop immediately
set -e -o pipefail

tsc -p projects/ngqp/core/tsconfig.schematics.json
cp projects/ngqp/core/collection.json dist/ngqp/core