use crate::aggregate_root;
use thiserror::Error;

mod aggregate_exists;
pub use aggregate_exists::ProjectExists;

#[cfg(test)]
pub use aggregate_exists::MockProjectExists;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}
