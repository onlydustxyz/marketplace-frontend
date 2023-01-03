use thiserror::Error;

use crate::domain::{GithubRepository, GithubUser};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error("No owner for repository")]
	MissingRepositoryOwner(#[source] anyhow::Error),
	#[error("Internal error")]
	Other(#[source] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository>;
	async fn fetch_user_by_name(&self, username: &str) -> Result<GithubUser>;
}
