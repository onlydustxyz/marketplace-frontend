use anyhow::Result;

use crate::Config;
pub mod quotes_syncer;

pub fn bootstrap(config: Config) -> Result<quotes_syncer::Cron> {
	quotes_syncer::bootstrap(config)
}
