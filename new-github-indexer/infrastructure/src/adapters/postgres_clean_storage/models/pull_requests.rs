use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::pull_requests, Error};

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct PullRequest {
	pub id: i64,
	pub repo_id: i64,
	pub number: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for PullRequest {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.id
	}
}

impl TryFrom<(models::RepositoryId, models::pulls::PullRequest)> for PullRequest {
	type Error = Error;

	fn try_from(
		(repo_id, pull_request): (models::RepositoryId, models::pulls::PullRequest),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			id: pull_request.id.0 as i64,
			repo_id: repo_id.0 as i64,
			number: pull_request.number as i64,
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(pull_request)?,
		})
	}
}
