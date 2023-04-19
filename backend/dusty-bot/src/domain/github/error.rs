use domain::GithubServiceError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	GithubService(#[from] GithubServiceError),
	#[error("Internal error")]
	Internal(#[source] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;
