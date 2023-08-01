use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueNumber, GithubRepoId, GithubService, GithubServiceResult};

#[async_trait]
pub trait Service: GithubService + Send + Sync {
	async fn create_issue(
		&self,
		repo_id: GithubRepoId,
		title: String,
		description: String,
	) -> GithubServiceResult<GithubIssue>;

	async fn close_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> GithubServiceResult<()>;
}
