ROOT_DIR 				:= $(shell basename $(dir $(realpath $(lastword $(MAKEFILE_LIST)))))
RUST_VERSION 			:= $(shell sed -n 's/^ *channel.*=.*"\([^"]*\)".*/\1/p' rust-toolchain.toml)
REMOTE_DB_OWNER_APP		:= od-hasura-develop
.DEFAULT_GOAL 			:= default

install:
	rustup install $(RUST_VERSION)

docker/up:
	docker compose up -d --wait

docker/clean:
	docker compose down -v

docker/re: docker/clean playwright/clean docker/up

db/up:
	docker compose up -d --wait db

db/connect: db/up
	docker compose exec -u postgres db psql marketplace_db

db/migrate: db/up
	diesel migration run

db/update-staging-dump:
	heroku pg:backups:capture --app $(REMOTE_DB_OWNER_APP)
	heroku pg:backups:download --app $(REMOTE_DB_OWNER_APP) --output ./scripts/fixtures/latest.dump

db/load-fixtures: SHELL:=/bin/bash
db/load-fixtures: db/up
	PGPASSWORD=postgres pg_restore -L <(pg_restore -l ./scripts/fixtures/latest.dump | grep -Ev 'auth|migrations|hdb_catalog|SCHEMA - auth') --no-owner --disable-triggers --data-only -h localhost -U postgres -d marketplace_db ./scripts/fixtures/latest.dump
	@echo ""
	@echo "Dump loaded ✅"
	@echo ""
	@echo "It was generated on the `GIT_PAGER=cat git log -1 --format=%cd ./scripts/fixtures/latest.dump`"
	@echo "To have a fresh dump, you can use db/update-staging-dump"

node_modules:
	yarn
frontend/install: node_modules

hasura/node_modules:
	yarn --cwd ./hasura
hasura/install: hasura/node_modules

api/start: docker/up
	cargo run -p api

hasura/start:
	yarn --cwd ./hasura start

hasura/clean: db/migrate
	docker compose exec -u postgres db psql marketplace_db -c "DELETE FROM hdb_catalog.hdb_metadata"
	yarn --cwd ./hasura hasura --skip-update-check md apply
	yarn --cwd ./hasura hasura --skip-update-check md ic drop
	yarn --cwd ./hasura hasura --skip-update-check md export

playwright/test:
	yarn playwright test --reporter line

playwright/clean:
	rm -f "playwright/marketplace_db_dump"
	rm -rf "playwright/fixtures/__generated"

default: install frontend/install docker/re db/up db/update-staging-dump db/migrate db/load-fixtures hasura/clean playwright/test playwright/clean
