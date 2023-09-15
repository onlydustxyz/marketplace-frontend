use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::GithubUserId;
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{schema::github_user_indexes::dsl, Result},
};

use super::GithubUserIndex;

pub trait Repository: database::ImmutableRepository<GithubUserIndex> {
	fn select_user_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> Result<Option<serde_json::Value>>;
	fn update_user_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> Result<()>;
}

impl Repository for database::Client {
	fn select_user_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_user_indexes
			.select(dsl::user_indexer_state)
			.filter(dsl::user_id.eq(user_id))
			.first(&mut *connection)
			.optional()
			.err_with_context(format!(
				"select user_indexer_state from github_user_indexes where user_id={user_id}"
			))?
			.flatten();
		Ok(state)
	}

	fn update_user_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(dsl::github_user_indexes)
			.set(dsl::user_indexer_state.eq(state))
			.filter(dsl::user_id.eq(user_id))
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_user_indexes set user_indexer_state where user_id={user_id}"
			))?;
		Ok(())
	}
}
