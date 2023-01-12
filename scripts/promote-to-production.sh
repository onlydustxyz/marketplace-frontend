#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

slug_commit() {
    APP=$1
    heroku releases:info --app $APP --shell | sed -n 's/HEROKU_SLUG_COMMIT=\(.*\)/\1/p'
}

deploy_backends() {
    log_info "Checking diff to be loaded in production"
    execute heroku pipelines:diff --app od-api-staging

    log_info "Checking diff in docker-compose"

    staging_commit=`slug_commit od-api-staging`
    production_commit=`slug_commit od-api-production`

    DIFF=`execute git diff $production_commit..$staging_commit -- docker-compose.yml`
    if [ -n "$DIFF" ]; then
        log_warning "Some diff have been found, make sure to update the environment variables 🧐"
        echo $DIFF
    else
        log_success "No diff found, you are good to go 🥳"
    fi

    ask "OK to continue"
    if [ $? -eq 0 ]; then
        # The order of the apps matters:
        # 1. github-proxy: must be done first to expose the new API for hasura
        # 2. api: to apply DB migrations and hasura metadata
        # 3. event-listeners: to start any new consumer
        # 4. event-store: to handle new events
        for app in github-proxy api event-listeners event-store
        do
            execute heroku pipelines:promote --app od-$app-staging --to od-$app-production
        done
    fi
}

check_command git
check_command heroku

ask "Do you want to deploy the backends"
if [ $? -eq 0 ]; then
    deploy_backends
fi

log_info "📌 Do not forget to promote Retool apps 😉"

exit_success
