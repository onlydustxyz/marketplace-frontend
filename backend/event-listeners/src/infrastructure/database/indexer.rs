use diesel::{QueryDsl, RunQueryDsl};
use domain::GithubRepoId;
use infrastructure::database::{schema::github_repo_indexes::dsl, Client};

use crate::domain::{IndexerRepository, RepositoryResult};

impl IndexerRepository<GithubRepoId> for Client {
	fn list_items_to_index(&self) -> RepositoryResult<Vec<GithubRepoId>> {
		let connection = self.connection()?;
		let ids = dsl::github_repo_indexes.select(dsl::repo_id).load(&*connection)?;
		Ok(ids)
	}
}
