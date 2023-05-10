use domain::GithubUserId;

use super::Result;

pub trait Repository: Send + Sync {
	fn exists(&self, repo_id: &GithubUserId) -> Result<bool>;
	fn try_insert(&self, repo_id: &GithubUserId) -> Result<()>;

	fn select_user_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> Result<Option<serde_json::Value>>;
	fn upsert_user_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> Result<()>;
}
