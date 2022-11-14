# Hasura onlydust

You can find some documentation [on Notion](https://www.notion.so/onlydust/Hasura-decisions-44eeeafd20614872a3437aa2529e3a50) about the decisions we made.

## Launch local instance

```
docker-compose -f scripts/docker/dev/docker-compose.yml up -d
```

Two containers are started:

-   graphql-engine: The hasura process
-   pg_hasura_metadata: The Hasura database for its configuration

## Modify Hasura configuration

You can modify config in two ways:

-   Modify yaml source files and load them in your local metadata database
-   Modify database from [the console](http://localhost:8080/console/api/api-explorer) and then export config in your yaml files

### Install Hasura CLI

To sync metadata with your yaml files, you will need the [hasura CLI](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/)

```bash
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
```

### From console

Open console with the start command (running `hasura console`):

```
cd hasura && yarn start
```

This changes will be sync automatically in your local config files.

### From source files

Modify your source files, then run `yarn start` to check that everything is well formatted.

## Deployment

Currently, you can deploy configuration from your local environment by setting the appropriate env variables (found in Heroku/1password).

Run:

```
hasura deploy --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_ADMIN_SECRET_KEY
```

### CD

TODO
