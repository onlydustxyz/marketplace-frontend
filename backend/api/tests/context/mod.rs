use std::env;

use anyhow::Result;
use api::{presentation::bootstrap::bootstrap, Config};
use presentation::http;
use rocket::local::asynchronous::Client;
use rstest::fixture;
use testcontainers::clients::Cli;
use testing::context::{amqp, database, github};

pub mod environment;
pub mod indexer;
pub mod simple_storage;
pub mod utils;

pub const API_KEY: &str = "test-api-key";

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
	pub dusty_bot_github: github::Context<'a>,
	pub github: github::Context<'a>,
	pub indexer: indexer::Context<'a>,
	_environment: environment::Context,
}

impl<'a> Context<'a> {
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		tracing_subscriber::fmt::init();

		let database = database::Context::new(docker)?;
		let amqp = amqp::Context::new(docker, vec![event_store::bus::QUEUE_NAME], vec![]).await?;
		let simple_storage = simple_storage::Context::new(docker)?;
		let dusty_bot_github = github::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/dusty_bot_github",
				env::current_dir().unwrap().display(),
			),
			"dusty-bot-pat".to_string(),
		)?;
		let github = github::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/github",
				env::current_dir().unwrap().display(),
			),
			"github-pat".to_string(),
		)?;

		let indexer = indexer::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/indexer",
				env::current_dir().unwrap().display(),
			),
		)?;

		let config = Config {
			amqp: amqp.config.clone(),
			http: http::Config {
				api_keys: vec![API_KEY.to_string()],
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
			github_api_client: github.config.clone(),
			dusty_bot_api_client: dusty_bot_github.config.clone(),
			indexer_client: indexer.config.clone(),
		};

		Ok(Self {
			http_client: Client::tracked(bootstrap(config.clone()).await?).await?,
			database,
			amqp,
			simple_storage,
			dusty_bot_github,
			github,
			indexer,
			_environment: environment::Context::new(),
		})
	}
}
