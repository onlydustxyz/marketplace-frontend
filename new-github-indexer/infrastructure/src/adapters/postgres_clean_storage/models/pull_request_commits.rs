use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::pull_request_commits, Error};

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(primary_key(repo_id, pull_request_id, sha))]
pub struct PullRequestCommit {
	pub repo_id: i64,
	pub pull_request_id: i64,
	pub sha: String,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for PullRequestCommit {
	type Id = (i64, i64, String);

	fn id(self) -> Self::Id {
		(self.repo_id, self.pull_request_id, self.sha)
	}
}

impl
	TryFrom<(
		models::RepositoryId,
		models::PullRequestId,
		models::repos::RepoCommit,
	)> for PullRequestCommit
{
	type Error = Error;

	fn try_from(
		(repo_id, pull_request_id, commit): (
			models::RepositoryId,
			models::PullRequestId,
			models::repos::RepoCommit,
		),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			repo_id: repo_id.0 as i64,
			pull_request_id: pull_request_id.0 as i64,
			sha: commit.sha.clone(),
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(commit)?,
		})
	}
}
