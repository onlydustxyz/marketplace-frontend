use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::repos;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct Repo {
	pub id: i64,
	pub owner: String,
	pub name: String,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for Repo {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.id
	}
}
