use infrastructure::database::Client;

use crate::domain::{GithubRepoIndexRepository, RepositoryResult};

impl GithubRepoIndexRepository for Client {
	fn try_insert(&self, repo_id: &domain::GithubRepoId) -> RepositoryResult<()> {
		todo!()
	}

	fn delete(&self, repo_id: &domain::GithubRepoId) -> RepositoryResult<()> {
		todo!()
	}

	fn list(&self) -> RepositoryResult<Vec<domain::GithubRepoId>> {
		todo!()
	}

	fn select_repo_indexer_state(
		&self,
		repo_id: &domain::GithubRepoId,
	) -> RepositoryResult<serde_json::Value> {
		todo!()
	}

	fn upsert_repo_indexer_state(
		&self,
		repo_id: &domain::GithubRepoId,
		state: serde_json::Value,
	) -> RepositoryResult<()> {
		todo!()
	}
}
