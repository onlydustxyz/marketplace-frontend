use domain::{GithubServiceError, PublisherError};
use infrastructure::database::DatabaseError;
use olog::warn;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Internal Error")]
	Database(#[from] DatabaseError),
	#[error(transparent)]
	GithubService(#[from] GithubServiceError),
	#[error("Internal Error")]
	Publisher(#[from] PublisherError),
	#[error("Internal Error")]
	Serialization(#[from] serde_json::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

pub trait IgnoreErrors {
	fn ignore_non_fatal_errors(self) -> Self;
}

impl<T: Default> IgnoreErrors for std::result::Result<T, GithubServiceError> {
	fn ignore_non_fatal_errors(self) -> Self {
		if let Err(error) = self {
			return match error {
				domain::GithubServiceError::NotFound(_)
				| domain::GithubServiceError::InvalidInput(_)
				| domain::GithubServiceError::MissingField(_) => {
					warn!(error = error.to_string(), "This error was ignored");
					Ok(T::default())
				},
				domain::GithubServiceError::Other(_) => Err(error),
			};
		}
		self
	}
}
