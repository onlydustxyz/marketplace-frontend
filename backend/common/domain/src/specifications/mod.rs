use thiserror::Error;

use crate::*;

mod aggregate_exists;
#[cfg(test)]
pub use aggregate_exists::MockProjectExists;
pub use aggregate_exists::ProjectExists;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}
