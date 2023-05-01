use async_trait::async_trait;

use super::Result;
use crate::{GithubIssue, GithubIssueNumber, GithubRepoId, GithubServiceFilters};

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
		repo_id: &GithubRepoId,
		issue_number: &GithubIssueNumber,
	) -> Result<GithubIssue>;

	async fn issues_by_repo_id(
		&self,
		repo_id: &GithubRepoId,
		filters: &GithubServiceFilters,
	) -> Result<Vec<GithubIssue>>;
}
