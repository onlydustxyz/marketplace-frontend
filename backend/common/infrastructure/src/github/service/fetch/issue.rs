use async_trait::async_trait;
use domain::{
	GithubFetchIssueService, GithubIssue, GithubIssueNumber, GithubRepositoryId,
	GithubServiceError, GithubServiceResult,
};
use olog::{error, tracing::instrument};

use crate::{github, github::IssueFromOctocrab};

#[async_trait]
impl GithubFetchIssueService for github::Client {
	#[instrument(skip(self))]
	async fn pulls_by_repo_id(
		&self,
		repo_id: &GithubRepositoryId,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let octocrab_pull_requests = self.get_repository_PRs(repo_id).await?;
		let pull_requests = octocrab_pull_requests
			.into_iter()
			.filter_map(
				|pr| match GithubIssue::from_octocrab_pull_request(pr.clone()) {
					Ok(pr) => Some(pr),
					Err(e) => {
						error!(
							error = e.to_string(),
							repository_id = repo_id.to_string(),
							pullrequest_id = pr.id.0,
							"Failed to process pull request"
						);
						None
					},
				},
			)
			.collect();

		Ok(pull_requests)
	}

	#[instrument(skip(self))]
	async fn issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self.get_issue(repo_owner, repo_name, issue_number).await?;
		let repo_id = self.get_issue_repository_id(&issue).await?;
		GithubIssue::from_octocrab_issue(issue, repo_id).map_err(GithubServiceError::Other)
	}

	#[instrument(skip(self))]
	async fn issue_by_repo_id(
		&self,
		repo_id: &GithubRepositoryId,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self.get_issue_by_repository_id(repo_id, issue_number).await?;
		GithubIssue::from_octocrab_issue(issue, *repo_id).map_err(GithubServiceError::Other)
	}
}
