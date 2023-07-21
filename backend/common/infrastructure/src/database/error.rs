use diesel::result::Error as DieselError;
use domain::{DomainError, SubscriberCallbackError};
use thiserror::Error;

use crate::contextualized_error::ContextualizedError;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Connection(anyhow::Error),
	#[error(transparent)]
	Migration(anyhow::Error),
	#[error(transparent)]
	Transaction(#[from] ContextualizedError<DieselError>),
	#[error(transparent)]
	Pool(anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for SubscriberCallbackError {
	fn from(error: Error) -> Self {
		match error {
			Error::Connection(e) => Self::Fatal(e),
			Error::Migration(e) => Self::Fatal(e),
			Error::Transaction(e) => Self::Discard(e.into()),
			Error::Pool(e) => Self::Fatal(e),
		}
	}
}

impl From<Error> for DomainError {
	fn from(database_error: Error) -> Self {
		match database_error {
			Error::Connection(e) => Self::InternalError(e),
			Error::Migration(e) => Self::InternalError(e),
			Error::Transaction(e) => Self::InvalidInputs(e.into()),
			Error::Pool(e) => Self::InternalError(e),
		}
	}
}
