use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{GithubIssue, GithubRepositoryId};
use infrastructure::github::{self, FromOctocrabIssue, OctocrabProxy};
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
impl<P: OctocrabProxy> GithubService for P {
	async fn fetch_repository_details(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<GithubRepo, GithubServiceError> {
		let repo_id: i64 = (*github_repo_id).into();
		let repo = self.get_repository_by_id(repo_id as u64).await?;

		let languages: Value = if let Some(url) =
			self.fix_github_host(&repo.languages_url).map_err(GithubServiceError::Other)?
		{
			self.get_as(url).await?
		} else {
			Default::default()
		};

		let owner = repo.owner.ok_or_else(|| {
			GithubServiceError::MissingRepositoryOwner(anyhow!(
				"No owner in github repository {github_repo_id}"
			))
		})?;

		Ok(GithubRepo::new(
			*github_repo_id,
			owner.login,
			repo.name,
			languages,
		))
	}

	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
		assignees: Vec<String>,
	) -> Result<GithubIssue, GithubServiceError> {
		let issue = self
			.octocrab()
			.issues(repo_owner, repo_name)
			.create(title)
			.body(description)
			.assignees(assignees)
			.send()
			.await
			.map_err(|e| GithubServiceError::Other(anyhow!(e)))?;

		GithubIssue::from_octocrab_issue(issue).map_err(|e| GithubServiceError::Other(anyhow!(e)))
	}
}
