use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{bootstrap, Config};
use futures::future::try_join_all;
use infrastructure::{config, tracing::Tracer};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.tracer.clone(), "event-queue-worker")?;

	try_join_all(bootstrap(config).await?).await?;

	Ok(())
}
