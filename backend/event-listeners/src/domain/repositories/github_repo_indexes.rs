use domain::GithubRepoId;

use super::Result;

pub trait Repository: Send + Sync {
	fn try_insert(&self, repo_id: &GithubRepoId) -> Result<()>;
	fn delete(&self, repo_id: &GithubRepoId) -> Result<()>;
	fn list(&self) -> Result<Vec<GithubRepoId>>;
	fn select_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>>;
	fn update_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()>;
}
