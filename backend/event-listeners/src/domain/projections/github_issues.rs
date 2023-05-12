use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use domain::{
	GithubIssueId, GithubIssueNumber, GithubIssueStatus, GithubIssueType, GithubRepoId,
	GithubUserId,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize)]
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

impl domain::Entity for GithubIssue {
	type Id = GithubIssueId;
}
