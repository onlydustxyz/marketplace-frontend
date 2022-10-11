install-project:
    rustup update nightly
	docker-compose up -f scripts/docker/dev/docker-compose.yml -d
	[[ -e .env ]] && cp .env.example .env
	source .env
	diesel setup
	diesel migration run
	cargo build
	echo "Installation finished! You can start the application with `cargo run` or using `make start`"

connect-db:
	docker-compose -f scripts/docker/dev/docker-compose.yml exec -u postgres db psql marketplace_db
