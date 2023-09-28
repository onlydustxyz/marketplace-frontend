use anyhow::Result;
use tokio_cron_scheduler::JobScheduler;

use crate::{presentation::event_listeners, Config};

pub mod quotes_syncer;

pub async fn bootstrap(config: Config) -> Result<JobScheduler> {
	let scheduler = JobScheduler::new().await?;
	scheduler.add(quotes_syncer::bootstrap(config.clone()).await?).await?;
	scheduler.add(event_listeners::bootstrap(config.clone()).await?).await?;
	Ok(scheduler)
}
