use anyhow::anyhow;
use domain::GithubRepositoryId;
use infrastructure::github;
use olog::{error, tracing::instrument};
use thiserror::Error;

use super::Contributors;
use crate::domain::{
	GithubPullRequest, GithubPullRequestStatus, GithubRepository, GithubService,
	GithubServiceError, GithubServiceResult, GithubUser,
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

		let contributors: Contributors = match self
			.fix_github_host(&repo.contributors_url)
			.map_err(GithubServiceError::Other)?
		{
			Some(url) => self.get_as(url).await?,
			None => Default::default(),
		};

		let owner = repo.owner.ok_or_else(|| {
			GithubServiceError::MissingRepositoryOwner(anyhow!(
				"Missing owner in github repository"
			))
		})?;

		Ok(GithubRepository::new(
			id as i32,
			contributors.into_iter().map(Into::into).collect(),
			owner.avatar_url.to_string(),
			repo.description.unwrap_or_default(),
			repo.stargazers_count.unwrap_or_default() as i32,
			repo.forks_count.unwrap_or_default() as i32,
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

	#[instrument(skip(self))]
	async fn fetch_pull_request(
		&self,
		repo_owner: &str,
		repo_name: &str,
		pr_number: u64,
	) -> GithubServiceResult<GithubPullRequest> {
		self.get_pull_request(repo_owner, repo_name, pr_number)
			.await?
			.try_into()
			.map_err(|e: GithubPullRequestFromOctocrabPullRequestError| {
				GithubServiceError::Other(anyhow!(e))
			})
	}

	#[instrument(skip(self))]
	async fn fetch_user_by_id(&self, id: u64) -> GithubServiceResult<GithubUser> {
		let user = self.get_user_by_id(id).await?;
		Ok(user.into())
	}

	#[instrument(skip(self))]
	async fn search_users(
		&self,
		query: &str,
		sort: &str,
		order: &str,
	) -> GithubServiceResult<Vec<GithubUser>> {
		let users = self
			.search_users(query, sort, order)
			.await?
			.into_iter()
			.map(GithubUser::from)
			.collect();
		Ok(users)
	}
}

impl From<octocrab::models::User> for GithubUser {
	fn from(user: octocrab::models::User) -> Self {
		Self::new(user.id.0 as i32, user.login, user.avatar_url.to_string())
	}
}

#[derive(Debug, Error)]
pub enum GithubPullRequestFromOctocrabPullRequestError {
	#[error("Field '{0}' is not present")]
	MissingField(String),
	#[error(transparent)]
	UnknownStatus(#[from] GithubPullRequestStatusFromOctocrabPullRequestError),
}

impl TryFrom<octocrab::models::pulls::PullRequest> for GithubPullRequest {
	type Error = GithubPullRequestFromOctocrabPullRequestError;

	fn try_from(pull_request: octocrab::models::pulls::PullRequest) -> Result<Self, Self::Error> {
		let id = pull_request
			.id
			.0
			.try_into()
			.expect("We cannot work with github ids superior to i32::MAX");

		let number = pull_request
			.number
			.try_into()
			.expect("We cannot work with github PR number superior to i32::MAX");

		let title = pull_request
			.title
			.clone()
			.ok_or_else(|| Self::Error::MissingField("title".to_string()))?;

		let assignee_id = pull_request.assignee.as_ref().map(|assignee| {
			assignee
				.id
				.0
				.try_into()
				.expect("We cannot work with github ids superior to i32::MAX")
		});

		let status = (&pull_request).try_into()?;

		let created_at = pull_request
			.created_at
			.ok_or_else(|| Self::Error::MissingField("created_at".to_string()))?;

		Ok(Self::new(
			id,
			number,
			title,
			assignee_id,
			status,
			created_at,
			pull_request.merged_at,
			pull_request.closed_at,
		))
	}
}

#[derive(Debug, Error)]
pub enum GithubPullRequestStatusFromOctocrabPullRequestError {
	#[error("Unknown octocrab state: '{0}'")]
	UnknownState(String),
	#[error("Field '{0}' is not present")]
	MissingField(String),
}

impl TryFrom<&octocrab::models::pulls::PullRequest> for GithubPullRequestStatus {
	type Error = GithubPullRequestStatusFromOctocrabPullRequestError;

	fn try_from(pull_request: &octocrab::models::pulls::PullRequest) -> Result<Self, Self::Error> {
		let state = pull_request
			.state
			.as_ref()
			.ok_or_else(|| Self::Error::MissingField("state".to_string()))?;

		match state {
			octocrab::models::IssueState::Open => Ok(Self::Open),
			octocrab::models::IssueState::Closed => match pull_request.merged_at {
				Some(_) => Ok(Self::Merged),
				None => Ok(Self::Closed),
			},
			_ => Err(
				GithubPullRequestStatusFromOctocrabPullRequestError::UnknownState(format!(
					"{:?}",
					state
				)),
			),
		}
	}
}
