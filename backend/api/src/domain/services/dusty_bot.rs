use anyhow::Result;
use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueNumber, GithubRepoId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_issue(
		&self,
		repo_id: GithubRepoId,
		title: String,
		description: String,
	) -> Result<GithubIssue>;
}

#[async_trait]
pub trait AsyncService: Send + Sync {
	async fn close_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> Result<()>;
}
