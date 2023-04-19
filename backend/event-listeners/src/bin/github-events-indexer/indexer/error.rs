use domain::{GithubServiceError, PublisherError};
use infrastructure::database::DatabaseError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Internal Error")]
	Database(#[from] DatabaseError),
	#[error(transparent)]
	GithubService(#[from] GithubServiceError),
	#[error("Internal Error")]
	Publisher(#[from] PublisherError),
}

pub type Result<T> = std::result::Result<T, Error>;
