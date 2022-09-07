use crate::{GithubIssue, GithubIssueNumber, GithubProjectId, GithubRepo};
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happened at infrastructure level")]
	Infrastructure(anyhow::Error),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait GithubClient: Send + Sync {
	async fn find_issue_by_id(
		&self,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
	) -> Result<Option<GithubIssue>, Error>;

	async fn find_repository_by_id(
		&self,
		project_id: &GithubProjectId,
	) -> Result<GithubRepo, Error>;
}
