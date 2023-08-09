use async_trait::async_trait;
use domain::{
	GithubFetchPullRequestService, GithubPullRequest, GithubPullRequestNumber, GithubRepoId,
	GithubServiceError, GithubServicePullRequestFilters, GithubServiceResult,
};
use olog::tracing::instrument;

use crate::{github, github::pull_request::FromOctocrab};

#[async_trait]
impl GithubFetchPullRequestService for github::Client {
	async fn pull_request(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: GithubPullRequestNumber,
	) -> GithubServiceResult<GithubPullRequest> {
		let pull_request =
			self.get_pull_request(repo_owner, repo_name, pull_request_number).await?;
		GithubPullRequest::from_octocrab(pull_request).map_err(GithubServiceError::Other)
	}

	#[instrument(skip(self))]
	async fn pull_requests_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		filters: GithubServicePullRequestFilters,
	) -> GithubServiceResult<Vec<GithubPullRequest>> {
		let pull_requests = self.pulls_by_repo_id(repo_id, filters).await?;
		Ok(pull_requests)
	}

	#[instrument(skip(self))]
	async fn pull_request_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		pull_request_number: GithubPullRequestNumber,
	) -> GithubServiceResult<GithubPullRequest> {
		let pull_request =
			self.get_pull_request_by_repository_id(repo_id, pull_request_number).await?;

		GithubPullRequest::from_octocrab(pull_request).map_err(GithubServiceError::Other)
	}
}
