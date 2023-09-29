use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::repo_languages;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(table_name = repo_languages, primary_key(repo_id))]
pub struct RepoLanguages {
	pub repo_id: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for RepoLanguages {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.repo_id
	}
}
