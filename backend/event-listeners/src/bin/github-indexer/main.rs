use std::{sync::Arc, time::Duration};

use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{
	domain::{GithubEvent, Indexer},
	infrastructure::database::{GithubRepoIndexRepository, GithubUserIndexRepository},
	Config,
};
use indexer::{guarded::Guarded, logged::Logged, published::Published};
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

	let repo_index_repository = GithubRepoIndexRepository::new(database.clone());

	let indexer = indexer::composite::Indexer::new(vec![
		Arc::new(indexer::repo::Indexer::new(github.clone())),
		Arc::new(indexer::issues::Indexer::new(github.clone())),
		Arc::new(indexer::contributors::Indexer::new(
			github.clone(),
			GithubUserIndexRepository::new(database.clone()),
		)),
	])
	.logged()
	.published(event_bus, throttle_duration())
	.guarded(|| check_github_rate_limit(github.clone()));

	loop {
		info!("🎶 Still alive 🎶");
		index_all(&indexer, &repo_index_repository).await?;
		sleep().await;
	}
}

async fn index_all(
	indexer: &dyn Indexer,
	github_repo_index_repository: &GithubRepoIndexRepository,
) -> Result<Vec<GithubEvent>> {
	let mut events = vec![];

	for repo_index in github_repo_index_repository.list()? {
		events.extend(indexer.index(*repo_index.repo_id()).await?);
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

fn throttle_duration() -> Duration {
	let ms = std::env::var("GITHUB_EVENTS_INDEXER_THROTTLE")
		.unwrap_or_default()
		.parse()
		.unwrap_or(1);

	Duration::from_millis(ms)
}

async fn check_github_rate_limit(github: Arc<github::Client>) -> bool {
	let guard = std::env::var("GITHUB_RATE_LIMIT_GUARD")
		.unwrap_or_default()
		.parse()
		.unwrap_or(1000);

	match github.octocrab().ratelimit().get().await {
		Ok(rate_limit) => {
			olog::info!(
				github_rate_limit_remaining = rate_limit.rate.remaining,
				github_rate_limit_used = rate_limit.rate.used,
				github_rate_limit_reset = rate_limit.rate.reset,
				github_rate_limit_limit = rate_limit.rate.limit,
				"Github rate-limit status"
			);
			rate_limit.rate.remaining > guard
		},
		Err(error) => {
			olog::error!(
				error = error.to_string(),
				"Failed while checking github rate limit"
			);
			false
		},
	}
}
