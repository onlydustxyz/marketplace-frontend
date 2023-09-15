use std::env;

use anyhow::Result;
use event_listeners::{github_indexer::Scheduler, presentation::bootstrap, Config};
use presentation::http;
use rocket::local::asynchronous::Client;
use testcontainers::clients::Cli;
use testing::context::{database, github};

use super::API_KEY;

pub struct Context<'a> {
	pub http_client: Client,
	pub database: database::Context<'a>,
	pub indexing_scheduler: Scheduler,
	pub github: github::Context<'a>,
}

impl<'a> Context<'a> {
	#[allow(unused)]
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		tracing_subscriber::fmt::init();

		let database = database::Context::new(docker)?;

		let github = github::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/github",
				env::current_dir().unwrap().display(),
			),
			"github-indexer-github-pat".to_string(),
		)?;

		let config = Config {
			amqp: Default::default(),
			http: http::Config {
				api_keys: vec![API_KEY.to_string()],
			},
			database: database.config.clone(),
			tracer: infrastructure::tracing::Config {
				ansi: false,
				json: true,
				location: true,
			},
			github: github.config.clone(),
		};

		Ok(Self {
			http_client: Client::tracked(bootstrap(config.clone()).await?).await?,
			database,
			indexing_scheduler: Scheduler::new(config).expect("Failed to init indexing scheduler"),
			github,
		})
	}
}
