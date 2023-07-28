use std::collections::HashMap;

use anyhow::Result;
use api::{presentation::bootstrap::bootstrap, Config};
use presentation::http;
use rocket::local::asynchronous::Client;
use rstest::fixture;
use testcontainers::clients::Cli;
use testing::context::{amqp, database};

pub mod environment;
pub mod simple_storage;

use url::Url;

#[fixture]
#[once]
pub fn docker() -> Cli {
	Cli::docker()
}

pub struct Context<'a> {
	pub http_client: Client,
	pub database: database::Context<'a>,
	pub amqp: amqp::Context<'a>,
	pub simple_storage: simple_storage::Context<'a>,
	_environment: environment::Context,
}

impl<'a> Context<'a> {
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		tracing_subscriber::fmt::init();

		let database = database::Context::new(docker)?;
		let amqp = amqp::Context::new(docker, vec![event_store::bus::QUEUE_NAME]).await?;
		let simple_storage = simple_storage::Context::new(docker)?;

		let config = Config {
			amqp: amqp.config.clone(),
			http: http::Config {
				api_keys: HashMap::default(),
			},
			database: database.config.clone(),
			tracer: infrastructure::tracing::Config {
				ansi: false,
				json: true,
				location: true,
			},
			web3: infrastructure::web3::Config {
				url: "https://test.com".parse().unwrap(),
			},
			s3: simple_storage.config.clone(),
			graphql_client: infrastructure::graphql::Config {
				base_url: Url::parse("https://test.com").unwrap(),
				headers: HashMap::new(),
			},
			github: infrastructure::github::Config {
				base_url: "http://github-test.com".to_string(),
				personal_access_tokens: "test".to_string(),
				headers: HashMap::new(),
				max_calls_per_request: None,
			},
		};

		Ok(Self {
			http_client: Client::tracked(bootstrap(config.clone()).await?).await?,
			database,
			amqp,
			simple_storage,
			_environment: environment::Context::new(),
		})
	}
}
