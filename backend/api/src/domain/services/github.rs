use anyhow::Result;
use async_trait::async_trait;
use domain::GithubRepositoryId;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

use crate::domain::GithubRepo;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error("No owner for repository")]
	MissingRepositoryOwner(#[source] anyhow::Error),
	#[error(transparent)]
	Other(anyhow::Error),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_repository_details(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<GithubRepo, Error>;
}
