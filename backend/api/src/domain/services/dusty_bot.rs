use anyhow::Result;
use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueNumber, GithubRepoId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_issue(
		&self,
		repo_id: GithubRepoId,
		repo_owner: String,
		repo_name: String,
		title: String,
		description: String,
	) -> Result<GithubIssue>;

	async fn close_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue: GithubIssue,
	) -> Result<()>;

	async fn close_issue_for_number(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_id: GithubIssueNumber,
	) -> Result<()>;


}
