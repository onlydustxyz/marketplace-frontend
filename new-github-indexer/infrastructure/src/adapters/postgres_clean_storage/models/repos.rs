use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::repos, Error};

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

impl TryFrom<models::Repository> for Repo {
	type Error = Error;

	fn try_from(repo: models::Repository) -> Result<Self, Self::Error> {
		Ok(Self {
			id: repo.id.0 as i64,
			owner: repo.owner.clone().ok_or(Error::MissingField("repo owner"))?.login,
			name: repo.name.clone(),
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(repo)?,
		})
	}
}
