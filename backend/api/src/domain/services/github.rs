use async_trait::async_trait;
use domain::{GithubIssue, GithubRepositoryId};
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

	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
	) -> Result<GithubIssue, Error>;
}
