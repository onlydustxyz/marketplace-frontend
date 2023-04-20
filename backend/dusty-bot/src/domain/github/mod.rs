use async_trait::async_trait;
use domain::{
	GithubIssue, GithubIssueNumber, GithubRepositoryId, GithubService, GithubServiceResult,
};

#[async_trait]
pub trait Service: GithubService + Send + Sync {
	async fn create_issue(
		&self,
		repo_id: &GithubRepositoryId,
		title: &str,
		description: &str,
	) -> GithubServiceResult<GithubIssue>;

	async fn create_comment(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
		comment: &str,
	) -> GithubServiceResult<()>;

	async fn close_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<()>;
}
