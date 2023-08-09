use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubPullRequestId;
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{schema::github_pull_request_indexes::dsl, Result},
};

use super::GithubPullRequestIndex;

pub trait Repository: database::Repository<GithubPullRequestIndex> {
	fn select_pull_request_indexer_state(
		&self,
		pull_request_id: &GithubPullRequestId,
	) -> Result<Option<serde_json::Value>>;
	fn update_pull_request_indexer_state(
		&self,
		pull_request_id: &GithubPullRequestId,
		state: serde_json::Value,
	) -> Result<()>;

	fn start_indexing(&self, pull_request_id: GithubPullRequestId) -> Result<()>;
}

impl Repository for database::Client {
	fn select_pull_request_indexer_state(
		&self,
		pull_request_id: &GithubPullRequestId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_pull_request_indexes
			.select(dsl::pull_request_indexer_state)
			.filter(dsl::pull_request_id.eq(pull_request_id))
			.first(&mut *connection)
			.err_with_context(format!(
				"select pull_request_indexer_state from github_pull_request_indexes where id={pull_request_id}"
			))?;
		Ok(state)
	}

	fn update_pull_request_indexer_state(
		&self,
		pull_request_id: &GithubPullRequestId,
		state: serde_json::Value,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(dsl::github_pull_request_indexes)
			.set(dsl::pull_request_indexer_state.eq(state))
			.filter(dsl::pull_request_id.eq(pull_request_id))
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_pull_request_indexes set github_pull_request_indexes where id={pull_request_id}"
			))?;
		Ok(())
	}

	fn start_indexing(&self, pull_request_id: GithubPullRequestId) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::github_pull_request_indexes)
			.values(GithubPullRequestIndex::new(pull_request_id))
			.on_conflict_do_nothing()
			.execute(&mut *connection)
			.err_with_context(format!(
				"insert github_pull_request_indexes with id={pull_request_id}"
			))?;
		Ok(())
	}
}
