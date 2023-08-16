use chrono::{DateTime, Utc};
use common_domain::{GithubIssue, GithubIssueStatus, GithubUser};
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
	pub status: Status,
	pub created_at: DateTime<Utc>,
	pub updated_at: DateTime<Utc>,
	pub closed_at: Option<DateTime<Utc>>,
	pub comments_count: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
	pub id: i64,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Status {
	OPEN,
	COMPLETED,
	CANCELLED,
}

impl From<GithubUser> for UserResponse {
	fn from(github_user: GithubUser) -> Self {
		Self {
			login: github_user.login,
			avatar_url: github_user.avatar_url,
			html_url: github_user.html_url,
			id: github_user.id.into(),
		}
	}
}

impl From<GithubIssue> for Response {
	fn from(github_issue: GithubIssue) -> Self {
		Self {
			id: github_issue.id.into(),
			repo_id: github_issue.repo_id.into(),
			number: github_issue.number.into(),
			title: github_issue.title,
			author: UserResponse::from(github_issue.author),
			html_url: github_issue.html_url,
			status: Status::from(github_issue.status),
			created_at: github_issue.created_at,
			updated_at: github_issue.updated_at,
			closed_at: github_issue.closed_at,
			comments_count: github_issue.comments_count as i64,
		}
	}
}

impl From<GithubIssueStatus> for Status {
	fn from(github_issue_status: GithubIssueStatus) -> Self {
		match github_issue_status {
			GithubIssueStatus::Cancelled => Status::CANCELLED,
			GithubIssueStatus::Open => Status::OPEN,
			GithubIssueStatus::Completed => Status::COMPLETED,
		}
	}
}
