use diesel::result::Error as DieselError;
use domain::{DomainError, SubscriberCallbackError};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Connection(anyhow::Error),
	#[error(transparent)]
	Migration(anyhow::Error),
	#[error(transparent)]
	Transaction(#[from] DieselError),
	#[error(transparent)]
	Pool(#[from] r2d2::Error),
}

impl From<Error> for SubscriberCallbackError {
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
	fn from(database_error: Error) -> Self {
		match database_error {
			Error::Connection(e) => Self::InternalError(e),
			Error::Migration(e) => Self::InternalError(e),
			Error::Transaction(e) => Self::InvalidInputs(e.into()),
			Error::Pool(e) => Self::InternalError(e.into()),
		}
	}
}
