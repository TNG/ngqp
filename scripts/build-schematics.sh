#!/usr/bin/env bash

tsc -p projects/ngqp/core/tsconfig.schematics.json
cp projects/ngqp/core/schematics/collection.json dist/ngqp/core