use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
	pub id: i64,
	pub repo_id: i64,
	pub number: i64,
	pub title: String,
	pub author: UserResponse,
	pub html_url: Url,
	pub status: PullRequestStatus,
	pub created_at: DateTime<Utc>,
	pub updated_at: DateTime<Utc>,
	pub merged_at: Option<DateTime<Utc>>,
	pub closed_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum PullRequestStatus {
	OPEN,
	CLOSED,
	MERGED,
}

impl From<domain::GithubPullRequest> for Response {
	fn from(pull_request: domain::GithubPullRequest) -> Self {
		Self {
			id: pull_request.id.into(),
			repo_id: pull_request.repo_id.into(),
			number: pull_request.number.into(),
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

impl From<domain::GithubPullRequestStatus> for PullRequestStatus {
	fn from(status: domain::GithubPullRequestStatus) -> Self {
		match status {
			domain::GithubPullRequestStatus::Open => Self::OPEN,
			domain::GithubPullRequestStatus::Closed => Self::CLOSED,
			domain::GithubPullRequestStatus::Merged => Self::MERGED,
		}
	}
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
	pub id: i64,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

impl From<domain::GithubUser> for UserResponse {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: user.id.into(),
			login: user.login,
			avatar_url: user.avatar_url,
			html_url: user.html_url,
		}
	}
}
