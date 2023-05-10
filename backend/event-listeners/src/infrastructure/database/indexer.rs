use diesel::{QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::database::{
	schema::{github_repo_indexes, github_user_indexes},
	Client,
};

use crate::domain::{IndexerRepository, RepositoryResult};

impl IndexerRepository<GithubRepoId> for Client {
	fn list_items_to_index(&self) -> RepositoryResult<Vec<GithubRepoId>> {
		let connection = self.connection()?;
		let ids = github_repo_indexes::table
			.select(github_repo_indexes::repo_id)
			.load(&*connection)?;
		Ok(ids)
	}
}

#[derive(Debug, QueryableByName)]
#[table_name = "github_user_indexes"]
struct GithubUserIndex {
	user_id: GithubUserId,
}

impl IndexerRepository<GithubUserId> for Client {
	fn list_items_to_index(&self) -> RepositoryResult<Vec<GithubUserId>> {
		let connection = self.connection()?;

		const QUERY: &str = r#"
			SELECT
				indexes.user_id
			FROM
				github_user_indexes indexes
				LEFT JOIN auth.github_users users ON users.github_user_id = indexes.user_id
			WHERE
				user_indexer_state IS NULL OR (
					users.id IS NOT NULL AND
					(user_indexer_state ->> 'last_updated_time')::TIMESTAMP < NOW() - INTERVAL '1 DAY'
				)
			"#;

		let ids = diesel::sql_query(QUERY)
			.load::<GithubUserIndex>(&*connection)?
			.into_iter()
			.map(|res| res.user_id)
			.collect();

		Ok(ids)
	}
}
