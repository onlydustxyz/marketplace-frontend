use std::{env, ffi::OsString};

use anyhow::Result;
use envtestkit::{set_env, EnvironmentTestGuard};
use event_listeners::{github_indexer, Config};
use rstest::fixture;
use testcontainers::clients::Cli;
use testing::context::{amqp, database, github};
use tokio::task::JoinHandle;

#[fixture]
#[once]
pub fn docker() -> Cli {
	Cli::docker()
}

pub struct Context<'a> {
	pub database: database::Context<'a>,
	pub amqp: amqp::Context<'a>,
	_github: github::Context<'a>,
	_guards: Vec<EnvironmentTestGuard>,
	_process: JoinHandle<anyhow::Result<()>>,
}

impl<'a> Context<'a> {
	#[allow(unused)]
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		tracing_subscriber::fmt::init();

		let database = database::Context::new(docker)?;
		let amqp = amqp::Context::new(
			docker,
			vec![],
			vec![event_listeners::GITHUB_EVENTS_EXCHANGE],
		)
		.await?;

		let github = github::Context::new(
			docker,
			format!(
				"{}/tests/resources/wiremock/github",
				env::current_dir().unwrap().display(),
			),
			"github-indexer-github-pat".to_string(),
		)?;

		let config = Config {
			amqp: amqp.config.clone(),
			database: database.config.clone(),
			tracer: infrastructure::tracing::Config {
				ansi: false,
				json: true,
				location: true,
			},
			github: github.config.clone(),
		};

		let _guards = vec![set_env(
			OsString::from("GITHUB_EVENTS_INDEXER_SLEEP_DURATION"),
			"1",
		)];

		Ok(Self {
			database,
			amqp,
			_github: github,
			_guards,
			_process: tokio::spawn(github_indexer::bootstrap(config)),
		})
	}
}

impl<'a> Drop for Context<'a> {
	fn drop(&mut self) {
		self._process.abort();
	}
}
