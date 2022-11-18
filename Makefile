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

docker/connect-db:
	docker-compose up db -d
	docker-compose exec -u postgres db psql marketplace_db

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
