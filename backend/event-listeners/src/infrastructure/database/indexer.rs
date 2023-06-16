use diesel::{QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::database::{
	schema::{github_repo_indexes, github_user_indexes},
	Client,
};

use crate::domain::{IndexerRepository, RepositoryResult};

impl IndexerRepository<GithubRepoId> for Client {
	fn list_items_to_index(&self) -> RepositoryResult<Vec<GithubRepoId>> {
		let mut connection = self.connection()?;
		let ids = github_repo_indexes::table
			.select(github_repo_indexes::repo_id)
			.load(&mut *connection)?;
		Ok(ids)
	}
}

#[derive(Debug, QueryableByName)]
#[diesel(table_name = github_user_indexes)]
struct GithubUserIndex {
	user_id: GithubUserId,
}

impl IndexerRepository<GithubUserId> for Client {
	fn list_items_to_index(&self) -> RepositoryResult<Vec<GithubUserId>> {
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
