use diesel::result::Error as DieselError;
use domain::{DomainError, SubscriberCallbackError};

/// Custom error type for database operations
#[derive(Debug, Error)]
pub enum Error {
	/// Error occurred while establishing database connection
	#[error(transparent)]
	Connection(anyhow::Error),

	/// Error occurred while applying database migrations
	#[error(transparent)]
	Migration(anyhow::Error),

	/// Error occurred while performing database transaction
	#[error(transparent)]
	Transaction(#[from] DieselError),

	/// Error occurred while managing connection pool
	#[error(transparent)]
	Pool(#[from] r2d2::Error),
}

impl From<Error> for SubscriberCallbackError {
	/// Converts `Error` to `SubscriberCallbackError`
	fn from(error: Error) -> Self {
		match error {
			Error::Connection(e) => Self::Fatal(e),
			Error::Migration(e) => Self::Fatal(e),
			Error::Transaction(e) => Self::Discard(e.into()),
			Error::Pool(e) => Self::Fatal(e.into()),
		}
	}
}

impl From<Error> for DomainError {
	/// Converts `Error` to `DomainError`
	fn from(database_error: Error) -> Self {
		match database_error {
			Error::Connection(e) => Self::InternalError(e),
			Error::Migration(e) => Self::InternalError(e),
			Error::Transaction(e) => Self::InvalidInputs(e.into()),
			Error::Pool(e) => Self::InternalError(e.into()),
		}
	}
}