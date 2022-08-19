# marketplace-indexer

## 🎟️ Description

This crate contains everything related to on-chain event indexing. It uses [apibara](http://apibara.com/) as an indexing server.

## 🎗️ Prerequisites

### 1. Setup your environment

Create the `.env` file with the correct environment variables.
Copy the `.env.example` file and modify the values according to your setup.

### 2. Start the docker container

Make sure `docker-compose` is installed (see [Installation instructions](https://docs.docker.com/compose/install/)).

```
docker-compose up -d
```

## 📦 Installation

To build the project, run the following command:

```sh
cargo build
```

## 🔬 Usage

To launch the backend, just run:
```sh
cargo run
``` 

## 🌡️ Testing

```
cargo test
```

## 🫶 Contributing

## 📄 License

**marketplace-indexer** is released under the [MIT](LICENSE).
