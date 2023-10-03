use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::repo_check_runs, Error};

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
#[diesel(table_name=repo_check_runs, primary_key(repo_id, sha))]
pub struct RepoCheckRuns {
	pub repo_id: i64,
	pub sha: String,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for RepoCheckRuns {
	type Id = (i64, String);

	fn id(self) -> Self::Id {
		(self.repo_id, self.sha)
	}
}

impl TryFrom<(models::RepositoryId, String, models::CheckRuns)> for RepoCheckRuns {
	type Error = Error;

	fn try_from(
		(repo_id, sha, check_runs): (models::RepositoryId, String, models::CheckRuns),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			repo_id: repo_id.0 as i64,
			sha,
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(check_runs)?,
		})
	}
}
