#!/bin/bash
set +x

cargo clean
cargo +nightly fmt
cargo clippy  --bins --tests --examples -- -D warnings
