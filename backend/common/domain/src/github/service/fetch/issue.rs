use async_trait::async_trait;

use super::Result;
use crate::{GithubIssue, GithubIssueNumber, GithubRepositoryId, GithubServiceFilters};

#[async_trait]
pub trait Service: Send + Sync {
	async fn issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> Result<GithubIssue>;

	async fn issue_by_repo_id(
		&self,
		repo_id: &GithubRepositoryId,
		issue_number: &GithubIssueNumber,
	) -> Result<GithubIssue>;

	async fn pulls_by_repo_id(
		&self,
		repo_id: &GithubRepositoryId,
		filters: &GithubServiceFilters,
	) -> Result<Vec<GithubIssue>>;
}
