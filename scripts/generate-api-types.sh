#!/bin/bash

if [[ -z $VERCEL_ENV ]]; then
    echo "⚙️  Genereting types using default API BASEPATH"
    yarn openapi-typescript https://develop-api.onlydust.com/v3/api-docs --output ./src/__generated/api.d.ts
else
    echo "⚙️  Generating types using following API BASEPATH -> $VERCEL_ENV"
    if [[ $VERCEL_ENV = "preview"  ]]; then
        yarn openapi-typescript https://develop-api.onlydust.com/v3/api-docs --output ./src/__generated/api.d.ts

    elif [[ $VERCEL_ENV = "preview (staging)"  ]]; then
        yarn openapi-typescript https://staging-api.onlydust.com/v3/api-docs --output ./src/__generated/api.d.ts

    elif [[ $VERCEL_ENV = "production"  ]]; then
        yarn openapi-typescript https://api.onlydust.com/v3/api-docs --output ./src/__generated/api.d.ts
    fi
fi
