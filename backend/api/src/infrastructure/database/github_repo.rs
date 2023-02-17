use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_repo_details::dsl, Client};

use crate::domain::GithubRepo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubRepo)]
#[table(dsl::github_repo_details)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

#[cfg(test)]
mockall::mock! {
	pub Repository {
		pub fn new(client: Arc<Client>) -> Self;
		pub fn upsert(&self, entity: &GithubRepo)  -> Result<(), infrastructure::database::DatabaseError>;
	}

	impl Clone for Repository {
		fn clone(&self) -> Self;
	}
}
