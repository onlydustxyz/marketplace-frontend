use async_trait::async_trait;

use super::Result;
use crate::GithubIssue;

#[async_trait]
pub trait Service: Send + Sync {
	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
	) -> Result<GithubIssue>;
}
