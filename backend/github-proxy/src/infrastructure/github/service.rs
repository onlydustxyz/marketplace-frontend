use anyhow::anyhow;
use domain::GithubRepositoryId;
use infrastructure::github;
use olog::{error, tracing::instrument};
use thiserror::Error;

use super::Contributors;
use crate::domain::{
	GithubFile, GithubFileEncoding, GithubPullRequest, GithubPullRequestStatus, GithubRepository,
	GithubService, GithubServiceError, GithubServiceResult, GithubUser,
};

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
	#[instrument(skip(self))]
	async fn fetch_repository_by_id(&self, id: u64) -> GithubServiceResult<GithubRepository> {
		let repo = self.get_repository_by_id(id).await?;

		let contributors: Contributors = match &repo.contributors_url {
			Some(url) => self.get_as(url).await?,
			None => Default::default(),
		};

		let readme = match self.get_raw_file(&repo, "README.md").await {
			Ok(readme) => Some(readme),
			Err(github::Error::NotFound(_)) => None,
			Err(error) => return Err(error.into()),
		};

		let owner = repo.owner.ok_or_else(|| {
			GithubServiceError::MissingRepositoryOwner(anyhow!(
				"Missing owner in github repository"
			))
		})?;

		Ok(GithubRepository::new(
			contributors.into_iter().map(Into::into).collect(),
			readme.map(Into::into),
			owner.avatar_url.to_string(),
		))
	}

	#[instrument(skip(self))]
	async fn fetch_user_by_name(&self, username: &str) -> GithubServiceResult<GithubUser> {
		let user = self.get_user_by_name(username).await?;
		Ok(user.into())
	}

	#[instrument(skip(self))]
	async fn fetch_repository_PRs(
		&self,
		repository_id: &GithubRepositoryId,
	) -> GithubServiceResult<Vec<GithubPullRequest>> {
		let repository_id: u64 = i64::from(*repository_id)
			.try_into()
			.expect("Repository id should always be positive");

		let octocrab_pull_requests = self.get_repository_PRs(repository_id).await?;
		let pull_requests = octocrab_pull_requests
			.into_iter()
			.filter_map(|pr| match GithubPullRequest::try_from(pr.clone()) {
				Ok(pr) => Some(pr),
				Err(e) => {
					error!(
						error = e.to_string(),
						repository_id = repository_id,
						pullrequest_id = pr.id.0,
						"Failed to process pull request"
					);
					None
				},
			})
			.collect();

		Ok(pull_requests)
	}
}

impl From<octocrab::models::User> for GithubUser {
	fn from(user: octocrab::models::User) -> Self {
		Self::new(user.id.0 as i32, user.login, user.avatar_url.to_string())
	}
}

impl From<octocrab::models::repos::Content> for GithubFile {
	fn from(file: octocrab::models::repos::Content) -> Self {
		Self::new(GithubFileEncoding::Base64, file.content.unwrap_or_default())
	}
}

#[derive(Debug, Error)]
pub enum GithubPullRequestFromOctocrabPullRequestError {
	#[error("Field '{0}' is not present")]
	MissingField(String),
	#[error(transparent)]
	UnknownStatus(#[from] GithubPullRequestStatusFromOctocrabIssueStateError),
}

impl TryFrom<octocrab::models::pulls::PullRequest> for GithubPullRequest {
	type Error = GithubPullRequestFromOctocrabPullRequestError;

	fn try_from(pull_request: octocrab::models::pulls::PullRequest) -> Result<Self, Self::Error> {
		let id = pull_request
			.id
			.0
			.try_into()
			.expect("We cannot work with github ids superior to i32::MAX");
		let title = pull_request
			.title
			.ok_or_else(|| Self::Error::MissingField("title".to_string()))?;
		let assignee_id = pull_request.assignee.map(|assignee| {
			assignee
				.id
				.0
				.try_into()
				.expect("We cannot work with github ids superior to i32::MAX")
		});

		let status = pull_request
			.state
			.ok_or_else(|| Self::Error::MissingField("state".to_string()))?
			.try_into()?;
		let created_at = pull_request
			.created_at
			.ok_or_else(|| Self::Error::MissingField("created_at".to_string()))?;

		Ok(Self::new(
			id,
			title,
			assignee_id,
			status,
			created_at,
			pull_request.closed_at,
		))
	}
}

#[derive(Debug, Error)]
pub enum GithubPullRequestStatusFromOctocrabIssueStateError {
	#[error("Unknown octocrab state: '{0}'")]
	UnknownState(String),
}

impl TryFrom<octocrab::models::IssueState> for GithubPullRequestStatus {
	type Error = GithubPullRequestStatusFromOctocrabIssueStateError;

	fn try_from(state: octocrab::models::IssueState) -> Result<Self, Self::Error> {
		match state {
			octocrab::models::IssueState::Open => Ok(Self::Open),
			octocrab::models::IssueState::Closed => Ok(Self::Closed),
			_ => Err(
				GithubPullRequestStatusFromOctocrabIssueStateError::UnknownState(format!(
					"{:?}",
					state
				)),
			),
		}
	}
}
