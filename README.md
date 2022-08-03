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

```
docker-compose -f scripts/docker/dev/docker-compose.yml up -d
```

### 3. Setup the database

Make sure `Diesel CLI` is installed (see [installation instructions](https://diesel.rs/guides/getting-started)):

Then, use `Diesel` to initialize the data model and the database:

```
source .env
diesel setup
diesel migration run
```

### 4. Deploy smart contracts on devnet

1. Install and run [starknet-devnet]()
```bash
pip install starknet-devnet
starknet-devnet --seed 0
```

Then add the first account as `local_admin` in your `~/.starknet_accounts/starknet_open_zeppelin_accounts.json` file.

2. Deploy the smart contracts
```bash
cd marketplace-smart-contracts
./scripts/deploy.sh -p local -a local_admin
```

3. Replace the values of the deployed smart contracts in your `.env` file
```bash
cd marketplace-backend
sed -e '/PROFILE_ADDRESS=/d' -e '/REGISTRY_ADDRESS=/d' -e '/CONTRIBUTIONS_ADDRESS=/d' .env | tee .env > /dev/null
cat ../marketplace-smart-contracts/build/deployed_contracts_local.txt >> .env
```

4. Run your back-end
```bash
cargo run
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

## 🫶 Contributing

## 📄 License

**marketplace-backend** is released under the [MIT](LICENSE).
