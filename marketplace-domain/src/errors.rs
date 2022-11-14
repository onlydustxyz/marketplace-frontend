use super::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contribution repository error")]
	ContributionRepository(#[from] AggregateRootRepositoryError),
	#[error("Failed to take control of a lock")]
	Lock,
	#[error("Event store error")]
	EventStoreError(#[from] EventStoreError),
	#[error(transparent)]
	Publisher(#[from] PublisherError),
	#[error(transparent)]
	ContributorError(#[from] ContributorError),
}
