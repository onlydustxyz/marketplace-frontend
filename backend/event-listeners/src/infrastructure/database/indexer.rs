/// Imports necessary traits and modules from external and local crates
use diesel::{QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::database::{
	schema::{github_repo_indexes, github_user_indexes},
	Client,
};

/// Implements the `IndexerRepository` trait for `GithubRepoId` and `Client`
impl IndexerRepository<GithubRepoId> for Client {
	/// Retrieves a list of `GithubRepoId` from the database table `github_repo_indexes`
	///
	/// # Returns
	///
	/// A `Vec` containing `GithubRepoId`s from the database table
	///
	/// # Errors
	///
	/// Returns an error if there is any issue with the database connection or query execution
	fn list_items_to_index(&self) -> RepositoryResult<Vec<GithubRepoId>> {
		let connection = self.connection()?;
		let ids = github_repo_indexes::table
			.select(github_repo_indexes::repo_id)
			.load(&*connection)?;
		Ok(ids)
	}
}

/// A struct representing a single row in the `github_user_indexes` table
#[derive(Debug, QueryableByName)]
#[table_name = "github_user_indexes"]
struct GithubUserIndex {
	/// The unique `GithubUserId` associated with the row
	#[sql_type = "Text"]
	user_id: GithubUserId,
}

/// Implements the `IndexerRepository` trait for `GithubUserId` and `Client`
impl IndexerRepository<GithubUserId> for Client {
	/// Retrieves a list of `GithubUserId` from the database table `github_user_indexes`
	///
	/// The query first fetches all `GithubUserId`s whose `user_indexer_state` column is null,
	/// or whose `user_indexer_state`'s `last_updated_time` value is more than a day old. It then
	/// joins these `GithubUserId`s with the `auth.github_users` table to exclude those that
	/// don't have a corresponding entry in that table.
	///
	/// # Returns
	///
	/// A `Vec` containing `GithubUserId`s from the database table
	///
	/// # Errors
	///
	/// Returns an error if there is any issue with the database connection or query execution
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