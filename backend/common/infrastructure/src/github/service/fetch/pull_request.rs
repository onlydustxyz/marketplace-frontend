use std::collections::HashMap;

use async_trait::async_trait;
use domain::{
	GithubCodeReview, GithubCommit, GithubFetchPullRequestService, GithubIssueNumber,
	GithubPullRequest, GithubPullRequestNumber, GithubRepoId, GithubServiceError,
	GithubServicePullRequestFilters, GithubServiceResult, GithubUserId, LogErr,
};
use olog::{error, tracing::instrument, warn, IntoField};

use crate::{
	github,
	github::{
		code_review::TryIntoReview, commits::FromOctocrab as CommitFromOctocrab,
		pull_request::FromOctocrab as PullRequestFromOctocrab,
	},
};

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

	#[instrument(skip(self))]
	async fn pull_request_commits(
		&self,
		repo_id: GithubRepoId,
		pull_request_number: GithubPullRequestNumber,
	) -> GithubServiceResult<Vec<GithubCommit>> {
		let commits = self
			.get_commits(repo_id, pull_request_number)
			.await?
			.into_iter()
			.filter_map(|commit| {
				GithubCommit::from_octocrab(commit.clone())
					.log_err(|e| {
						warn!(
							error = e.to_field(),
							repo_id = repo_id.to_string(),
							pull_request_number = pull_request_number.to_string(),
							commit_sha = commit.sha,
							"Invalid commit"
						)
					})
					.ok()
			})
			.collect();
		Ok(commits)
	}

	#[instrument(skip(self))]
	async fn pull_request_reviews(
		&self,
		pull_request: GithubPullRequest,
	) -> GithubServiceResult<Vec<GithubCodeReview>> {
		let mut reviews = self.get_reviews(pull_request.repo_id, pull_request.number).await?;

		// sort reviews by submission date asc
		reviews.sort_by_key(|review| review.submitted_at);

		let reviews: HashMap<GithubUserId, GithubCodeReview> = reviews
			.into_iter()
			.filter_map(|review| {
				(pull_request.id, review)
					.try_into_code_review()
					.log_err(|e| error!(error = e.to_field(), "Invalid review"))
					.ok()
			})
			.chain(
				pull_request.requested_reviewers.into_iter().filter_map(|user| {
					(pull_request.id, user)
						.try_into_code_review()
						.log_err(|e| error!(error = e.to_field(), "Invalid user"))
						.ok()
				}),
			)
			.map(|review| (review.reviewer.id, review))
			.collect();

		let mut reviews: Vec<GithubCodeReview> = reviews.into_values().collect();
		reviews.sort_by_key(|review| review.reviewer.login.clone());

		Ok(reviews)
	}

	#[instrument(skip(self))]
	async fn pull_request_closing_issues(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: GithubPullRequestNumber,
	) -> GithubServiceResult<Vec<GithubIssueNumber>> {
		let issues = self.get_closing_issues(repo_owner, repo_name, pull_request_number).await?;
		Ok(issues)
	}
}
