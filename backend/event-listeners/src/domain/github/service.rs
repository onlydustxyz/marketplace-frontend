use anyhow::Result;
use async_trait::async_trait;
use domain::{GithubIssueNumber, GithubServiceError};

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_comment(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
		comment: &str,
	) -> Result<(), GithubServiceError>;
}
