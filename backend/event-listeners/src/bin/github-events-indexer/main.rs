use std::{sync::Arc, time::Duration};

use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{infrastructure::database::GithubRepoIndexRepository, Config};
use indexer::Indexer;
use infrastructure::{amqp, config, database, github, tracing::Tracer};

mod indexer;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config =
		config::load("backend/event-listeners/src/bin/github-events-indexer/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "github")?;
	let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	let event_bus = Arc::new(amqp::Bus::new(config.amqp()).await?);

	let indexer = Indexer::new(github, GithubRepoIndexRepository::new(database), event_bus);

	loop {
		indexer.index_all().await?;
		sleep().await;
	}
}

async fn sleep() {
	let seconds = std::env::var("GITHUB_EVENTS_INDEXER_SLEEP_DURATION")
		.unwrap_or_default()
		.parse()
		.unwrap_or(60);

	tokio::time::sleep(Duration::from_secs(seconds)).await;
}
