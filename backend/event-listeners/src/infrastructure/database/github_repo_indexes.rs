use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubRepoId;
use infrastructure::database::{schema::github_repo_indexes::dsl, Client};

use crate::domain::{GithubRepoIndexRepository, RepositoryResult};

impl GithubRepoIndexRepository for Client {
	fn try_insert(&self, repo_id: &GithubRepoId) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::insert_into(dsl::github_repo_indexes)
			.values(dsl::repo_id.eq(repo_id))
			.on_conflict_do_nothing()
			.execute(&*connection)?;
		Ok(())
	}

	fn delete(&self, repo_id: &GithubRepoId) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::delete(dsl::github_repo_indexes)
			.filter(dsl::repo_id.eq(repo_id))
			.execute(&*connection)?;
		Ok(())
	}

	fn list(&self) -> RepositoryResult<Vec<GithubRepoId>> {
		let connection = self.connection()?;
		let ids = dsl::github_repo_indexes.select(dsl::repo_id).load(&*connection)?;
		Ok(ids)
	}

	fn select_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> RepositoryResult<Option<serde_json::Value>> {
		let connection = self.connection()?;
		let state = dsl::github_repo_indexes
			.select(dsl::repo_indexer_state)
			.filter(dsl::repo_id.eq(repo_id))
			.first(&*connection)?;
		Ok(state)
	}

	fn update_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::update(dsl::github_repo_indexes)
			.set(dsl::repo_indexer_state.eq(state))
			.filter(dsl::repo_id.eq(repo_id))
			.execute(&*connection)?;
		Ok(())
	}

	fn select_issues_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> RepositoryResult<Option<serde_json::Value>> {
		let connection = self.connection()?;
		let state = dsl::github_repo_indexes
			.select(dsl::issues_indexer_state)
			.filter(dsl::repo_id.eq(repo_id))
			.first(&*connection)?;
		Ok(state)
	}

	fn update_issues_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::update(dsl::github_repo_indexes)
			.set(dsl::issues_indexer_state.eq(state))
			.filter(dsl::repo_id.eq(repo_id))
			.execute(&*connection)?;
		Ok(())
	}
}
