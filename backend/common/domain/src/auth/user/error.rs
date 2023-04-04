use anyhow::anyhow;
use thiserror::Error;

use crate::SubscriberCallbackError;

#[derive(Debug, Error)]
pub enum Error {
	#[error("User not found")]
	NotFound,
	#[error(transparent)]
	Other(#[from] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for SubscriberCallbackError {
	fn from(error: Error) -> Self {
		match error {
			Error::NotFound => Self::Discard(anyhow!(error)),
			Error::Other(_) => Self::Fatal(anyhow!(error)),
		}
	}
}
