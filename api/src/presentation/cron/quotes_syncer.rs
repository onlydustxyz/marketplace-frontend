use std::{
	sync::Arc,
	time::{Duration, Instant},
};

use anyhow::Result;
use domain::currencies;
use infrastructure::{coinmarketcap, database};
use olog::{error, info, IntoField};

use crate::{application::quotes::sync::Usecase, Config};

pub fn bootstrap(config: Config) -> Result<Cron> {
	info!("Bootstrapping quotes_syncer");

	let database = Arc::new(database::Client::new(database::init_pool(
		config.database.clone(),
	)?));

	let coinmarketcap = Arc::new(coinmarketcap::Client::new(
		config.coinmarketcap,
		currencies::USD,
	));

	Ok(Cron {
		usecase: Usecase::new(database, coinmarketcap),
	})
}

pub struct Cron {
	usecase: Usecase,
}

impl Cron {
	pub async fn run_once(&self) {
		let start = Instant::now();
		match self.usecase.sync_quotes().await {
			Ok(count) => info!(
				duration = start.elapsed().as_secs(),
				count = count,
				"💸 Crypto currencies prices synced"
			),
			Err(error) => error!(
				error = error.to_field(),
				"Failed while syncing crypto currencies prices"
			),
		}
	}

	pub async fn run(&self) {
		loop {
			self.run_once().await;
			tokio::time::sleep(sleep_duration()).await;
		}
	}
}

fn sleep_duration() -> Duration {
	let secs = std::env::var("QUOTES_SYNCER_SLEEP_DURATION")
		.ok()
		.and_then(|secs| secs.parse().ok())
		.unwrap_or(60);
	Duration::from_secs(secs)
}
