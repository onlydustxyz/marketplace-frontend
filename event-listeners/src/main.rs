use anyhow::{Context, Result};
use dotenv::dotenv;
use event_listeners::{presentation::bootstrap, Config};
use infrastructure::{config, tracing::Tracer};
use olog::info;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.tracer.clone(), "event-queue-worker")?;

	let _ = bootstrap(config)
		.await
		.context("App bootstrap")?
		.launch()
		.await
		.context("App run")?;

	info!("👋 Gracefully shut down");

	Ok(())
}
