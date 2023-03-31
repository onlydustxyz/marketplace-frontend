use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{GithubIssue, GithubRepositoryId};
use infrastructure::github::{self, IssueFromOctocrab};
use serde_json::Value;

use crate::domain::{GithubRepo, GithubService, GithubServiceError};

impl From<github::Error> for GithubServiceError {
	fn from(error: github::Error) -> Self {
		match error {
			github::Error::NotFound(error) => GithubServiceError::NotFound(error),
			github::Error::Other(error) => GithubServiceError::Other(error),
		}
	}
}

#[async_trait]
impl GithubService for github::Client {
	async fn fetch_repository_details(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<GithubRepo, GithubServiceError> {
		let repo = self.get_repository_by_id(github_repo_id).await?;

		let languages: Value = if let Some(url) =
			self.fix_github_host(&repo.languages_url).map_err(GithubServiceError::Other)?
		{
			self.get_as(url).await?
		} else {
			Default::default()
		};

		Ok(GithubRepo::new(*github_repo_id, languages))
	}

	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
	) -> Result<GithubIssue, GithubServiceError> {
		let issue = self
			.octocrab()
			.issues(repo_owner, repo_name)
			.create(title)
			.body(description)
			.send()
			.await
			.map_err(|e| GithubServiceError::Other(anyhow!(e)))?;

		let repo_id = self.get_issue_repository_id(&issue).await?;

		GithubIssue::from_octocrab_issue(issue, repo_id).map_err(GithubServiceError::Other)
	}
}
