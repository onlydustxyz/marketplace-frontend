use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::{GithubPullRequestId, GithubPullRequestNumber, GithubRepoId, GithubUserId};
use infrastructure::database::{
	enums::{GithubCiChecks, GithubPullRequestStatus},
	schema::github_pull_requests,
};
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Identifiable, Queryable, Serialize, Deserialize, Model,
)]
pub struct GithubPullRequest {
	pub id: GithubPullRequestId,
	pub repo_id: GithubRepoId,
	pub number: GithubPullRequestNumber,
	pub created_at: NaiveDateTime,
	pub author_id: GithubUserId,
	pub merged_at: Option<NaiveDateTime>,
	pub status: GithubPullRequestStatus,
	pub title: String,
	pub html_url: String,
	pub closed_at: Option<NaiveDateTime>,
	pub draft: bool,
	pub ci_checks: Option<GithubCiChecks>,
}

impl Identifiable for GithubPullRequest {
	type Id = GithubPullRequestId;

	fn id(self) -> Self::Id {
		self.id
	}
}
