#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

ENVIRONMENT=production
DB_BILLING_APP=od-hasura-$ENVIRONMENT
ALL_DB_CONNECTED_APPS=(
    od-hasura-$ENVIRONMENT
    od-hasura-auth-$ENVIRONMENT
    od-api-$ENVIRONMENT
    od-event-store-$ENVIRONMENT
    od-event-listeners-$ENVIRONMENT
)

ALL_BACKENDS=(
    od-api-$ENVIRONMENT
    od-github-proxy-$ENVIRONMENT
    od-event-store-$ENVIRONMENT
    od-event-listeners-$ENVIRONMENT
)

manage_apps() {
    action=$1
    for app in ${ALL_BACKENDS[@]}; do
        heroku ps --app $app --json | jq '.[] | .type' | while read dyno; do
            execute heroku ps:$action $dyno --app $app
        done
    done
}

stop_apps() {
    log_info "Stopping the apps"
    manage_apps stop
}

start_apps() {
    log_info "Starting back the apps"
    manage_apps restart
}

rollback_backends() {
    for app in ${ALL_BACKENDS[@]}; do
        execute heroku releases --app $app
        read -p "Which release do you want to rollback to ? (leave blank for 1 release) " rollback_release
        execute heroku rollback $rollback_release --app $app
    done
}

rollback_database() {
    current_database=`heroku addons:info DATABASE -a $DB_BILLING_APP | sed -n 's/=== \(.*\)/\1/p'`
    [ -z $current_database ] && exit_error "Unable to get the current database"
    log_info "Current database is '$current_database':"
    heroku addons:info DATABASE -a $DB_BILLING_APP

    read -p "How much time in the past do you want to rollback to ? (e.g. 1 hour) " rollback_time
    execute heroku addons:create heroku-postgresql:standard-0 --rollback DATABASE --by \'$rollback_time\' --app $DB_BILLING_APP
    rollback_database=`sed -n 's/\(.*\) is being created in the background. .*/\1/p' logs.json`
    [ -z $rollback_database ] && exit_error "Unable to create the rollback database"
    log_info "Rollback database: $rollback_database"

    execute heroku pg:wait --app $DB_BILLING_APP

    ask "OK to promote $rollback_database for all apps"
    if [ $? -eq 0 ]; then
        for app in ${ALL_DB_CONNECTED_APPS[@]}; do
            execute heroku pg:promote $rollback_database -a $app
        done
    fi

    ask "Do you want to destroy old database ($current_database) ?"
    if [ $? -eq 0 ]; then
        execute heroku addons:destroy $current_database
    fi
}

stop_apps

ask "Do you want to rollback the backends"
if [ $? -eq 0 ]; then
    rollback_backends
fi

ask "Do you want to rollback the database"
if [ $? -eq 0 ]; then
    rollback_database
fi

start_apps

exit_success
