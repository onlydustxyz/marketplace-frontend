use thiserror::Error;

use crate::domain::GithubServiceError;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Invalid GraphQL request")]
	InvalidRequest(#[source] anyhow::Error),
	#[error("Something went wrong on our side")]
	InternalError(#[source] anyhow::Error),
}

impl From<GithubServiceError> for Error {
	fn from(error: GithubServiceError) -> Self {
		match &error {
			GithubServiceError::MissingField(_) => Error::InternalError(error.into()),
			GithubServiceError::NotFound(_) => Error::InvalidRequest(error.into()),
			GithubServiceError::Other(_) => Error::InternalError(error.into()),
		}
	}
}
