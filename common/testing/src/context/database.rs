use std::sync::Arc;

use anyhow::{anyhow, Result};
use diesel_migrations::{embed_migrations, EmbeddedMigrations};
use infrastructure::dbclient;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("../../migrations");

static USER: &str = "postgres";
static PASSWORD: &str = "Passw0rd";
static DATABASE: &str = "marketplace_db";

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub config: dbclient::Config,
	pub client: Arc<dbclient::Client>,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli) -> Result<Self> {
		let container = docker.run(image());
		let port = container
			.ports()
			.map_to_host_port_ipv4(5432)
			.ok_or(anyhow!("Invalid postgres port"))?;

		let config = dbclient::Config {
			url: format!("postgres://{USER}:{PASSWORD}@localhost:{port}/{DATABASE}"),
			pool_max_size: 2,
		};

		let client = dbclient::Client::new(dbclient::init_pool(config.clone())?);

		client.run_migrations(MIGRATIONS)?;

		Ok(Self {
			_container: container,
			config,
			client: Arc::new(client),
		})
	}
}

fn image() -> RunnableImage<GenericImage> {
	let hasura_auth_migrations_path = format!(
		"{}/common/testing/resources/hasura_auth_migrations",
		project_root::get_project_root().unwrap().display()
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
