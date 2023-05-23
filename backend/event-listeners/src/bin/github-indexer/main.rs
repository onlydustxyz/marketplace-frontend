/// This binary is an implementation of a GitHub Events Indexer. The purpose of this
/// indexer is to listen to the events of Github and keep the indexing table up-to-date
///
/// The indexer listens to the following events:
/// - RepositoryEvent
/// - IssuesEvent
/// - UserEvent
///
/// To use this indexer, set the path to your `app.yaml` file as an environment
/// variable, `APP_CONFIG_PATH`. The configuration file should contain the following
/// parameters:
///
/// ```yaml
/// amqp:
///   host: "localhost"
///   username: "guest"
///   password: "guest"
///
/// database:
///   url: "postgresql://postgres:postgres@localhost:5432/github_events_indexer?sslmode=disable"
///
/// tracer:
///   jaeger_agent_host: "localhost:6831"
///
/// github:
///   - http:
///       - "https://api.github.com"
///     authentication:
///       - token: "put your token here"
/// ```
///
/// The indexer is composed by an index for repository, issues and user, and executes
/// periodically until stopped. It waits for seconds equal to the `GITHUB_EVENTS_INDEXER_SLEEP_DURATION`
/// environment variable, defaulting to 60 seconds if not available.
///
/// The Github rate limit is also checked before each update. If the remaining requests is greater
/// than the number set in `GITHUB_RATE_LIMIT_GUARD` environment variable, defaulting to 1000 requests,
/// it will proceed with the indexing process.
///
/// # Example
///
/// ```no_run
/// use anyhow::Result;
///
/// #[tokio::main]
/// async fn main() -> Result<()> {
///     github_events_indexer::main().await
/// }
/// ```
use std::{sync::Arc, time::Duration};

use anyhow::Result;
use domain::{GithubRepoId, GithubUserId, LogErr};
use dotenv::dotenv;
use event_listeners::{
    domain::{GithubEvent, Indexable, Indexer, IndexerRepository},
    Config,
};
use indexer::{
    composite::Arced,
    guarded::Guarded,
    logged::Logged,
    published::Published,
    with_state::WithState,
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
        indexer::user::Indexer::new(github.clone(), database.clone())
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

/// Index all of the items in the given repository, using the given indexer.
/// This function returns a list of the events that were processed.
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

/// Sleep for the duration specified in the `GITHUB_EVENTS_INDEXER_SLEEP_DURATION`
/// environment variable, defaulting to 60 seconds.
async fn sleep() {
    let seconds = std::env::var("GITHUB_EVENTS_INDEXER_SLEEP_DURATION")
        .unwrap_or_default()
        .parse()
        .unwrap_or(60);

    tokio::time::sleep(Duration::from_secs(seconds)).await;
}

/// check_github_rate_limit checks the remaining requests left in the Github rate limit,
/// and returns true if it is safe to continue indexing.
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