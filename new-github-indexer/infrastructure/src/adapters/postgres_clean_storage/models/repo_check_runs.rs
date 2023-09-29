use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::repo_check_runs;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(primary_key(repo_id, sha))]
pub struct RepoCheckRun {
	pub repo_id: i64,
	pub sha: String,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for RepoCheckRun {
	type Id = (i64, String);

	fn id(self) -> Self::Id {
		(self.repo_id, self.sha)
	}
}
