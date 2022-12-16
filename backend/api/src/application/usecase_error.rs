use domain::{AggregateRootRepositoryError, PublisherError};
use infrastructure::database::DatabaseError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum UsecaseError {
	#[error(transparent)]
	InternalError(anyhow::Error),
	#[error(transparent)]
	InvalidInputs(anyhow::Error),
}

impl From<AggregateRootRepositoryError> for UsecaseError {
	fn from(aggregate_root_repository_error: AggregateRootRepositoryError) -> Self {
		match aggregate_root_repository_error {
			AggregateRootRepositoryError::NotFound =>
				Self::InvalidInputs(aggregate_root_repository_error.into()),
			AggregateRootRepositoryError::EventStoreError(e) => Self::InternalError(e.into()),
		}
	}
}

impl From<DatabaseError> for UsecaseError {
	fn from(database_error: DatabaseError) -> Self {
		match database_error {
			DatabaseError::Connection(e) => Self::InternalError(e),
			DatabaseError::Migration(e) => Self::InternalError(e),
			DatabaseError::Transaction(e) => Self::InvalidInputs(e.into()),
			DatabaseError::Pool(e) => Self::InternalError(e.into()),
		}
	}
}

impl From<PublisherError> for UsecaseError {
	fn from(publisher_error: PublisherError) -> Self {
		Self::InternalError(publisher_error.into())
	}
}
