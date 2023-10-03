use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::repo_languages, Error};

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

impl TryFrom<(models::RepositoryId, models::Languages)> for RepoLanguages {
	type Error = Error;

	fn try_from(
		(repo_id, languages): (models::RepositoryId, models::Languages),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			repo_id: repo_id.0 as i64,
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(languages)?,
		})
	}
}
