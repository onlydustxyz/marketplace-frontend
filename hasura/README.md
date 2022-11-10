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

You can access console at http://localhost:8080/console/api/api-explorer.
The default local admin secret is stored in docker env variables (currently: `myadminsecretkey`).

When you are done, you can sync the config with your local (be aware that it will erase your un-synced modifications on config files).

```
hasura metadata export
```

Be sure to have exported/sourced the needed env variables:

```
export HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey
export HASURA_GRAPHQL_ENDPOINT=http://localhost:8080
```

### From source files

To load your local config files in the metadata database, you can use the cli:

```
hasura metadata apply
```

Be sure to have exported/sourced the needed env variables:

```
export HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey
export HASURA_GRAPHQL_ENDPOINT=http://localhost:8080
```

It will create another version of the metadatas in your database.
We are not using versions in staging nor production because our versioning is done via github.
You should therefore clear the metadata before load with the following command:

```
hasura metadata clear
```

## Deployment

Currently, you can deploy configuration from your local environment by setting the appropriate env variables (found in Heroku/1password).

### CD

TODO
