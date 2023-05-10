use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::GithubUserId;
use infrastructure::database::{schema::github_user_indexes::dsl, Client};

use crate::domain::{GithubUserIndexRepository, RepositoryResult};

impl GithubUserIndexRepository for Client {
	fn exists(&self, user_id: &GithubUserId) -> RepositoryResult<bool> {
		let connection = self.connection()?;
		let exists = diesel::select(diesel::dsl::exists(
			dsl::github_user_indexes.filter(dsl::user_id.eq(user_id)),
		))
		.get_result(&*connection)?;
		Ok(exists)
	}

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

	fn upsert_user_indexer_state(
		&self,
		user_id: &GithubUserId,
		state: serde_json::Value,
	) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::insert_into(dsl::github_user_indexes)
			.values((
				dsl::user_id.eq(user_id),
				dsl::user_indexer_state.eq(state.clone()),
			))
			.on_conflict(dsl::user_id)
			.do_update()
			.set(dsl::user_indexer_state.eq(state))
			.execute(&*connection)?;
		Ok(())
	}
}
