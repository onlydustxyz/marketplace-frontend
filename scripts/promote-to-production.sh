#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

check_uptodate_with_main() {
    current_branch=`git branch --show-current`
    [ $current_branch != "main" ] && exit_error "You are not on 'main' branch"
    git pull
    [ $? -ne 0 ] && exit_error "Unable to pull with remote"
}

check_cwd() {
    root_dir=`git rev-parse --show-toplevel`
    [ $? -ne 0 ] && exit_error "You are not in a git directory"
    [ `pwd` != $root_dir ] && exit_error "Please run this script from the root directory: $root_dir"
}

slug_commit() {
    APP=$1
    heroku releases:info --app $APP --shell | sed -n 's/HEROKU_SLUG_COMMIT=\(.*\)/\1/p'
}

deploy_backends() {
    log_info "Creating DB backup..."
    execute heroku pg:backups:capture -a od-hasura-production

    log_info "Retrieving apps infos..."
    staging_commit=`slug_commit od-api-staging`
    production_commit=`slug_commit od-api-production`

    print "Checking diff from $production_commit to $staging_commit"

    log_info "Checking diff to be loaded in production"
    git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' $production_commit..$staging_commit | tee

    echo
    ask "OK to continue"
    if [ $? -eq 0 ]; then
        # The order of the apps matters:
        # 1. github-proxy: must be done first to expose the new API for hasura
        # 2. dusty-bot: idem, must be done first to expose the new API for hasura
        # 3. api: to apply DB migrations and hasura metadata
        # 4. event-listeners: to start any new consumer
        # 5. event-store: to handle new events
        for app in github-proxy dusty-bot api event-listeners event-store
        do
            execute heroku pipelines:promote --app od-$app-staging --to od-$app-production
        done

        while [[ "$(curl -s -o /dev/null -L -w ''%{http_code}'' api.onlydust.xyz/health)" != "200" ]]
        do
            echo "Waiting for api to be up..."
            sleep 2
        done

        log_info Checking events sanity
        heroku run -a od-api-production events_sanity_checks

        log_info "Checking diff in environment variables"
        GIT_DIFF_CMD="git diff $production_commit..$staging_commit -- docker-compose.yml .env.example"
        DIFF=`eval $GIT_DIFF_CMD`
        if [ -n "$DIFF" ]; then
            execute $GIT_DIFF_CMD
            log_warning "Some diff have been found, make sure to update the environment variables 🧐"
        else
            log_success "No diff found, you are good to go 🥳"
        fi

        log_info "Reloading hasura metadata"
        heroku run -a od-api-production hasura metadata apply --skip-update-check
        heroku run -a od-api-production hasura metadata reload --skip-update-check
    fi
}

check_command git
check_command heroku
check_command vercel

check_cwd
check_uptodate_with_main

ask "Do you want to deploy the backends"
if [ $? -eq 0 ]; then
    deploy_backends
fi

ask "Do you want to deploy the frontend"
if [ $? -eq 0 ]; then
    execute vercel pull --environment production
    execute vercel build --prod
    execute vercel deploy --prod --prebuilt
fi

log_info "📌 Do not forget to promote Retool apps 😉"

exit_success
