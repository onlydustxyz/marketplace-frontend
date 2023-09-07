use chrono::Utc;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database::{
		schema::{github_repo_indexes, github_user_indexes},
		Client, Result,
	},
};

use crate::models::GithubUserIndex;

pub trait Repository<Id>: Send + Sync {
	fn list_items_to_index(&self) -> Result<Vec<Id>>;
	fn update_indexed_at(&self, id: &Id) -> Result<()>;
}

impl Repository<GithubRepoId> for Client {
	fn list_items_to_index(&self) -> Result<Vec<GithubRepoId>> {
		let mut connection = self.connection()?;
		let ids = github_repo_indexes::table
			.select(github_repo_indexes::dsl::repo_id)
			.load(&mut *connection)
			.err_with_context("list github_repo_indexes to (re)index")?;
		Ok(ids)
	}

	fn update_indexed_at(&self, repo_id: &GithubRepoId) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(github_repo_indexes::dsl::github_repo_indexes)
			.set(github_repo_indexes::dsl::indexed_at.eq(Utc::now().naive_utc()))
			.filter(github_repo_indexes::dsl::repo_id.eq(repo_id))
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_repo_indexes set indexed_at = NOW where id={repo_id}"
			))?;
		Ok(())
	}
}

impl Repository<GithubUserId> for Client {
	fn list_items_to_index(&self) -> Result<Vec<GithubUserId>> {
		let mut connection = self.connection()?;

		const QUERY: &str = r#"
			SELECT
				github_user_indexes.user_id,
				github_user_indexes.indexed_at
			FROM
				github_user_indexes
				LEFT JOIN registered_users users ON users.github_user_id = github_user_indexes.user_id
			WHERE
				user_indexer_state IS NULL
				OR NOT (user_indexer_state ? 'last_indexed_time')
				OR (
					users.id IS NOT NULL
					AND (user_indexer_state ->> 'last_indexed_time')::TIMESTAMP < NOW() - INTERVAL '1 DAY'
				);
			"#;

		let ids = diesel::sql_query(QUERY)
			.load::<GithubUserIndex>(&mut *connection)
			.err_with_context("list github_user_indexes to (re)index")?
			.into_iter()
			.map(|res| res.user_id)
			.collect();

		Ok(ids)
	}

	fn update_indexed_at(&self, user_id: &GithubUserId) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::update(github_user_indexes::table)
			.set(github_user_indexes::dsl::indexed_at.eq(Utc::now().naive_utc()))
			.filter(github_user_indexes::dsl::user_id.eq(user_id))
			.execute(&mut *connection)
			.err_with_context(format!(
				"update github_user_indexes set indexed_at = NOW where id={user_id}"
			))?;
		Ok(())
	}
}
