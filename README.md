<div align="center">
  <h1 align="center">deathnote-contributions-feeder</h1>
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
  
  <h3 align="center">Death Note off chain service to watch github contributions and update associated smart contract state on StarkNet.</h3>

</h3>
</div>

> ## ⚠️ WARNING! ⚠️
>
> This repo contains highly experimental code.
> Expect rapid iteration.

## 🎟️ Description

## 🎗️ Prerequisites

## 📦 Installation

## 🔬 Usage

## 🌡️ Testing

## Dev

### Environment

#### Docker

```
docker-compose -f scripts/docker/docker-compose-dev.yml up -d
diesel setup
diesel migration run
```

### Analyze a repository

```
cargo run --bin watch_repo bitcoin bitcoin 
```

## 🫶 Contributing

## 📄 License

**deathnote-contributions-feeder** is released under the [MIT](LICENSE).