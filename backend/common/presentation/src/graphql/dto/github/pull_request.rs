use chrono::{DateTime, Utc};
use url::Url;

use super::{ToInt32, User};

#[derive(Debug)]
pub struct PullRequest {
	pub id: i32,
	pub repo_id: i32,
	pub number: i32,
	pub title: String,
	pub author: User,
	pub html_url: Url,
	pub status: Status,
	pub created_at: DateTime<Utc>,
	pub updated_at: DateTime<Utc>,
	pub merged_at: Option<DateTime<Utc>>,
	pub closed_at: Option<DateTime<Utc>>,
}

#[derive(Debug)]
pub enum Status {
	Open,
	Closed,
	Merged,
}

impl From<domain::GithubPullRequest> for PullRequest {
	fn from(pull_request: domain::GithubPullRequest) -> Self {
		Self {
			id: pull_request.id.to_i32(),
			repo_id: pull_request.repo_id.to_i32(),
			number: pull_request.number.to_i32(),
			title: pull_request.title,
			author: pull_request.author.into(),
			html_url: pull_request.html_url,
			status: pull_request.status.into(),
			created_at: pull_request.created_at,
			updated_at: pull_request.updated_at,
			closed_at: pull_request.closed_at,
			merged_at: pull_request.merged_at,
		}
	}
}

impl From<domain::GithubPullRequestStatus> for Status {
	fn from(status: domain::GithubPullRequestStatus) -> Self {
		match status {
			domain::GithubPullRequestStatus::Open => Self::Open,
			domain::GithubPullRequestStatus::Closed => Self::Closed,
			domain::GithubPullRequestStatus::Merged => Self::Merged,
		}
	}
}
