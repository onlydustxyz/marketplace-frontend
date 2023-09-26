#!/usr/bin/env bash

###########################
#       Release           #
###########################

# fail fast
set -ueo pipefail

export HASURA_GRAPHQL_DISABLE_INTERACTIVE=true

cd hasura
./lib/hasura $*
