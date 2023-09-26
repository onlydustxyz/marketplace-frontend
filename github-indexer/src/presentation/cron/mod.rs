mod scheduler;

use anyhow::Result;
pub use scheduler::Scheduler;

use crate::Config;

pub fn bootstrap(config: Config) -> Result<Scheduler> {
	Scheduler::new(config)
}
