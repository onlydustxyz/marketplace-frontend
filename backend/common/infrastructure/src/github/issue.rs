use domain::{GithubIssue, GithubIssueStatus, GithubIssueType};
use octocrab::models::issues::IssueStateReason;
use olog::error;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Field '{0}' is not present")]
	MissingField(String),
	#[error(transparent)]
	UnknownStatus(#[from] StatusError),
}

#[derive(Debug, Error)]
pub enum StatusError {
	#[error("Unknown octocrab state: '{0}'")]
	UnknownState(String),
	#[error("Field '{0}' is not present")]
	MissingField(String),
}

pub trait FromOctocrabIssue
where
	Self: Sized,
{
	fn from_octocrab_issue(issue: octocrab::models::issues::Issue) -> Result<Self, Error>;
	fn from_octocrab_pull_request(
		pull_request: octocrab::models::pulls::PullRequest,
	) -> Result<Self, Error>;
}

impl FromOctocrabIssue for GithubIssue {
	fn from_octocrab_issue(issue: octocrab::models::issues::Issue) -> Result<Self, Error> {
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
		))
	}

	fn from_octocrab_pull_request(
		pull_request: octocrab::models::pulls::PullRequest,
	) -> Result<Self, Error> {
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
			.ok_or_else(|| Error::MissingField("title".to_string()))?;

		let status = get_status_from_pull_request(&pull_request)?;

		let created_at = pull_request
			.created_at
			.ok_or_else(|| Error::MissingField("created_at".to_string()))?;

		let html_url = pull_request
			.html_url
			.ok_or_else(|| Error::MissingField("html_url".to_string()))?;

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
		))
	}
}

fn get_status_from_issue(
	issue: &octocrab::models::issues::Issue,
) -> Result<GithubIssueStatus, StatusError> {
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
		_ => Err(StatusError::UnknownState(format!("{:?}", issue.state))),
	}
}

fn get_status_from_pull_request(
	pull_request: &octocrab::models::pulls::PullRequest,
) -> Result<GithubIssueStatus, StatusError> {
	let state = pull_request
		.state
		.as_ref()
		.ok_or_else(|| StatusError::MissingField("state".to_string()))?;

	match state {
		octocrab::models::IssueState::Open => Ok(GithubIssueStatus::Open),
		octocrab::models::IssueState::Closed => match pull_request.merged_at {
			Some(_) => Ok(GithubIssueStatus::Merged),
			None => Ok(GithubIssueStatus::Closed),
		},
		_ => Err(StatusError::UnknownState(format!("{:?}", state))),
	}
}
