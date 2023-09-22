mod repository;

use diesel::Identifiable;
use domain::GithubPullRequestId;
use infrastructure::database::schema::github_pull_request_indexes;
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
#[diesel(table_name = github_pull_request_indexes, primary_key(pull_request_id))]
pub struct GithubPullRequestIndex {
	pub pull_request_id: GithubPullRequestId,
	pub pull_request_indexer_state: Option<Value>,
}

impl GithubPullRequestIndex {
	pub fn new(pull_request_id: GithubPullRequestId) -> Self {
		Self {
			pull_request_id,
			..Default::default()
		}
	}
}

impl Identifiable for GithubPullRequestIndex {
	type Id = GithubPullRequestId;

	fn id(self) -> Self::Id {
		self.pull_request_id
	}
}
