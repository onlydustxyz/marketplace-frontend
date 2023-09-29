use super::Result;
use crate::models::{pulls::PullRequest, *};

#[async_trait]
pub trait Port: Send + Sync {
	async fn pull_request_by_repo_id(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<PullRequest>;

	async fn pull_request_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: u64,
	) -> Result<PullRequest>;

	async fn pull_request_commits_by_repo_id(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<Vec<repos::RepoCommit>>;

	async fn pull_request_reviews_by_repo_id(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<Vec<pulls::Review>>;

	async fn closing_issues_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: u64,
	) -> Result<Vec<IssueId>>;
}
