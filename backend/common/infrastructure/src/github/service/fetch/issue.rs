use async_trait::async_trait;
use domain::{
	GithubFetchIssueService, GithubIssue, GithubIssueNumber, GithubRepoId, GithubServiceError,
	GithubServiceIssueFilters, GithubServiceResult,
};
use olog::tracing::instrument;

use crate::{github, github::issue::FromOctocrab};

#[async_trait]
impl GithubFetchIssueService for github::Client {
	#[instrument(skip(self))]
	async fn issues_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		filters: GithubServiceIssueFilters,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let issues = self.issues_by_repo_id(repo_id, filters).await?;
		Ok(issues)
	}

	#[instrument(skip(self))]
	async fn issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self.get_issue(repo_owner, repo_name, issue_number).await?;
		let repo_id = self.get_issue_repository_id(&issue).await?;
		GithubIssue::from_octocrab(issue, repo_id).map_err(GithubServiceError::Other)
	}

	#[instrument(skip(self))]
	async fn issue_by_repo_id(
		&self,
		repo_id: GithubRepoId,
		issue_number: GithubIssueNumber,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self.get_issue_by_repository_id(repo_id, issue_number).await?;
		GithubIssue::from_octocrab(issue, repo_id).map_err(GithubServiceError::Other)
	}
}
