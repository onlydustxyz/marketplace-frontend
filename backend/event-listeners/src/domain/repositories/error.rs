use anyhow::anyhow;
use domain::SubscriberCallbackError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
	#[error("Internal error")]
	Other(#[from] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for SubscriberCallbackError {
	fn from(error: Error) -> Self {
		Self::Fatal(anyhow!(error))
	}
}
