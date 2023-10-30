#!/bin/bash

default_swagger_doc_url="https://develop-api.onlydust.com/v3/api-docs"
staging_swagger_doc_url="https://staging-api.onlydust.com/v3/api-docs"
production_swagger_doc_url="https://api.onlydust.com/v3/api-docs"

function generate_code_from_swagger_doc_url() {
    echo "⚙️  Generating types using default API BASEPATH = ${1}"
    yarn openapi-typescript $1 --output ./src/__generated/api.d.ts
}

echo "Starting to generate code from REST API contract on branch ${VERCEL_GIT_COMMIT_REF} ..."

if [[ -z $VERCEL_GIT_COMMIT_REF ]]; then
    generate_code_from_swagger_doc_url $default_swagger_doc_url
else
    if [[ $VERCEL_GIT_COMMIT_REF = "staging"  ]]; then
        generate_code_from_swagger_doc_url $staging_swagger_doc_url
    elif [[ $VERCEL_GIT_COMMIT_REF = "production"  ]]; then
        generate_code_from_swagger_doc_url $production_swagger_doc_url
    else
        generate_code_from_swagger_doc_url $default_swagger_doc_url
    fi
fi
