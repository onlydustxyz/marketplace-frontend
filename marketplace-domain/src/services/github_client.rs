use crate::{
	GithubIssue, GithubIssueNumber, GithubProjectId, GithubRepo, GithubUser, GithubUserId,
};
use async_trait::async_trait;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}

#[automock]
#[async_trait]
pub trait GithubClient: Send + Sync {
	async fn find_issue_by_id(
		&self,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
	) -> Result<GithubIssue, Error>;

	async fn find_repository_by_id(&self, project_id: GithubProjectId)
	-> Result<GithubRepo, Error>;

	async fn find_user_by_id(&self, user_id: GithubUserId) -> Result<GithubUser, Error>;

	async fn authenticate_user(&self, authorization_code: String) -> Result<GithubUserId, Error>;
}
