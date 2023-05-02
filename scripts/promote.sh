#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

FROM_ENV=
TO_ENV=

check_args() {
    [[ -z $FROM_ENV ||  -z $TO_ENV ]] && exit_error "Invalid arguments, you must specify at least --staging or --production flag"
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
    execute heroku pg:backups:capture -a od-hasura-$TO_ENV

    log_info "Retrieving apps infos..."
    from_commit=`slug_commit od-api-$FROM_ENV`
    to_commit=`slug_commit od-api-$TO_ENV`

    print "Checking diff from $to_commit to $from_commit"

    log_info "Checking diff to be loaded in $TO_ENV"
    git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' $to_commit..$from_commit | tee

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
            execute heroku pipelines:promote --app od-$app-$FROM_ENV --to od-$app-$TO_ENV
        done

        while [[ "$(curl -s -o /dev/null -L -w ''%{http_code}'' api.onlydust.xyz/health)" != "200" ]]
        do
            echo "Waiting for api to be up..."
            sleep 2
        done

        log_info Checking events sanity
        heroku run -a od-api-$TO_ENV events_sanity_checks

        log_info "Checking diff in environment variables"
        GIT_DIFF_CMD="git diff $to_commit..$from_commit -- docker-compose.yml .env.example"
        DIFF=`eval $GIT_DIFF_CMD`
        if [ -n "$DIFF" ]; then
            execute $GIT_DIFF_CMD
            log_warning "Some diff have been found, make sure to update the environment variables 🧐"
        else
            log_success "No diff found, you are good to go 🥳"
        fi

        log_info "Reloading hasura metadata"
        heroku run -a od-api-$TO_ENV hasura metadata apply --skip-update-check
        heroku run -a od-api-$TO_ENV hasura metadata reload --skip-update-check
    fi
}

usage() {
  echo "Usage: $0 [ --staging | --production ]"
  echo "  --staging         Promote to staging"
  echo "  --production      Promote to production"
  echo ""
}

while [[ $# -gt 0 ]]; do
  case $1 in
    --staging)
      FROM_ENV=develop
      TO_ENV=staging
      shift
      ;;
    --production)
      FROM_ENV=staging
      TO_ENV=production
      shift
      ;;
    --help | -h)
      usage
      exit 0
      ;;
    *)
      exit_error "Error: unrecognized option '$1'"
      ;;
  esac
done

check_args
check_command git
check_command heroku

check_cwd

ask "Do you want to deploy the backends"
if [ $? -eq 0 ]; then
    deploy_backends
fi

log_info "📌 Do not forget to promote Retool apps 😉"

exit_success
