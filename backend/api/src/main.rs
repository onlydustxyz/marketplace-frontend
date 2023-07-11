use anyhow::Result;
use dotenv::dotenv;

use api::Config;
use api::presentation::bootstrap::bootstrap;
use infrastructure::config;
use infrastructure::tracing::Tracer;
use olog::info;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "api")?;

	let _ = bootstrap(config)
		.await?
		.launch()
		.await?;


	info!("👋 Gracefully shut down");
	Ok(())
}
