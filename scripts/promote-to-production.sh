#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

slug_commit() {
    APP=$1
    heroku releases:info --app $APP --shell | sed -n 's/HEROKU_SLUG_COMMIT=\(.*\)/\1/p'
}

deploy_backends() {
    log_info "Retrieving apps infos..."
    staging_commit=`slug_commit od-api-staging`
    production_commit=`slug_commit od-api-production`

    log_info "Checking diff to be loaded in production"
    execute "git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' $production_commit..$staging_commit"

    echo
    ask "OK to continue"
    if [ $? -eq 0 ]; then
        # The order of the apps matters:
        # 1. github-proxy: must be done first to expose the new API for hasura
        # 2. api: to apply DB migrations and hasura metadata
        # 3. event-listeners: to start any new consumer
        # 4. event-store: to handle new events
        for app in github-proxy api event-listeners event-store
        do
            echo execute heroku pipelines:promote --app od-$app-staging --to od-$app-production
        done

        log_info "Checking diff in environment variables"
        DIFF=`git diff $production_commit..$staging_commit -- docker-compose.yml .env.example`
        if [ -n "$DIFF" ]; then
            echo $DIFF
            log_warning "Some diff have been found, make sure to update the environment variables 🧐"
        else
            log_success "No diff found, you are good to go 🥳"
        fi

        log_info "Checking diff in hasura metadata"
        DIFF=`git diff $production_commit..$staging_commit -- hasura/metadata`
        if [ -n "$DIFF" ]; then
            log_warning "Some diff have been found, make sure to reload hasura metadata 🧐"
            log_warning "https://od-hasura-production.herokuapp.com/"
        else
            log_success "No diff found, you are good to go 🥳"
        fi
    fi
}

check_command git
check_command heroku
check_command vercel

ask "Do you want to deploy the backends"
if [ $? -eq 0 ]; then
    deploy_backends
fi

ask "Do you want to deploy the frontend"
if [ $? -eq 0 ]; then
    execute vercel deploy --prod
fi

log_info "📌 Do not forget to promote Retool apps 😉"

exit_success
