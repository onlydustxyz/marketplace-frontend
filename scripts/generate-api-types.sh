#!/bin/sh
source .env

if [[ -z "$VITE_ONLYDUST_API_BASEPATH"  ]]; then
    echo "Failed to generate types: missing API BASEPATH env variable"
else
    yarn openapi-typescript https://$VITE_ONLYDUST_API_BASEPATH/v3/api-docs --output ./src/__generated/api.d.ts
fi