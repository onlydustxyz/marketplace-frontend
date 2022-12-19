#!/bin/bash

# Usage
# ./install-datadog.sh <staging|production> <my-api-key-*******>

ENV=$1
DD_API_KEY=$2

for SERVICE in github-proxy api event-listeners event-store
do
    APPNAME="od-$SERVICE-$ENV"

    HOST=""
    if [ $ENV = "staging" ]; then
        HOST='staging.api.onlydust.xyz'
    elif [ $ENV = "production" ]; then
        HOST='api.onlydust.xyz'
    else
        exit 1
    fi

    echo "Installing Datadog agent for application $APPNAME with {SERVICE=$SERVICE, ENV=$ENV, HOST=$HOST}"

    # Use the latest major Agent version
    heroku config:add DD_AGENT_MAJOR_VERSION=7 -a $APPNAME

    # Enable tracer startup logs
    heroku config:add DD_TRACE_STARTUP_LOGS=true -a $APPNAME

    # We use Datadog EU site - this is important to have a site that matches our API Keys
    heroku config:add DD_SITE=datadoghq.eu -a $APPNAME

    # Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
    heroku labs:enable runtime-dyno-metadata -a $APPNAME

    # Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
    heroku config:add DD_DYNO_HOST=true -a $APPNAME

    # Add this buildpack and set your Datadog API key
    heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#2.6 -a $APPNAME
    heroku config:add DD_API_KEY=$DD_API_KEY -a $APPNAME

    # Add drain for logs
    heroku drains:add "https://http-intake.logs.datadoghq.eu/api/v2/logs/?dd-api-key=${DD_API_KEY}&ddsource=heroku&env=${ENV}&service=${SERVICE}&host=${HOST}" -a $APPNAME

    echo "Done."
done
