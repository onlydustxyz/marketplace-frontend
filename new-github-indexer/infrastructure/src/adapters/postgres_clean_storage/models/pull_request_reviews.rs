use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::pull_request_reviews;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct PullRequestReview {
	pub id: i64,
	pub pull_request_id: i64,
	pub reviewer_id: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for PullRequestReview {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.id
	}
}
