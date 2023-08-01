use chrono::{DateTime, Utc};
use juniper::{GraphQLEnum, GraphQLObject};
use url::Url;

use super::{ToInt32, User};

#[derive(Debug, GraphQLObject)]
#[graphql(name = "GithubIssue")]
pub struct Issue {
	pub id: i32,
	pub repo_id: i32,
	pub number: i32,
	pub title: String,
	pub author: User,
	pub html_url: Url,
	pub status: Status,
	pub created_at: DateTime<Utc>,
	pub updated_at: DateTime<Utc>,
	pub closed_at: Option<DateTime<Utc>>,
	pub assignees: Vec<User>,
}

#[derive(Debug, GraphQLEnum)]
#[graphql(name = "GithubIssueStatus")]
pub enum Status {
	Open,
	Completed,
	Cancelled,
}

impl From<domain::GithubIssue> for Issue {
	fn from(issue: domain::GithubIssue) -> Self {
		Self {
			id: issue.id.to_i32(),
			repo_id: issue.repo_id.to_i32(),
			number: issue.number.to_i32(),
			title: issue.title,
			author: issue.author.into(),
			html_url: issue.html_url,
			status: issue.status.into(),
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			closed_at: issue.closed_at,
			assignees: issue.assignees.into_iter().map(Into::into).collect(),
		}
	}
}

impl From<domain::GithubIssueStatus> for Status {
	fn from(status: domain::GithubIssueStatus) -> Self {
		match status {
			domain::GithubIssueStatus::Open => Self::Open,
			domain::GithubIssueStatus::Completed => Self::Completed,
			domain::GithubIssueStatus::Cancelled => Self::Cancelled,
		}
	}
}
