install:
	rustup update nightly
	docker-compose up -d
	[[ -e .env ]] && cp .env.example .env
	source .env
	diesel setup
	diesel migration run
	cargo build
	echo "Installation finished! You can start the application with `cargo run` or using `make start`"

docker/start:
	docker-compose up -d

docker/clean:
	docker-compose stop
	docker-compose rm -f db
	docker volume rm marketplace-backend_db
	docker-compose up -d

db/connect:
	docker-compose up db -d
	docker-compose exec -u postgres db psql marketplace_db

db/update-staging-dump:
	heroku pg:backups:capture --app onlydust-backend-staging-next
	heroku pg:backups:download --app onlydust-backend-staging-next --output ./scripts/fixtures/latest.dump

db/load-fixtures: SHELL:=/bin/bash
db/load-fixtures:
	PGPASSWORD=postgres pg_restore -L <(pg_restore -l ./scripts/fixtures/latest.dump | grep -Ev 'auth migrations|SCHEMA - auth') --clean --no-owner -h localhost -U postgres -d marketplace_db ./scripts/fixtures/latest.dump
	@echo ""
	@echo "Dump loaded ✅"
	@echo ""
	@echo "It was generated on the `GIT_PAGER=cat git log -1 --format=%cd ./scripts/fixtures/latest.dump`"
	@echo "To have a fresh dump, you can use db/update-staging-dump"

api/start:
	cargo run

migration/run:
	diesel migration run

hasura/start:
	yarn --cwd ./hasura start

hasura/clean: migration/run
	docker-compose exec -u postgres db psql marketplace_db -c "DELETE FROM hdb_catalog.hdb_metadata"
	yarn --cwd ./hasura hasura md apply
	yarn --cwd ./hasura hasura md ic drop
	yarn --cwd ./hasura hasura md export
