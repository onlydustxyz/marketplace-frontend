use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::GithubUserId;
use infrastructure::{
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

	fn select_contributor_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> Result<Option<serde_json::Value>>;
	fn upsert_contributor_indexer_state(
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
			.optional()?
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
			.execute(&mut *connection)?;
		Ok(())
	}

	fn select_contributor_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> Result<Option<serde_json::Value>> {
		let mut connection = self.connection()?;
		let state = dsl::github_user_indexes
			.select(dsl::contributor_indexer_state)
			.filter(dsl::user_id.eq(user_id))
			.first(&mut *connection)
			.optional()?
			.flatten();
		Ok(state)
	}

	fn upsert_contributor_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::github_user_indexes)
			.values((
				dsl::user_id.eq(user_id),
				dsl::contributor_indexer_state.eq(state.clone()),
			))
			.on_conflict(dsl::user_id)
			.do_update()
			.set(dsl::contributor_indexer_state.eq(state))
			.execute(&mut *connection)?;
		Ok(())
	}
}
