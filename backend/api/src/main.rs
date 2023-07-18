use anyhow::Result;
use api::{presentation::bootstrap::bootstrap, Config};
use dotenv::dotenv;
use infrastructure::{config, tracing::Tracer};
use olog::info;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer.clone(), "api")?;

	let _ = bootstrap(config).await?.launch().await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
