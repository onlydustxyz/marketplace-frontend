use async_trait::async_trait;

use super::Result;
use crate::{GithubIssue, GithubIssueNumber, GithubRepoId, GithubServiceIssueFilters};

#[async_trait]
pub trait Service: Send + Sync {
	async fn issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> Result<GithubIssue>;

	async fn issue_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		issue_number: GithubIssueNumber,
	) -> Result<GithubIssue>;

	async fn issues_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		filters: GithubServiceIssueFilters,
	) -> Result<Vec<GithubIssue>>;
}
