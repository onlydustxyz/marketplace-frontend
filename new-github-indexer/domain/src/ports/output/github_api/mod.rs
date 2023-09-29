pub mod commits;
pub mod issue;
pub mod pull_request;
pub mod repo;
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
pub trait Port:
	issue::Port + pull_request::Port + repo::Port + user::Port + commits::Port + Send + Sync
{
}

impl<P> Port for P where
	P: issue::Port + pull_request::Port + repo::Port + user::Port + commits::Port + Send + Sync
{
}
