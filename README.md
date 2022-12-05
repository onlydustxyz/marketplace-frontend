<div align="center">
  <h1 align="center">Marketplace backend</h1>
  <p align="center">
    <a href="https://discord.gg/onlydust">
        <img src="https://img.shields.io/badge/Discord-6666FF?style=for-the-badge&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=onlydust_xyz">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white">
    </a>
    <a href="https://contributions.onlydust.xyz/">
        <img src="https://img.shields.io/badge/Contribute-6A1B9A?style=for-the-badge&logo=notion&logoColor=white">
    </a>
    <a href="https://codecov.io/gh/onlydustxyz/marketplace-backend" > 
        <img src="https://img.shields.io/codecov/c/gh/onlydustxyz/marketplace-backend?style=for-the-badge&token=BCU5QG0IFJ"/>
    </a>
  </p>
  
  <h3 align="center">Backend services monorepo to operate the contribution marketplace.</h3>

</h3>
</div>

> ## ⚠️ WARNING! ⚠️
>
> This repo contains highly experimental code.
> Expect rapid iteration.

## 🎟️ Description

## 🎗️ Prerequisites

### 1. Setup your environment

Create the `.env` file with the correct environment variables.
Copy the `.env.example` files and modify the values according to your setup.
```
cp .env.example .env
cp api/.env.example api/.env
```

### 2. Start the docker stack

Make sure `docker-compose` is installed (see [Installation instructions](https://docs.docker.com/compose/install/)).

```
docker-compose up -d
```

### 3. Setup the database

Make sure `Diesel CLI` is installed (see [installation instructions](https://diesel.rs/guides/getting-started)):

Then, use `Diesel` to initialize the data model and the database:

```
source .env
diesel setup
diesel migration run
```

## 📦 Installation

To build the project, run the following command:

```
cargo build
```

## 🔬 Usage

Below are some examples of usage.

### Load latest staging dump

Start by cleaning your local env:

```
make docker/clean
```

Then, load the dump:

```
make db/load-fixtures
```

If the dump is out of date, you can update it with:

```
make db/update-staging-dump
```

### Using Hasura

See [Hasura documentation](./hasura).

For convenience, some commands are available from the root of the repo:

```
make hasura/start # Apply metadata and start the console
```

## 🌡️ Testing

Make sure the docker is up and running.
Then run the following command:
```
cargo test
```

### End-to-end testing

Make sure cypress is installed:
```
yarn --cwd testing/cypress install
```

Then run e2e tests:
```
yarn --cwd testing/cypress cypress:open
```

## Migrate database

-   To create a new migration, start running

```
diesel migration generate <your-migration-name>
```

-   Edit the generated files with your SQL code for `up.sql` and `down.sql`
-   Test your migration up and down by running

```
diesel migration run
diesel migration revert
diesel migration run
```

-   The file `schema.rs` should be then automatically updated

## Monitoring

We use Datadog as a monitoring solution.

```json
$~ heroku drains --json --app onlydust-backend-staging

[
  {
    "id": "459e4e77-bbaa-4be2-8237-98fafe856d19",
    "url": "https://http-intake.logs.datadoghq.eu/api/v2/logs/?dd-api-key=$API_KEY&ddsource=heroku&env=staging&service=marketplace-backend&host=staging.api.onlydust.xyz",
    ...
  }
]
```

```json
$~ heroku drains --json --app onlydust-backend-production

[
  {
    "id": "c0b077bf-f0cc-4049-80e9-5b55e18d701a",
    "url": "https://http-intake.logs.datadoghq.eu/api/v2/logs/?dd-api-key=$API_KEY&ddsource=heroku&env=production&service=marketplace-backend&host=api.onlydust.xyz",
    ...
  }
]
```

## 🫶 Contributing

## 📄 License

**marketplace-backend** is released under [MIT](LICENSE).
