use anyhow::{Context, Error, Result};
use api::{presentation::*, Config};
use domain::LogErr;
use dotenv::dotenv;
use infrastructure::{config, tracing::Tracer};
use olog::{error, info, IntoField};

#[tokio::main]
async fn main() -> Result<()> {
	async {
		dotenv().ok();
		let config: Config = config::load("api/app.yaml").context("Configuration load")?;

		let _tracer =
			Tracer::init(config.tracer.clone(), "api").context("Tracer initialization")?;

		cron::bootstrap(config.clone()).await?.start().await?;

		let _ = http::bootstrap(config.clone()).await?.launch().await?;

		info!("👋 Gracefully shut down");

		Ok(())
	}
	.await
	.log_err(|e: &Error| error!(error = e.to_field(), "Error"))
}
