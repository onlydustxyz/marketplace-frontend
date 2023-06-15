#!/bin/bash

# fetch the YAML content from the provided URL
curl -s https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml > languages.yml

# convert the YAML to JSON
json=$(yq e -o=json languages.yml)

# use jq to transform the JSON to the desired format
output=$(echo "$json" | jq 'to_entries | map({(.key): true}) | add')
output="export const languages = $output;"

# output the result to .ts file
rm -f frontend/src/__generated/languages.ts
echo $output > frontend/src/__generated/languages.ts

# remove the temporary YAML file
rm languages.yml
