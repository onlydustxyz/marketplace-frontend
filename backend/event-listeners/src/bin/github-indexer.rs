use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{github_indexer, Config};
use futures::future::try_join_all;
use infrastructure::{config, tracing::Tracer};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.clone().tracer, "github")?;

	try_join_all(github_indexer::bootstrap(config).await?).await?;

	Ok(())
}
