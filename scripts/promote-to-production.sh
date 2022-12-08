#!/bin/bash

# The order of the apps matters:
# 1. github-proxy: must be done first to expose the new API for hasura
# 2. api: to apply DB migrations and hasura metadata
# 3. event-listeners: to start any new consumer
# 4. event-store: to handle new events
for app in api event-listeners event-store github-proxy
do
    heroku pipelines:promote --app od-$app-staging --to od-$app-production
done
