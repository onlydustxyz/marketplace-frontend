install-project:
	rustup update nightly
	docker-compose up -d
	[[ -e .env ]] && cp .env.example .env
	source .env
	diesel setup
	diesel migration run
	cargo build
	echo "Installation finished! You can start the application with `cargo run` or using `make start`"

connect-db:
	docker-compose up db -d
	docker-compose exec -u postgres db psql marketplace_db

hasura/start:
	yarn --cwd ./hasura start

migration/run:
	diesel migration run
