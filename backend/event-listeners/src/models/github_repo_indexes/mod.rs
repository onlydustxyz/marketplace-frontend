mod repository;
use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::GithubRepoId;
use infrastructure::database::schema::github_repo_indexes;
pub use repository::Repository;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(
	Debug,
	Default,
	Clone,
	Insertable,
	AsChangeset,
	Identifiable,
	Queryable,
	Serialize,
	Deserialize,
	Model,
)]
#[diesel(table_name = github_repo_indexes, primary_key(repo_id))]
pub struct GithubRepoIndex {
	pub repo_id: GithubRepoId,
	pub repo_indexer_state: Option<Value>,
	pub issues_indexer_state: Option<Value>,
	pub pull_requests_indexer_state: Option<Value>,
	pub indexed_at: Option<NaiveDateTime>,
}

impl GithubRepoIndex {
	pub fn new(repo_id: GithubRepoId) -> Self {
		Self {
			repo_id,
			..Default::default()
		}
	}
}

impl Identifiable for GithubRepoIndex {
	type Id = GithubRepoId;

	fn id(self) -> Self::Id {
		self.repo_id
	}
}
