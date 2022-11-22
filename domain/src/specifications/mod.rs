use crate::aggregate_root;
use thiserror::Error;

mod project_exists;
pub use project_exists::Specification as ProjectExistsSpecification;

#[cfg(test)]
pub use project_exists::MockSpecification as MockProjectExistsSpecification;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}
