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

Make sure Rust 1.70 is used:

```sh
rustup default 1.70
```

## Usage

First, prepare your local environment by configuring your `.env`. Copy the `.env.e2e` file and replace the values tagged with `REPLACE_AT_INSTALLATION` according to your personal accounts.

```sh
cp .env.e2e .env
```

To run the whole stack:

```sh
yarn e2e:env:up
```

To execute e2e tests:

```sh
yarn e2e:run
```

To reset the whole stack (including clearing DB data):

```sh
yarn e2e:env:reset
```

To run / shutdown the backend (including infra):

```sh
yarn backend:up
yarn backend:down
```

Many other commands are available in the [package.json](./package.json) file. Please check it.

### 📚 Storybook

To view components in isolation using [Storybook](https://storybook.js.org/)

```bash
yarn --cwd ./frontend storybook
```

### 🕸 GraphQL codegen

To generate types from the Hasura GraphQL schema during development

```bash
yarn --cwd ./frontend generate
```

### 📚 Update list of supported languages

You'll need `yq` and `jq`

```bash
brew install yq jq
```

To update the list of supported languages (taken from Github) used to autocomplete technologies
in the profile edit form

```bash
yarn --cwd ./frontend update-languages
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
