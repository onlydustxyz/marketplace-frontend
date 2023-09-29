pub mod issue;
pub mod pull_request;
pub mod repo;
pub mod social_accounts;
pub mod user;

use thiserror::Error;
#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

#[async_trait]
pub trait Port: issue::Port + pull_request::Port + repo::Port + user::Port + Send + Sync {}
