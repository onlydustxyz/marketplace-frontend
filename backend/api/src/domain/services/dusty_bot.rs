use anyhow::Result;
use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueNumber, GithubRepoId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_issue(
		&self,
		repo_id: &GithubRepoId,
		title: &str,
		description: &str,
	) -> Result<GithubIssue>;
}

#[async_trait]
pub trait AsyncService: Send + Sync {
	async fn close_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> Result<()>;
}
