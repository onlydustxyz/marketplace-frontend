use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubRepoId;
use infrastructure::{
	database,
	database::{schema::github_repo_indexes::dsl, Result},
};

use super::GithubRepoIndex;

pub trait Repository: database::Repository<GithubRepoIndex> {
	fn select_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>>;
	fn update_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()>;

	fn select_issues_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>>;
	fn update_issues_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()>;
}

impl Repository for database::Client {
	fn select_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_repo_indexes
			.select(dsl::repo_indexer_state)
			.filter(dsl::repo_id.eq(repo_id))
			.first(&mut *connection)?;
		Ok(state)
	}

	fn update_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(dsl::github_repo_indexes)
			.set(dsl::repo_indexer_state.eq(state))
			.filter(dsl::repo_id.eq(repo_id))
			.execute(&mut *connection)?;
		Ok(())
	}

	fn select_issues_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_repo_indexes
			.select(dsl::issues_indexer_state)
			.filter(dsl::repo_id.eq(repo_id))
			.first(&mut *connection)?;
		Ok(state)
	}

	fn update_issues_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(dsl::github_repo_indexes)
			.set(dsl::issues_indexer_state.eq(state))
			.filter(dsl::repo_id.eq(repo_id))
			.execute(&mut *connection)?;
		Ok(())
	}
}
