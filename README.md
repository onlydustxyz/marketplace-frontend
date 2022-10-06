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
Copy the `.env.example` file and modify the values according to your setup.

### 2. Start the docker container

Make sure `docker-compose` is installed (see [Installation instructions](https://docs.docker.com/compose/install/)).
Note: specify the `BASE_TAG` to be used depending on your CPU (`latest` or `latest-arm`)

```
BASE_TAG=latest-arm docker-compose -f ./marketplace-core/scripts/docker/dev/docker-compose.yml up -d
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

### Add a single repository for indexing

```
cargo run &
curl -d '{"owner":"onlydustxyz", "name":"starkonquest"}' -H "Content-Type: application/json" -X POST http://localhost:8000/projects
```

## 🌡️ Testing

```
cargo test
```

### End-to-end testing

We are using a pre-build dump for `starknet-devnet` (see [marketplace-starknet CI](https://github.com/onlydustxyz/marketplace-starknet/blob/main/.github/workflows/devnet.yml)).

To run the end-to-end tests, make sure the docker is up and running and your back-end and indexer are up as well.
Then run:

```sh
$ cargo test -p marketplace-tests --features with_e2e_tests e2e_tests
```

## 🫶 Contributing

## 📄 License

**marketplace-backend** is released under [MIT](LICENSE).
