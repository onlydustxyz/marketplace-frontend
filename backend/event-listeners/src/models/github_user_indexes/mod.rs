mod repository;
use diesel::Identifiable;
use domain::GithubUserId;
use infrastructure::database::schema::github_user_indexes;
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
	QueryableByName,
	Serialize,
	Deserialize,
	Model,
)]
#[diesel(table_name = github_user_indexes, primary_key(user_id))]
pub struct GithubUserIndex {
	pub user_id: GithubUserId,
	pub user_indexer_state: Option<Value>,
	pub contributor_indexer_state: Option<Value>,
}

impl Identifiable for GithubUserIndex {
	type Id = GithubUserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
}
