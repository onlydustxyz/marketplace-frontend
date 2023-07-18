use std::env;

use infrastructure::database::Config;
use rstest::fixture;
use testcontainers::{clients::Cli, core::WaitFor, images::generic::GenericImage, RunnableImage};

use super::{docker, Container};

#[fixture]
fn user() -> String {
	String::from("postgres")
}

#[fixture]
fn password() -> String {
	String::from("Passw0rd")
}

#[fixture]
fn db() -> String {
	String::from("marketplace_db")
}

#[fixture]
fn image(db: String, user: String, password: String) -> RunnableImage<GenericImage> {
	let hasura_auth_migrations_path = format!(
		"{}/tests/resources/hasura_auth_migrations",
		env::current_dir().unwrap().display()
	);

	RunnableImage::from(
		GenericImage::new("postgres", "14.3-alpine")
			.with_env_var("POSTGRES_DB", db)
			.with_env_var("POSTGRES_USER", user)
			.with_env_var("POSTGRES_PASSWORD", password)
			.with_env_var("POSTGRES_HOST_AUTH_METHOD", "trust")
			.with_volume(hasura_auth_migrations_path, "/docker-entrypoint-initdb.d")
			.with_wait_for(WaitFor::StdOutMessage {
				message: "database system is ready to accept connections".to_string(),
			}),
	)
	.with_container_name("database")
}

#[fixture]
pub fn container(docker: &'static Cli, image: RunnableImage<GenericImage>) -> Container {
	docker.run(image).into()
}

pub fn config(port: u16) -> Config {
	Config {
		url: format!(
			"postgres://{}:{}@localhost:{port}/{}",
			user(),
			password(),
			db()
		),
		pool_max_size: 2,
	}
}
