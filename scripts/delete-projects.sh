#!/bin/bash

SCRIPT_DIR=`readlink -f $0 | xargs dirname`
. $SCRIPT_DIR/utils.sh

get_events() {
    id=$1
    psql $DATABASE_URL -v id="$id" -f $SCRIPT_DIR/get-events.sql
}

delete_project() {
    id=$1
    psql $DATABASE_URL -v id="$id" -f $SCRIPT_DIR/delete-project.sql
}

safe_delete_project() {
    id=$1
    get_events $id

    ask "Do you want to delete this project"
    if [ $? -eq 0 ]; then
        delete_project $id
    fi
}

for id in $*
do
    safe_delete_project $id
done
