use chrono::NaiveDateTime;
use diesel::Identifiable;

use crate::adapters::postgres_clean_storage::schema::indexer_clean::user_social_accounts;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(primary_key(user_id))]
pub struct UserSocialAccount {
	pub user_id: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for UserSocialAccount {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.user_id
	}
}
