use diesel::result::Error as DieselError;
use domain::SubscriberCallbackError;
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
