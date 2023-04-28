use async_trait::async_trait;
use domain::{
	GithubFetchIssueService, GithubIssue, GithubIssueNumber, GithubRepoId, GithubServiceError,
	GithubServiceFilters, GithubServiceResult,
};
use olog::{error, tracing::instrument};

use crate::{github, github::IssueFromOctocrab};

#[async_trait]
impl GithubFetchIssueService for github::Client {
	#[instrument(skip(self))]
	async fn issues_by_repo_id(
		&self,
		repo_id: &GithubRepoId,
		filters: &GithubServiceFilters,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let octocrab_issues = self.issues_by_repo_id(repo_id, filters).await?;
		let issues = octocrab_issues
			.into_iter()
			.filter_map(
				|issue| match GithubIssue::from_octocrab_issue(issue.clone(), *repo_id) {
					Ok(issue) => Some(issue),
					Err(e) => {
						error!(
							error = e.to_string(),
							repository_id = repo_id.to_string(),
							issue_id = issue.id.0,
							"Failed to process issue"
						);
						None
					},
				},
			)
			.collect();

		Ok(issues)
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
		repo_id: &GithubRepoId,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self.get_issue_by_repository_id(repo_id, issue_number).await?;
		GithubIssue::from_octocrab_issue(issue, *repo_id).map_err(GithubServiceError::Other)
	}
}
