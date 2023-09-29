use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubRepoId;
use infrastructure::{
	contextualized_error::IntoContextualizedError, database::schema::github_repo_indexes::dsl,
	dbclient, dbclient::Result,
};

use super::GithubRepoIndex;
use crate::diesel::OptionalExtension;

pub trait Repository: dbclient::Repository<GithubRepoIndex> {
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

	fn select_pull_requests_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>>;
	fn update_pull_requests_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()>;

	fn start_indexing(&self, repo_id: GithubRepoId) -> Result<()>;
}

impl Repository for dbclient::Client {
	fn select_repo_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_repo_indexes
			.select(dsl::repo_indexer_state)
			.filter(dsl::repo_id.eq(repo_id))
			.first(&mut *connection)
			.optional()
			.err_with_context(format!(
				"select repo_indexer_state from github_repo_indexes where id={repo_id}"
			))?
			.flatten();
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
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_repo_indexes set github_repo_indexes where id={repo_id}"
			))?;
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
			.first(&mut *connection)
			.err_with_context(format!(
				"select issues_indexer_state from github_repo_indexes where id={repo_id}"
			))?;
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
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_repo_indexes set issues_indexer_state where id={repo_id}"
			))?;
		Ok(())
	}

	fn select_pull_requests_indexer_state(
		&self,
		repo_id: &GithubRepoId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_repo_indexes
			.select(dsl::pull_requests_indexer_state)
			.filter(dsl::repo_id.eq(repo_id))
			.first(&mut *connection)
			.err_with_context(format!(
				"select pull_requests_indexer_state from github_repo_indexes where id={repo_id}"
			))?;
		Ok(state)
	}

	fn update_pull_requests_indexer_state(
		&self,
		repo_id: &GithubRepoId,
		state: serde_json::Value,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(dsl::github_repo_indexes)
			.set(dsl::pull_requests_indexer_state.eq(state))
			.filter(dsl::repo_id.eq(repo_id))
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_repo_indexes set pull_requests_indexer_state where id={repo_id}"
			))?;
		Ok(())
	}

	fn start_indexing(&self, repo_id: GithubRepoId) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::github_repo_indexes)
			.values(GithubRepoIndex::new(repo_id))
			.on_conflict_do_nothing()
			.execute(&mut *connection)
			.err_with_context(format!("insert github_repo_indexes with id={repo_id}"))?;
		Ok(())
	}
}
