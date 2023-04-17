use std::sync::Arc;

use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{infrastructure::database::GithubRepoIndexRepository, Config};
use indexer::Indexer;
use infrastructure::{amqp, config, database, github, tracing::Tracer};

mod indexer;

const GITHUB_EVENTS_EXCHANGE: &str = "github-events";

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-listeners/src/bin/github/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "github")?;
	let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	let event_bus = Arc::new(amqp::Bus::new(config.amqp()).await?);

	Indexer::new(github, GithubRepoIndexRepository::new(database), event_bus)
		.index_all()
		.await?;

	Ok(())
}
