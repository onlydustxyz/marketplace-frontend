#!/usr/bin/env bash

###########################
#       Release           #
###########################

# fail fast
set -ueo pipefail

export HASURA_GRAPHQL_DISABLE_INTERACTIVE=true

echo "Update metadata"

cd hasura
./lib/hasura metadata apply
