use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::GithubUserId;
use infrastructure::database::{schema::github_user_indexes::dsl, Client};

use crate::domain::{GithubUserIndexRepository, RepositoryResult};

impl GithubUserIndexRepository for Client {
	fn try_insert(&self, user_id: &GithubUserId) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::insert_into(dsl::github_user_indexes)
			.values((dsl::user_id.eq(user_id),))
			.on_conflict_do_nothing()
			.execute(&*connection)?;
		Ok(())
	}

	fn select_user_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> RepositoryResult<Option<serde_json::Value>> {
		let connection = self.connection()?;
		let state = dsl::github_user_indexes
			.select(dsl::user_indexer_state)
			.filter(dsl::user_id.eq(user_id))
			.first(&*connection)
			.optional()?
			.flatten();
		Ok(state)
	}

	fn update_user_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::update(dsl::github_user_indexes)
			.set(dsl::user_indexer_state.eq(state))
			.filter(dsl::user_id.eq(user_id))
			.execute(&*connection)?;
		Ok(())
	}

	fn select_contributor_indexer_state(
		&self,
		user_id: &GithubUserId,
	) -> RepositoryResult<Option<serde_json::Value>> {
		let connection = self.connection()?;
		let state = dsl::github_user_indexes
			.select(dsl::contributor_indexer_state)
			.filter(dsl::user_id.eq(user_id))
			.first(&*connection)
			.optional()?
			.flatten();
		Ok(state)
	}

	fn upsert_contributor_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::insert_into(dsl::github_user_indexes)
			.values((
				dsl::user_id.eq(user_id),
				dsl::contributor_indexer_state.eq(state.clone()),
			))
			.on_conflict(dsl::user_id)
			.do_update()
			.set(dsl::contributor_indexer_state.eq(state))
			.execute(&*connection)?;
		Ok(())
	}
}
