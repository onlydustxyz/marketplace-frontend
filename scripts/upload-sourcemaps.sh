#!/bin/bash

export DATADOG_SITE=datadoghq.eu
export DATADOG_API_HOST=api.datadoghq.eu
SERVICE=onlydust-app

if [[ -z "$DATADOG_API_KEY" || -z "$ASSET_PATH" || -z "$NEXT_PUBLIC_ENV"  ]]; then
    echo "Skipping upload of sourcemaps"
else
    yarn datadog-ci sourcemaps upload ./dist \
        --service=$SERVICE \
        --minified-path-prefix=$ASSET_PATH \
        --release-version=$NEXT_PUBLIC_ENV
    echo "Done uploading sourcemaps for $SERVICE version $NEXT_PUBLIC_ENV"
fi
