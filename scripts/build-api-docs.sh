#!/usr/bin/env bash

# If any command fails, stop immediately
set -e -o pipefail

cp README.md projects/ngqp/core
cp LICENSE projects/ngqp/core
cp CHANGELOG.md projects/ngqp/core

cd projects/ngqp/core; compodoc; cd -

rm projects/ngqp/core/README.md
rm projects/ngqp/core/LICENSE
rm projects/ngqp/core/CHANGELOG.md