use async_trait::async_trait;
use domain::{GithubIssueNumber, GithubServiceResult};

#[async_trait]
pub trait Service: Send + Sync {
	async fn get_latest_own_comment_on_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<Option<String>>;
}
