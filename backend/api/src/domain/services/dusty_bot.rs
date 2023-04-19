use anyhow::Result;
use async_trait::async_trait;
use domain::{GithubIssue, GithubRepositoryId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_issue(
		&self,
		repo_id: &GithubRepositoryId,
		title: &str,
		description: &str,
	) -> Result<GithubIssue>;
}
