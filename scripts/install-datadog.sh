#!/bin/bash

# Usage
# ./install-datadog.sh <develop|staging|production> <my-api-key-*******>

ENV=$1
DD_API_KEY=$2

add_log_drain() {
    SERVICE=$1
    SUBDOMAIN=$2

    HOST=""
    if [ $ENV = "staging" ]; then
        HOST="staging.${SUBDOMAIN}.onlydust.xyz"
    elif [ $ENV = "develop" ]; then
        HOST="develop.${SUBDOMAIN}.onlydust.xyz"
    elif [ $ENV = "production" ]; then
        HOST="${SUBDOMAIN}.onlydust.xyz"
    else
        exit 1
    fi

    APPNAME="od-$SERVICE-$ENV"
    echo "Adding log drains for application $APPNAME with {SERVICE=$SERVICE, ENV=$ENV, HOST=$HOST}"
    # Add drain for logs
    heroku drains:add "https://http-intake.logs.datadoghq.eu/api/v2/logs/?dd-api-key=${DD_API_KEY}&ddsource=heroku&env=${ENV}&service=${SERVICE}&host=${HOST}" -a $APPNAME
    echo "Done."
}

#################### DRAINS ONLY ####################

add_log_drain hasura hasura
add_log_drain hasura-auth auth


#################### AGENT + DRAIN ####################

HOST=""
if [ $ENV = "staging" ]; then
    HOST='staging.api.onlydust.xyz'
elif [ $ENV = "develop" ]; then
    HOST='develop.api.onlydust.xyz'
elif [ $ENV = "production" ]; then
    HOST='api.onlydust.xyz'
else
    exit 1
fi

for SERVICE in github-proxy api event-listeners event-store
do
    APPNAME="od-$SERVICE-$ENV"

    echo "Installing Datadog agent for application $APPNAME with {SERVICE=$SERVICE, ENV=$ENV, HOST=$HOST}"

    # Add env variables
    heroku config:add -a $APPNAME DD_AGENT_MAJOR_VERSION=7 DD_SITE=datadoghq.eu DD_DYNO_HOST=true DD_API_KEY=$DD_API_KEY DD_LOG_TO_CONSOLE=false

    # Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
    heroku labs:enable runtime-dyno-metadata -a $APPNAME

    # Add this buildpack and set your Datadog API key
    heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#2.6 -a $APPNAME

    # Add drain for logs
    heroku drains:add "https://http-intake.logs.datadoghq.eu/api/v2/logs/?dd-api-key=${DD_API_KEY}&ddsource=heroku&env=${ENV}&service=${SERVICE}&host=${HOST}" -a $APPNAME

    echo "Done."
done
