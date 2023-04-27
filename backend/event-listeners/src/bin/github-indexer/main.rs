use std::{sync::Arc, time::Duration};

use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{infrastructure::database::GithubRepoIndexRepository, Config};
use indexer::{logged::Logged, published::Published, with_state::WithState};
use infrastructure::{amqp, config, database, github, tracing::Tracer};
use olog::info;

mod indexer;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "github")?;
	let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	let event_bus = Arc::new(amqp::Bus::new(config.amqp()).await?);

	let indexer = indexer::composite::Indexer::new(vec![
		Arc::new(indexer::repo::Indexer::new(github.clone())),
		Arc::new(indexer::pulls::Indexer::new(github.clone())),
		Arc::new(indexer::issues::Indexer::new(github.clone())),
	])
	.logged()
	.published(event_bus)
	.with_state(GithubRepoIndexRepository::new(database));

	loop {
		info!("🎶 Still alive 🎶");
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
