use domain::{GithubServiceError, SubscriberCallbackError};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	GithubService(#[from] GithubServiceError),
	#[error("Internal error")]
	Internal(#[source] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

impl From<Error> for SubscriberCallbackError {
	fn from(error: Error) -> Self {
		match error {
			Error::GithubService(error) => match error {
				GithubServiceError::NotFound(_)
				| GithubServiceError::InvalidInput(_)
				| GithubServiceError::MissingField(_) => Self::Discard(error.into()),
				GithubServiceError::Other(_) => Self::Fatal(error.into()),
			},
			Error::Internal(_) => Self::Fatal(error.into()),
		}
	}
}
