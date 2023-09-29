use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::pull_request_commits;

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
