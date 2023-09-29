use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::issues;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct Issue {
	pub id: i64,
	pub repo_id: i64,
	pub number: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for Issue {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.id
	}
}
