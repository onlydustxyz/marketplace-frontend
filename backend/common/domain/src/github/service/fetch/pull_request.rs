use async_trait::async_trait;

use super::Result;
use crate::{
	GithubPullRequest, GithubPullRequestNumber, GithubRepoId, GithubServicePullRequestFilters,
};

#[async_trait]
pub trait Service: Send + Sync {
	async fn pull_request(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: GithubPullRequestNumber,
	) -> Result<GithubPullRequest>;

	async fn pull_request_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		pull_request_number: GithubPullRequestNumber,
	) -> Result<GithubPullRequest>;

	async fn pull_requests_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		filters: GithubServicePullRequestFilters,
	) -> Result<Vec<GithubPullRequest>>;
}
