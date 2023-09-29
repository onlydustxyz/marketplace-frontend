pub mod issue;
mod port;
pub use port::GithubApiPort;
pub mod pull_request;
pub mod repo;
pub mod user;

use thiserror::Error;
#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error(transparent)]
	InvalidInput(anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;
