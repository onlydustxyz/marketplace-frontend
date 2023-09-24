use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{github_indexer::Scheduler, Config};
use infrastructure::{config, tracing::Tracer};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.clone().tracer, "github")?;

	Scheduler::new(config)?.run().await
}
