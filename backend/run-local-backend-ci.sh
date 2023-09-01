#!/bin/bash
set +x

cargo +nightly fmt
cargo clippy  --bins --tests --examples -- -D warnings
