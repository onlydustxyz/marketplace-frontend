use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::issues, Error};

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

impl TryFrom<(models::RepositoryId, models::issues::Issue)> for Issue {
	type Error = Error;

	fn try_from(
		(repo_id, issue): (models::RepositoryId, models::issues::Issue),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			id: issue.id.0 as i64,
			repo_id: repo_id.0 as i64,
			number: issue.number as i64,
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(issue)?,
		})
	}
}
