use std::{sync::Arc, time::Duration};

use anyhow::Result;
use domain::{GithubRepoId, GithubUserId, LogErr};
use dotenv::dotenv;
use event_listeners::{
	domain::{GithubEvent, IndexerRepository},
	Config,
};
use indexer::{
	composite::Arced, guarded::Guarded, logged::Logged, published::Published,
	with_state::WithState, Indexable, Indexer,
};
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

	let repo_indexer = indexer::composite::Indexer::new(vec![
		indexer::repo::Indexer::new(github.clone(), database.clone())
			.logged()
			.published(event_bus.clone())
			.with_state()
			.arced(),
		indexer::issues::Indexer::new(github.clone(), database.clone())
			.logged()
			.published(event_bus.clone())
			.with_state()
			.arced(),
		indexer::contributors::Indexer::new(github.clone(), database.clone())
			.logged()
			.published(event_bus.clone())
			.with_state()
			.arced(),
	])
	.guarded(|| check_github_rate_limit(github.clone()));

	let user_indexer = indexer::user::Indexer::new(github.clone(), database.clone())
		.logged()
		.published(event_bus.clone())
		.with_state()
		.guarded(|| check_github_rate_limit(github.clone()));

	loop {
		info!("🎶 Still alive 🎶");
		index_all::<GithubRepoId>(&repo_indexer, database.clone()).await?;
		index_all::<GithubUserId>(&user_indexer, database.clone()).await?;
		sleep().await;
	}
}

async fn index_all<Id: Indexable>(
	indexer: &dyn Indexer<Id>,
	repository: Arc<dyn IndexerRepository<Id>>,
) -> Result<Vec<GithubEvent>> {
	let mut events = vec![];

	for id in repository.list_items_to_index()? {
		events.extend(indexer.index(id).await?);
	}

	Ok(events)
}

async fn sleep() {
	let seconds = std::env::var("GITHUB_EVENTS_INDEXER_SLEEP_DURATION")
		.unwrap_or_default()
		.parse()
		.unwrap_or(60);

	tokio::time::sleep(Duration::from_secs(seconds)).await;
}

async fn check_github_rate_limit(github: Arc<github::Client>) -> bool {
	let guard = std::env::var("GITHUB_RATE_LIMIT_GUARD")
		.unwrap_or_default()
		.parse()
		.unwrap_or(1000);

	let remaining = github
		.octocrab()
		.ratelimit()
		.get()
		.await
		.log_err("Failed while checking github rate limit")
		.map(|rate_limit| rate_limit.rate.remaining)
		.unwrap_or_default();

	remaining > guard
}
