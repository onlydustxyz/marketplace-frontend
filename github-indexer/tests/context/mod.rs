use std::env;

use anyhow::Result;
use github_indexer::{
	presentation::{bootstrap, cron::Scheduler},
	Config,
};
use presentation::http;
use rocket::local::asynchronous::Client;
use rstest::fixture;
use testcontainers::clients::Cli;
use testing::context::{database, github};

#[fixture]
#[once]
pub fn docker() -> Cli {
	Cli::docker()
}

pub const API_KEY: &str = "test-api-key";

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
			..Default::default()
		};

		let (http_server, cron) = bootstrap(config.clone()).await?;

		Ok(Self {
			http_client: Client::tracked(http_server).await?,
			database,
			indexing_scheduler: cron,
			github,
		})
	}
}
