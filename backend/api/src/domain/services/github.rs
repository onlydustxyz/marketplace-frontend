use async_trait::async_trait;
use domain::{GithubIssue, GithubServiceResult};

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
	) -> GithubServiceResult<GithubIssue>;
}
