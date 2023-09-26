use anyhow::Result;
use rocket::{Build, Rocket};

use crate::Config;

pub mod cron;
pub mod http;

pub async fn bootstrap(config: Config) -> Result<(Rocket<Build>, cron::Scheduler)> {
	Ok((
		http::bootstrap(config.clone()).await?,
		cron::bootstrap(config)?,
	))
}
