ROOT_DIR 				:= $(shell basename $(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
RUST_VERSION 			:= $(shell sed -n 's/^ *channel.*=.*"\([^"]*\)".*/\1/p' rust-toolchain.toml)
REMOTE_DB_OWNER_APP		:= od-hasura-develop
.DEFAULT_GOAL 			:= help

# ----------------------------------------------------------
#                           Utils
# ----------------------------------------------------------

# Prints the list of available commands
help:
	@echo "Available commands:"
	@awk '/^# -+/{getline; sub(/^#[ ]+/, ""); section=$$0 "\n\n"; getline;} /^# /{sub(/^# /, ""); desc=$$0; getline; if ($$0 ~ /^[a-zA-Z0-9].*\/.*[^$#\\t=]*:([^=]|$$)|help|install/) {sub(/:.*/, ""); printf "%s%s  %-30s %s\n", (section != "" ? "\n" : ""), section, $$0, desc; section=""; getline}}' Makefile

# Setups the dev whole dev environment
setup: install docker/re db/up db/update-remote-dump db/migrate db/load-fixtures hasura/start-clean-stop playwright/start-test-stop playwright/clean

# ----------------------------------------------------------
#                     Tools installation
# ----------------------------------------------------------

# Install the desired Rust version
rust/install:
	rustup install $(RUST_VERSION)

# ----------------------------------------------------------
#                 Dependencies installation
# ----------------------------------------------------------

# Install all the dependencies
install: rust/install frontend/install hasura/install playwright/install

node_modules:
	yarn

# Installs the frontend dependencies
frontend/install: node_modules

hasura/node_modules:
	yarn --cwd ./hasura

# Installs the Hasura CLI dependencies
hasura/install: hasura/node_modules

# ----------------------------------------------------------
#                       Docker stack
# ----------------------------------------------------------

# Spins up the docker stack
docker/up:
	docker compose up -d --wait

# Removes all the docker stack including volumes (!)
docker/clean:
	docker compose down -v

# Removes the docker stack, the playwright fixtures, then restarts the docker stack
docker/re: docker/clean playwright/clean docker/up

# Spins up the database
db/up:
	docker compose up -d --wait db

# ----------------------------------------------------------
#                         Database
# ----------------------------------------------------------

# Interactive postgres shell on the database
db/connect: db/up
	docker compose exec -u postgres db psql marketplace_db

# Runs the migrations
db/migrate: db/up
	diesel migration run

# Creates and downloads a remote database dump
db/update-remote-dump:
	heroku pg:backups:capture --app $(REMOTE_DB_OWNER_APP)
	heroku pg:backups:download --app $(REMOTE_DB_OWNER_APP) --output ./scripts/fixtures/latest.dump

# Loads the latest remote dump in
db/load-fixtures: SHELL:=/bin/bash
db/load-fixtures: db/up
	PGPASSWORD=postgres pg_restore -L <(pg_restore -l ./scripts/fixtures/latest.dump | grep -Ev 'auth|migrations|hdb_catalog|SCHEMA - auth') --no-owner --disable-triggers --data-only -h localhost -U postgres -d marketplace_db ./scripts/fixtures/latest.dump
	@echo ""
	@echo "Dump loaded ✅"
	@echo ""
	@echo "It was generated on the `GIT_PAGER=cat git log -1 --format=%cd ./scripts/fixtures/latest.dump`"
	@echo "To have a fresh dump, you can use db/update-remote-dump"

# ----------------------------------------------------------
#                           Backend
# ----------------------------------------------------------

api.pid:
	@./scripts/wait-for-port.sh api 8000

# Starts the API in background
api/background-start: api.pid

# Stops the background API, if running
api/background-stop:
	@if [ -f "api.pid" ]; then \
		kill $$(cat api.pid); \
		rm api.pid; \
		rm api.log; \
	fi

# Starts the API interactively
api/start: docker/up
	cargo run -p api

github-proxy.pid:
	@./scripts/wait-for-port.sh github-proxy 8001

# Starts the Github proxy in background
github-proxy/background-start: github-proxy.pid

# Stops the background Github proxy, if running
github-proxy/background-stop:
	@if [ -f "github-proxy.pid" ]; then \
		kill $$(cat github-proxy.pid); \
		rm github-proxy.pid; \
		rm github-proxy.log; \
	fi

# Starts the backend stack in background
backend/background-start: api/background-start github-proxy/background-start

# Stops the background backend stack, if running
backend/background-stop: api/background-stop github-proxy/background-stop

# ----------------------------------------------------------
#                          Hasura
# ----------------------------------------------------------

# Starts the Hasura CLI in interactive mode
hasura/start:
	yarn --cwd ./hasura start

# Refreshes the local Hasura metadata running the backend stack and stopping it afterwards
hasura/start-refresh-stop: backend/background-start hasura/refresh backend/background-stop

# Refreshes the local Hasura metadata
hasura/refresh: db/migrate
	docker compose exec -u postgres db psql marketplace_db -c "DELETE FROM hdb_catalog.hdb_metadata"
	yarn --cwd ./hasura hasura --skip-update-check md apply
	yarn --cwd ./hasura hasura --skip-update-check md ic drop
	yarn --cwd ./hasura hasura --skip-update-check md export


# ----------------------------------------------------------
#                    End-to-end tests
# ----------------------------------------------------------

# Install the browsers needed by Playwright
playwright/install:
	yarn playwright install

# Runs the e2e tests, starting and stopping the whole stack afterwards
playwright/start-test-stop: backend/background-start playwright/test backend/background-stop

# Runs the e2e tests
playwright/test:
	yarn playwright test --reporter line

# Removes the Playwright generated fixtures
playwright/clean:
	rm -f "playwright/marketplace_db_dump"
	rm -rf "playwright/fixtures/__generated"
