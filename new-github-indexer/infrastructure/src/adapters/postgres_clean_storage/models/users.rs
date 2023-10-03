use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::users, Error};

#[derive(Debug, Clone, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct User {
	pub id: i64,
	pub login: String,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for User {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.id
	}
}

impl TryFrom<models::User> for User {
	type Error = Error;

	fn try_from(user: models::User) -> Result<Self, Self::Error> {
		Ok(Self {
			id: user.id.0 as i64,
			login: user.login.clone(),
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(user)?,
		})
	}
}
