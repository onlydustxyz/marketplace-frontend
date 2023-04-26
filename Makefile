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
install: install docker/re db/up db/update-remote-dump db/migrate db/load-fixtures hasura/start-clean-stop playwright/start-test-stop

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
install/all: rust/install frontend/install hasura/install playwright/install

node_modules:
	yarn

# ----------------------------------------------------------
#                        Full stack
# ----------------------------------------------------------

# Spins up the full stack in background
app/background-start: docker/up backend/background-start frontend/background-start

# Stops the background full stack, if running
app/background-stop: backend/background-stop frontend/background-stop

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

# Starts the backend stack in background
backend/background-start: event-store/background-start event-listeners/background-start action-dequeuer/background-start api/background-start github-proxy/background-start dusty-bot/background-start

# Stops the background backend stack, if running
backend/background-stop: event-store/background-stop event-listeners/background-stop action-dequeuer/background-stop api/background-stop github-proxy/background-stop dusty-bot/background-stop

api.pid:
	@./scripts/cargo-run.sh api
	@./scripts/wait-for-port.sh 8000

# Starts the API in background
api/background-start: api.pid

# Stops the background API, if running
api/background-stop:
	@./scripts/stop-app.sh api

# Starts the API interactively
api/start: docker/up
	@./scripts/cargo-run.sh api

github-proxy.pid:
	@./scripts/cargo-run.sh github-proxy
	@./scripts/wait-for-port.sh 8001

# Starts the Github proxy in background
github-proxy/background-start: github-proxy.pid

# Stops the background Github proxy, if running
github-proxy/background-stop:
	@./scripts/stop-app.sh github-proxy

dusty-bot.pid:
	@./scripts/cargo-run.sh dusty-bot
	@./scripts/wait-for-port.sh 8002

# Starts the Dusty bot in background
dusty-bot/background-start: dusty-bot.pid

# Stops the background Dusty bot, if running
dusty-bot/background-stop:
	@./scripts/stop-app.sh dusty-bot

event-listeners.pid:
	@./scripts/cargo-run.sh event-listeners

# Starts the event listeners in background
event-listeners/background-start: event-listeners.pid

# Stops the background event listeners, if running
event-listeners/background-stop:
	@./scripts/stop-app.sh event-listeners

event-store.pid:
	@./scripts/cargo-run.sh event-store

# Starts the event store in background
event-store/background-start: event-store.pid

# Stops the background event store, if running
event-store/background-stop:
	@./scripts/stop-app.sh event-store

action-dequeuer.pid:
	@cargo run --bin action-dequeuer > action-dequeuer.log 2>&1 & echo $$! > action-dequeuer.pid
	@echo "App action-dequeuer started with PID: `cat action-dequeuer.pid`"

# Starts the action dequeuer in background
action-dequeuer/background-start: action-dequeuer.pid

# Stops the background action dequeuer, if running
action-dequeuer/background-stop:
	@./scripts/stop-app.sh action-dequeuer

# ----------------------------------------------------------
#                           Frontend
# ----------------------------------------------------------

# Installs the frontend dependencies
frontend/install: node_modules

frontend.pid:
	@yarn dev > frontend.log 2>&1 & echo $$! > frontend.pid
	@./scripts/wait-for-port.sh 5173

# Starts the frontend in background
frontend/background-start: frontend.pid

# Stops the frontend, if running
frontend/background-stop:
	@./scripts/stop-app.sh frontend

# ----------------------------------------------------------
#                          Hasura
# ----------------------------------------------------------

hasura/node_modules:
	yarn --cwd ./hasura

# Installs the Hasura CLI dependencies
hasura/install: hasura/node_modules

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
playwright/start-test-stop: app/background-start playwright/test app/background-stop

# Runs the e2e tests
playwright/test:
	yarn playwright test

# Removes the Playwright generated fixtures
playwright/clean:
	rm -f "playwright/marketplace_db_dump"
	rm -rf "playwright/fixtures/__generated"
