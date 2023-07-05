use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use event_listeners::models::GithubUserIndex;
use infrastructure::database::{schema::github_repo_indexes, Client, Result};

pub trait Repository<Id> {
	fn list_items_to_index(&self) -> Result<Vec<Id>>;
}

impl Repository<GithubRepoId> for Client {
	fn list_items_to_index(&self) -> Result<Vec<GithubRepoId>> {
		let mut connection = self.connection()?;
		let ids = github_repo_indexes::table
			.select(github_repo_indexes::repo_id)
			.filter(github_repo_indexes::enabled.eq(true))
			.load(&mut *connection)?;
		Ok(ids)
	}
}

impl Repository<GithubUserId> for Client {
	fn list_items_to_index(&self) -> Result<Vec<GithubUserId>> {
		let mut connection = self.connection()?;

		const QUERY: &str = r#"
			SELECT
				github_user_indexes.user_id
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
			.load::<GithubUserIndex>(&mut *connection)?
			.into_iter()
			.map(|res| res.user_id)
			.collect();

		Ok(ids)
	}
}
