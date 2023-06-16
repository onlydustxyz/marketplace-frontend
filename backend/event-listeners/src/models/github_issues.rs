use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::{GithubIssueId, GithubIssueNumber, GithubRepoId, GithubUserId};
use infrastructure::database::{
	enums::{GithubIssueStatus, GithubIssueType},
	schema::github_issues,
};
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Identifiable, Queryable, Serialize, Deserialize, Model,
)]
pub struct GithubIssue {
	pub id: GithubIssueId,
	pub repo_id: GithubRepoId,
	pub issue_number: GithubIssueNumber,
	pub created_at: NaiveDateTime,
	pub author_id: GithubUserId,
	pub merged_at: Option<NaiveDateTime>,
	pub type_: GithubIssueType,
	pub status: GithubIssueStatus,
	pub title: String,
	pub html_url: String,
	pub closed_at: Option<NaiveDateTime>,
}

impl Identifiable for GithubIssue {
	type Id = GithubIssueId;

	fn id(self) -> Self::Id {
		self.id
	}
}

impl From<domain::GithubIssue> for GithubIssue {
	fn from(issue: domain::GithubIssue) -> Self {
		GithubIssue {
			id: issue.id,
			repo_id: issue.repo_id,
			issue_number: issue.number,
			created_at: issue.created_at.naive_utc(),
			author_id: *issue.author.id(),
			merged_at: issue.merged_at.map(|date| date.naive_utc()),
			type_: issue.r#type.into(),
			status: issue.status.into(),
			title: issue.title,
			html_url: issue.html_url.to_string(),
			closed_at: issue.closed_at.map(|date| date.naive_utc()),
		}
	}
}
