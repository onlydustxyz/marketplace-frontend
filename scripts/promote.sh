#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

FROM_ENV=
FROM_BRANCH=
TO_ENV=
TO_BRANCH=

REMOTE=promote-origin

check_args() {
    [[ -z $FROM_ENV ||  -z $TO_ENV ]] && exit_error "Invalid arguments, you must specify at least --staging or --production flag"
}

check_cwd() {
    root_dir=`git rev-parse --show-toplevel`
    [ $? -ne 0 ] && exit_error "You are not in a git directory"
    [ `pwd` != $root_dir ] && exit_error "Please run this script from the root directory: $root_dir"
}

delete_remote() {
    [ `git remote | grep -c $REMOTE` -gt 0 ] && git remote remove $REMOTE
}

create_remote() {
    delete_remote
    git remote add $REMOTE https://github.com/onlydustxyz/marketplace.git -f
    [ $? -ne 0 ] && exit_error "Unable add remote."
}

check_commits() {
    heroku_commit=`heroku config:get HEROKU_SLUG_COMMIT --app od-api-$FROM_ENV`
    git_commit=`git rev-parse $REMOTE/$FROM_BRANCH`
    [ $heroku_commit != $git_commit ] &&
        echo -n "Heroku commit: " && git --no-pager log $heroku_commit --pretty=format:'%Cred%h%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset%n' --no-walk &&
        echo -n "Git commit   : " && git --no-pager log $git_commit --pretty=format:'%Cred%h%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset%n' --no-walk &&
        exit_error "Looks like what is currently deployed on Heroku does not match git branch"

}

check_env_vars_diff() {
    log_info "Checking diff in environment variables"
    GIT_DIFF_CMD="git diff $to_commit..$from_commit -- infra.docker-compose.yml backend.docker-compose.yml frontend.docker-compose.yml .env.e2e"
    DIFF=`eval $GIT_DIFF_CMD`
    if [ -n "$DIFF" ]; then
        execute $GIT_DIFF_CMD
        log_warning "Some diff have been found, make sure to update the environment variables 🧐"
    else
        log_success "No diff found, you are good to go 🥳"
    fi
}

git_push() {
    LOCAL_BRANCH=promote

    log_info "Pushing diff on git"

    [ `git branch | grep -c $REMOTE` -gt 0 ] && git branch -D $LOCAL_BRANCH
    git checkout -b $LOCAL_BRANCH $REMOTE/$FROM_BRANCH
    [ $? -ne 0 ] && exit_error "Unable to checkout $FROM_BRANCH to $LOCAL_BRANCH."

    git push $REMOTE $LOCAL_BRANCH:$TO_BRANCH
    [ $? -ne 0 ] && exit_error "Unable to push $FROM_BRANCH to $TO_BRANCH. Please rebase then try again."

    git checkout -
    git branch -D $LOCAL_BRANCH
}

backup_database() {
    log_info "Creating DB backup..."
    execute heroku pg:backups:capture -a od-hasura-$TO_ENV
}

promote_heroku() {
    # The order of the apps matters:
    # 1. api: to apply DB migrations and hasura metadata
    # 2. github-indexer: to start any new consumer
    for app in api github-indexer
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

    log_info "Reloading hasura metadata"
    heroku run -a od-api-$TO_ENV hasura metadata apply --skip-update-check
    heroku run -a od-api-$TO_ENV hasura metadata reload --skip-update-check
}

deploy() {
    log_info "Retrieving apps infos..."
    from_commit=$REMOTE/$FROM_BRANCH
    to_commit=$REMOTE/$TO_BRANCH

    print "Checking diff from $to_commit to $from_commit"

    log_info "Checking diff to be loaded in $TO_ENV"
    git log --color --graph --pretty=format:'%Cred%h%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' $to_commit..$from_commit | tee

    echo
    ask "OK to continue"

    log_info "Checking diff in environment variables"
    GIT_DIFF_CMD="git diff $to_commit..$from_commit -- .env.e2e infra.docker-compose.yml backend.docker-compose.yml frontend.docker-compose.yml **/Procfile **/app.yaml"
    DIFF=`eval $GIT_DIFF_CMD`
    if [ -n "$DIFF" ]; then
        execute $GIT_DIFF_CMD
        log_warning "Some diff have been found, make sure to update the environment variables 🧐"
    else
        log_success "No diff found, you are good to go 🥳"
    fi

    echo
    ask "OK to continue"

    if [ $? -eq 0 ]; then
        backup_database
        git_push
        promote_heroku
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
      FROM_BRANCH=main
      TO_ENV=staging
      TO_BRANCH=staging
      shift
      ;;
    --production)
      FROM_ENV=staging
      FROM_BRANCH=staging
      TO_ENV=production
      TO_BRANCH=production
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
create_remote
check_commits

deploy

delete_remote

exit_success
