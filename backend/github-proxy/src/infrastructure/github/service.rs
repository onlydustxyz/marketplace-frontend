use anyhow::anyhow;
use derive_more::{From, Into};
use domain::{GithubIssue, GithubIssueStatus, GithubIssueType, GithubRepositoryId};
use infrastructure::github;
use octocrab::models::issues::IssueStateReason;
use olog::{error, tracing::instrument};
use thiserror::Error;

use super::Contributors;
use crate::domain::{
	GithubRepository, GithubService, GithubServiceError, GithubServiceResult, GithubUser,
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
impl<P: github::OctocrabProxy> GithubService for P {
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

		let owner = repo
			.owner
			.ok_or_else(|| GithubServiceError::MissingField("owner".to_string()))?;

		let html_url = repo
			.html_url
			.ok_or_else(|| GithubServiceError::MissingField("html_url".to_string()))?;

		Ok(GithubRepository::new(
			id as i32,
			contributors.into_iter().map(Into::into).collect(),
			owner.avatar_url,
			html_url,
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
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let repository_id: u64 = i64::from(*repository_id)
			.try_into()
			.expect("Repository id should always be positive");

		let octocrab_pull_requests = self.get_repository_PRs(repository_id).await?;
		let pull_requests = octocrab_pull_requests
			.into_iter()
			.filter_map(|pr| match GithubProxyIssue::try_from(pr.clone()) {
				Ok(pr) => Some(pr.into()),
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
	async fn fetch_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: u64,
	) -> GithubServiceResult<GithubIssue> {
		let issue: GithubProxyIssue =
			self.get_issue(repo_owner, repo_name, issue_number).await?.try_into().map_err(
				|e: GithubIssueFromOctocrabResultError| GithubServiceError::Other(anyhow!(e)),
			)?;
		Ok(issue.into())
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
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> GithubServiceResult<Vec<GithubUser>> {
		let users = self
			.search_users(query, sort, order, per_page, page)
			.await?
			.into_iter()
			.map(GithubUser::from)
			.collect();
		Ok(users)
	}

	#[instrument(skip(self))]
	async fn search_issues(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let issues = self
			.search_issues(query, sort, order, per_page, page)
			.await?
			.into_iter()
			.filter_map(|issue| match GithubProxyIssue::try_from(issue) {
				Ok(issue) => Some(issue.into()),
				Err(error) => {
					error!(error = error.to_string(), "Failed to map Octocrab issue");
					None
				},
			})
			.collect();
		Ok(issues)
	}

	#[instrument(skip(self))]
	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
		assignees: Vec<String>,
	) -> GithubServiceResult<GithubIssue> {
		let issue: GithubProxyIssue = self
			.octocrab()
			.issues(repo_owner, repo_name)
			.create(title)
			.body(description)
			.assignees(assignees)
			.send()
			.await
			.map_err(|e| GithubServiceError::Other(anyhow!(e)))?
			.try_into()
			.map_err(|e: GithubIssueFromOctocrabResultError| {
				GithubServiceError::Other(anyhow!(e))
			})?;
		Ok(issue.into())
	}
}

impl From<octocrab::models::User> for GithubUser {
	fn from(user: octocrab::models::User) -> Self {
		Self::new(user.id.0 as i32, user.login, user.avatar_url, user.html_url)
	}
}

#[derive(From, Into)]
struct GithubProxyIssue(GithubIssue);

#[derive(Debug, Error)]
pub enum GithubIssueFromOctocrabResultError {
	#[error("Field '{0}' is not present")]
	MissingField(String),
	#[error(transparent)]
	UnknownStatus(#[from] GithubIssueStatusFromOctocrabResultError),
}

impl TryFrom<octocrab::models::issues::Issue> for GithubProxyIssue {
	type Error = GithubIssueFromOctocrabResultError;

	fn try_from(issue: octocrab::models::issues::Issue) -> Result<Self, Self::Error> {
		let id = issue
			.id
			.0
			.try_into()
			.expect("We cannot work with github ids superior to i32::MAX");

		let number = issue
			.number
			.try_into()
			.expect("We cannot work with github PR number superior to i32::MAX");

		let issue_type = match issue.pull_request {
			Some(_) => GithubIssueType::PullRequest,
			None => GithubIssueType::Issue,
		};

		let status = get_status_from_issue(&issue)?;

		Ok(domain::GithubIssue::new(
			id,
			number,
			issue_type,
			issue.title,
			issue.html_url,
			status,
			issue.created_at,
			issue.pull_request.and_then(|pr| pr.merged_at),
			issue.closed_at,
		)
		.into())
	}
}

impl TryFrom<octocrab::models::pulls::PullRequest> for GithubProxyIssue {
	type Error = GithubIssueFromOctocrabResultError;

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

		let status = get_status_from_pull_request(&pull_request)?;

		let created_at = pull_request
			.created_at
			.ok_or_else(|| Self::Error::MissingField("created_at".to_string()))?;

		let html_url = pull_request
			.html_url
			.ok_or_else(|| Self::Error::MissingField("html_url".to_string()))?;

		Ok(domain::GithubIssue::new(
			id,
			number,
			GithubIssueType::PullRequest,
			title,
			html_url,
			status,
			created_at,
			pull_request.merged_at,
			pull_request.closed_at,
		)
		.into())
	}
}

#[derive(Debug, Error)]
pub enum GithubIssueStatusFromOctocrabResultError {
	#[error("Unknown octocrab state: '{0}'")]
	UnknownState(String),
	#[error("Field '{0}' is not present")]
	MissingField(String),
}

fn get_status_from_issue(
	issue: &octocrab::models::issues::Issue,
) -> Result<GithubIssueStatus, GithubIssueStatusFromOctocrabResultError> {
	match issue.state {
		octocrab::models::IssueState::Open => Ok(GithubIssueStatus::Open),
		octocrab::models::IssueState::Closed =>
			match issue.pull_request.as_ref().and_then(|pr| pr.merged_at) {
				Some(_) => Ok(GithubIssueStatus::Merged),
				None => match issue.state_reason {
					Some(IssueStateReason::Completed) => Ok(GithubIssueStatus::Completed),
					Some(IssueStateReason::NotPlanned) => Ok(GithubIssueStatus::Cancelled),
					_ => Ok(GithubIssueStatus::Closed),
				},
			},
		_ => Err(GithubIssueStatusFromOctocrabResultError::UnknownState(
			format!("{:?}", issue.state),
		)),
	}
}

fn get_status_from_pull_request(
	pull_request: &octocrab::models::pulls::PullRequest,
) -> Result<GithubIssueStatus, GithubIssueStatusFromOctocrabResultError> {
	let state = pull_request.state.as_ref().ok_or_else(|| {
		GithubIssueStatusFromOctocrabResultError::MissingField("state".to_string())
	})?;

	match state {
		octocrab::models::IssueState::Open => Ok(GithubIssueStatus::Open),
		octocrab::models::IssueState::Closed => match pull_request.merged_at {
			Some(_) => Ok(GithubIssueStatus::Merged),
			None => Ok(GithubIssueStatus::Closed),
		},
		_ => Err(GithubIssueStatusFromOctocrabResultError::UnknownState(
			format!("{:?}", state),
		)),
	}
}
