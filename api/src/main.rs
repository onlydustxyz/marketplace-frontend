use anyhow::{Context, Error, Result};
use api::{presentation::bootstrap, Config};
use domain::LogErr;
use dotenv::dotenv;
use futures::future::try_join_all;
use infrastructure::{config, tracing::Tracer};
use olog::{error, info, IntoField};
use tokio::join;

#[tokio::main]
async fn main() -> Result<()> {
	async {
		dotenv().ok();
		let config: Config = config::load("api/app.yaml").context("Configuration load")?;

		let _tracer =
			Tracer::init(config.tracer.clone(), "api").context("Tracer initialization")?;

		let (http_server, event_listeners, cron) =
			bootstrap(config).await.context("App bootstrap")?;

		let (http_server, event_listeners, _) = join!(
			http_server.launch(),
			try_join_all(event_listeners),
			cron.run()
		);

		let _ = http_server.context("App run")?;
		event_listeners.context("event-listeners")?;

		info!("👋 Gracefully shut down");

		Ok(())
	}
	.await
	.log_err(|e: &Error| error!(error = e.to_field(), "Error"))
}
