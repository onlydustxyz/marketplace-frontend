use std::time::{Duration, Instant};

use anyhow::Result;
use api::{application::quotes::sync::Usecase, Config};
use dotenv::dotenv;
use infrastructure::{config, tracing::Tracer};
use olog::{error, info, IntoField};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("api/src/bin/quotes_syncer/app.yaml")?;
	let _tracer = Tracer::init(config.tracer.clone(), "quotes_syncer")?;

	let usecase = Usecase::bootstrap(config)?;

	loop {
		let start = Instant::now();
		match usecase.sync_quotes().await {
			Ok(count) => info!(
				duration = start.elapsed().as_secs(),
				count = count,
				"💸 Crypto currencies prices sycned"
			),
			Err(error) => error!(
				error = error.to_field(),
				"Failed while syncing crypto currencies prices"
			),
		}
		tokio::time::sleep(sleep_duration()).await;
	}
}

fn sleep_duration() -> Duration {
	let secs = std::env::var("QUOTES_SYNCER_SLEEP_DURATION")
		.ok()
		.and_then(|secs| secs.parse().ok())
		.unwrap_or(60);
	Duration::from_secs(secs)
}
