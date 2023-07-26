<div align="center">
  <h1 align="center">Marketplace</h1>
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
    <a href="https://codecov.io/gh/onlydustxyz/marketplace" > 
        <img src="https://img.shields.io/codecov/c/gh/onlydustxyz/marketplace?style=for-the-badge&token=BCU5QG0IFJ"/>
    </a>
    <img src="https://github.com/onlydustxyz/marketplace/actions/workflows/install.yml/badge.svg" />
  </p>
  
  <h3 align="center">Marketplace monorepo</h3>

</h3>
</div>

> ## ⚠️ WARNING! ⚠️
>
> This repo contains highly experimental code.
> Expect rapid iteration.

# Global architecture

![Global architecture](doc/architecture.excalidraw.png)

# Github indexing

![Github indexing](doc/github_indexing.excalidraw.png)

# Data Diagram

[Data Diagram](./doc/data_diagram.md)

# Development

## 🎗️ Prerequisites

- [rust](https://www.rust-lang.org/tools/install)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [docker](https://docs.docker.com/get-docker/)

## 📦 Installation

```
cp .env.example .env
```

Then modify the values tagged with `REPLACE_AT_INSTALLATION` according to your personal accounts.

You can now run the project installation script:

```
make install
```

## 🔬 Usage

List all available commands:

```
make
```

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

### 🔬 Frontend

To run in development mode

```bash
yarn dev
```

To run in development mode with the develop backend

```bash
yarn dev --mode backend
```

#### 🛠 Build

```bash
yarn build
```

To run build locally :

```bash
yarn preview
```

### 📚 Storybook

To view components in isolation using [Storybook](https://storybook.js.org/)

```bash
yarn storybook
```

### 🕸 GraphQL codegen

To generate types from the Hasura GraphQL schema during development

```bash
yarn generate --watch
```

Use the `HASURA_URL` and `HASURA_SECRET_KEY` environment variables to connect to a custom Hasura environment

### 📚 Update list of supported languages

You'll need `yq` and `jq`

```bash
brew install yq jq
```

To update the list of supported languages (taken from Github) used to autocomplete technologies
in the profile edit form

```bash
yarn update-languages
```

## 🌡️ Testing

### Backend

Make sure the docker is up and running.
Then run the following command:

```
cargo test
```

### Frontend unit/integration

```bash
yarn test
```

### End-to-end testing

```
make app/background-start
make playwright/test
```

## Migrate database

- To create a new migration, start running

```
diesel migration generate <your-migration-name>
```

- Edit the generated files with your SQL code for `up.sql` and `down.sql`
- Test your migration up and down by running

```
diesel migration run
diesel migration revert
diesel migration run
```

- The file `schema.rs` should be then automatically updated

## Security

To activate the GitGuardian pre-commit, you need first to connect to GitGuardian : 

* follow the GitGuardian documentation to install their CLI : https://docs.gitguardian.com/ggshield-docs/getting-started
* authenticate to GitGuardian by running `ggshield auth login`

Then, install GitGuardian pre-commit hook to check if some secrets are leaked inside the code base :

run `pre-commit install`

## Monitoring

We use Datadog as a monitoring solution.
Datadog agents and drains are configured using Terraform.

# 📄 License

**marketplace** is released under [MIT](LICENSE).

# Acknowledgements

This project is tested with BrowserStack.
