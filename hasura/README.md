# Hasura onlydust

## Context

GraphQL is a way of architecturing the presentation layer to let frontend developers write their own query on the data exposed by the backend.
To achieve this, we expose a schema above our database that can be queried to select or mutate data.

You can explore our schema [with graphiql](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Fonlydust-hasura-staging.herokuapp.com%2Fv1%2Fgraphql).

The graph will change depending on your role.
You can use a different role by setting the correct headers on the request.
For example, you can use this combination:

```
x-hasura-admin-secret: <SECRET_FOUND_ON_HEROKU_ENV_VARS>
x-hasura-role: <ANY_ROLE_YOU_WANT_TO_TEST>
```

## Launch local instance

```
docker-compose up -d
```

Two containers are started:

-   graphql-engine: The hasura process
-   pg_hasura_metadata: The Hasura database for its configuration

## Modify Hasura configuration

You can modify config in two ways:

-   Modify yaml source files and load them in your local metadata database
-   Modify database from the console (`yarn hasura start` or `make hasura/start` from root) and then export config in your yaml files

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

### Manual deploy

Currently, you can deploy configuration from your local environment by setting the appropriate env variables (found in Heroku/1password).

Run:

```
yarn deploy -- --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_ADMIN_SECRET_KEY
```

### Continuous Deploy

A buildpack to automatically deploy metadata to corresponding environement has been created [here](https://github.com/onlydustxyz/update-hasura-metadata-buildpack).
It will run on each env to execute metadata apply on deploy.

## Hasura Auth

To manage authentication and roles, we use [hasura-auth](https://github.com/nhost/hasura-auth).
It is based on a database schema `auth` that is created in the `db` docker on init.

Docker compose boot a hasura auth server accessible on http://localhost:4000.
It is configured through env variables stored in `hasura/auth/config.env`.

Resources:

-   [Openapi doc](https://editor.swagger.io/?url=https://raw.githubusercontent.com/nhost/hasura-auth/main/docs/openapi.json)
-   [JWT decoder](https://jwt.io/)
-   [List of env variable](https://github.com/nhost/hasura-auth/blob/main/docs/environment-variables.md)
-   [DB schema](https://github.com/nhost/hasura-auth/blob/main/docs/schema.md)
