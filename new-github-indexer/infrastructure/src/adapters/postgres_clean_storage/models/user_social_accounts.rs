use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::user_social_accounts, Error};

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(table_name = user_social_accounts, primary_key(user_id))]
pub struct UserSocialAccounts {
	pub user_id: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for UserSocialAccounts {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.user_id
	}
}

impl TryFrom<(models::UserId, Vec<models::SocialAccount>)> for UserSocialAccounts {
	type Error = Error;

	fn try_from(
		(user_id, social_accounts): (models::UserId, Vec<models::SocialAccount>),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			user_id: user_id.0 as i64,
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(social_accounts)?,
		})
	}
}
