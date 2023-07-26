use anyhow::{Context, Error, Result};
use api::{presentation::bootstrap::bootstrap, Config};
use domain::LogErr;
use dotenv::dotenv;
use infrastructure::{config, tracing::Tracer};
use olog::{error, info, IntoField};

#[tokio::main]
async fn main() -> Result<()> {
	async {
		dotenv().ok();
		let config: Config = config::load("backend/api/app.yaml").context("Configuragion load")?;

		let _tracer =
			Tracer::init(config.tracer.clone(), "api").context("Tracer initialization")?;

		let _ = bootstrap(config)
			.await
			.context("App bootstrap")?
			.launch()
			.await
			.context("App run")?;

		info!("👋 Gracefully shut down");

		Ok(())
	}
	.await
	.log_err(|e: &Error| error!(error = e.to_field(), "Error"))
}
