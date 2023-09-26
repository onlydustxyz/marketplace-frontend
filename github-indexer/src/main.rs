use anyhow::{Context, Result};
use dotenv::dotenv;
use github_indexer::{presentation::bootstrap, Config};
use infrastructure::{config, tracing::Tracer};
use olog::info;
use tokio::join;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("github-indexer/app.yaml")?;
	let _tracer = Tracer::init(config.tracer.clone(), "github-indexer")?;

	let (http_server, cron) = bootstrap(config).await.context("App bootstrap")?;

	let (http_server, cron) = join!(http_server.launch(), cron.run());

	let _ = http_server.context("http server")?;
	cron.context("cron")?;

	info!("👋 Gracefully shut down");

	Ok(())
}
