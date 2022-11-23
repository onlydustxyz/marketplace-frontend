use crate::aggregate_root;
use thiserror::Error;

mod aggregate_exists;
pub use aggregate_exists::Specification as ProjectExistsSpecification;

#[cfg(test)]
pub use aggregate_exists::MockSpecification as MockProjectExistsSpecification;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}
