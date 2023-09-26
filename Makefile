default: build

### CI
install:
	@which rustup >/dev/null || curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
	rustup toolchain install nightly
	rustup component add rustfmt --toolchain nightly
	rustup component add llvm-tools-preview
	curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash
	cargo binstall --no-confirm cargo-nextest --secure
	cargo install cargo-llvm-cov

clean:
	cargo clean

fmt:
	cargo +nightly fmt --all -- --check

fmt/fix:
	cargo +nightly fmt --all

check:
	cargo check

clippy:
	cargo clippy --bins --tests --examples -- -D warnings

build:
	cargo build --workspace

unit-tests:
	cargo nextest run --lib

integration-tests:
	cargo nextest run --test '*'

coverage/unit-tests:
	cargo llvm-cov nextest --workspace --no-clean --lcov --output-path lcov.info --lib

coverage/integration-tests:
	cargo llvm-cov nextest --workspace --no-clean --lcov --output-path lcov.info  --test '*'

ci: fmt check clippy build unit-tests integration-tests

### Docker
infra/down:
	docker compose down

infra/clean:
	docker compose down -v

infra/up:
	docker compose up -d

infra/re: clean up

### Backends
api:
	cargo run -p api

quotes-syncer:
	cargo run -p api --bin quotes_syncer

events-sanity-checks:
	cargo run -p api --bin events_sanity_checks

github-indexer:
	cargo run -p github-indexer

.PHONY: install clean fmt check clippy build unit-tests integration-tests ci api quotes-syncer events-sanity-check github-indexer
