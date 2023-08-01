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

impl From<domain::GithubPullRequest> for GithubPullRequest {
	fn from(pull_request: domain::GithubPullRequest) -> Self {
		Self {
			id: pull_request.id,
			repo_id: pull_request.repo_id,
			number: pull_request.number,
			created_at: pull_request.created_at.naive_utc(),
			author_id: pull_request.author.id,
			merged_at: pull_request.merged_at.map(|date| date.naive_utc()),
			status: pull_request.status.into(),
			title: pull_request.title,
			html_url: pull_request.html_url.to_string(),
			closed_at: pull_request.closed_at.map(|date| date.naive_utc()),
			draft: pull_request.draft,
			ci_checks: pull_request.ci_checks.map(Into::into),
		}
	}
}
