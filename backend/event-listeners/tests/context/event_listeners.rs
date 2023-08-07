use anyhow::Result;
use event_listeners::Config;
use testcontainers::clients::Cli;
use testing::context::{amqp, database, github};
use tokio::task::JoinHandle;

pub struct Context<'a> {
	_processes: Vec<JoinHandle<()>>,
	pub database: database::Context<'a>,
	pub amqp: amqp::Context<'a>,
}

impl<'a> Context<'a> {
	#[allow(unused)]
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		tracing_subscriber::fmt::init();

		let database = database::Context::new(docker)?;
		let amqp = amqp::Context::new(docker, vec![], vec![]).await?;

		let github = github::Context::new(docker)?;

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

		Ok(Self {
			database,
			amqp,
			_processes: event_listeners::bootstrap(config).await?,
		})
	}
}

impl<'a> Drop for Context<'a> {
	fn drop(&mut self) {
		self._processes.iter().for_each(JoinHandle::abort);
	}
}
