#!/bin/bash

# merge projects
sed 1d project-merges.csv | strings | while IFS=, read -r new old budget_new budget_old
do
    psql $DATABASE_URL -v new="$new" -v old="$old" -v budget_new="$budget_new" -v budget_old="$budget_old" -f merge-projects.sql
done

# update project names
sed 1d project-names.csv | strings | while IFS=, read -r name id
do
    psql $DATABASE_URL -v name="$name" -v id="$id" -f update-projects-names.sql
done


# update projects descriptions
psql $DATABASE_URL -f initialize_long_descriptions.sql
