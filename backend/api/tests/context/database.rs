use std::env;

use anyhow::{anyhow, Result};
use infrastructure::database;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};

static USER: &str = "postgres";
static PASSWORD: &str = "Passw0rd";
static DATABASE: &str = "marketplace_db";

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub(super) config: database::Config,
	pub client: database::Client,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli) -> Result<Self> {
		let container = docker.run(image());
		let port = container
			.ports()
			.map_to_host_port_ipv4(5432)
			.ok_or(anyhow!("Invalid postgres port"))?;

		let config = database::Config {
			url: format!("postgres://{USER}:{PASSWORD}@localhost:{port}/{DATABASE}"),
			pool_max_size: 2,
		};

		Ok(Self {
			_container: container,
			config: config.clone(),
			client: database::Client::new(database::init_pool(config)?),
		})
	}
}

fn image() -> RunnableImage<GenericImage> {
	let hasura_auth_migrations_path = format!(
		"{}/tests/resources/hasura_auth_migrations",
		env::current_dir().unwrap().display()
	);

	RunnableImage::from(
		GenericImage::new("postgres", "14.3-alpine")
			.with_env_var("POSTGRES_DB", DATABASE)
			.with_env_var("POSTGRES_USER", USER)
			.with_env_var("POSTGRES_PASSWORD", PASSWORD)
			.with_env_var("POSTGRES_HOST_AUTH_METHOD", "trust")
			.with_volume(hasura_auth_migrations_path, "/docker-entrypoint-initdb.d")
			.with_wait_for(WaitFor::StdOutMessage {
				message: "PostgreSQL init process complete; ready for start up".to_string(),
			})
			.with_wait_for(WaitFor::StdOutMessage {
				message: "database system is ready to accept connections".to_string(),
			}),
	)
}
