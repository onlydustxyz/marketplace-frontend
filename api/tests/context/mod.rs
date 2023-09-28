use std::{env, sync::Arc};

use anyhow::Result;
use api::{
	domain::projectors::{self, projections},
	Config,
};
use domain::{CompositePublisher, Event, EventPublisher, Publisher};
use infrastructure::event_bus::EXCHANGE_NAME;
use presentation::http;
use rocket::local::asynchronous::Client;
use rstest::fixture;
use testcontainers::clients::Cli;
use testing::context::{amqp, coinmarketcap, database, github};
use tokio::task::JoinHandle;
use tokio_cron_scheduler::Job;

pub mod environment;
pub mod indexer;
pub mod simple_storage;
pub mod utils;
pub mod web3;

pub const API_KEY: &str = "test-api-key";

#[fixture]
#[once]
pub fn docker() -> Cli {
	Cli::docker()
}

pub struct Context<'a> {
	pub event_publisher: Arc<dyn Publisher<Event>>,
	_event_listeners: Vec<JoinHandle<()>>,
	pub http_client: Client,
	pub quotes_syncer: Job,
	pub database: database::Context<'a>,
	pub amqp: amqp::Context<'a>,
	pub simple_storage: simple_storage::Context<'a>,
	pub dusty_bot_github: github::Context<'a>,
	pub github: github::Context<'a>,
	pub indexer: indexer::Context<'a>,
	pub web3: web3::Context<'a>,
	pub coinmarketcap: coinmarketcap::Context<'a>,
	_environment: environment::Context,
}

impl<'a> Context<'a> {
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		tracing_subscriber::fmt::init();

		let environment = environment::Context::new();

		let database = database::Context::new(docker)?;
		let amqp = amqp::Context::new(docker, vec![], vec![EXCHANGE_NAME]).await?;
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
		let web3 = web3::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/infura",
				env::current_dir().unwrap().display(),
			),
		)?;

		let indexer = indexer::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/indexer",
				env::current_dir().unwrap().display(),
			),
		)?;

		let coinmarketcap = coinmarketcap::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/coinmarketcap",
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
			web3: web3.config.clone(),
			s3: simple_storage.config.clone(),
			github_api_client: github.config.clone(),
			dusty_bot_api_client: dusty_bot_github.config.clone(),
			indexer_client: indexer.config.clone(),
			coinmarketcap: coinmarketcap.config.clone(),
		};

		let event_listeners = api::presentation::event_listeners::spawn_all(config.clone()).await?;

		let event_publisher = CompositePublisher::new(vec![
			Arc::new(EventPublisher::new(
				projectors::event_store::Projector::new(database.client.clone()),
			)),
			Arc::new(EventPublisher::new(projections::Projector::new(
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
				database.client.clone(),
			))),
		]);

		Ok(Self {
			http_client: Client::tracked(api::presentation::http::bootstrap(config.clone()).await?)
				.await?,
			database,
			amqp,
			simple_storage,
			dusty_bot_github,
			github,
			indexer,
			web3,
			coinmarketcap,
			quotes_syncer: api::presentation::cron::quotes_syncer::bootstrap(config.clone())
				.await?,
			event_publisher: Arc::new(event_publisher),
			_event_listeners: event_listeners,
			_environment: environment,
		})
	}
}

impl<'a> Drop for Context<'a> {
	fn drop(&mut self) {
		self._event_listeners.iter().for_each(JoinHandle::abort);
	}
}
