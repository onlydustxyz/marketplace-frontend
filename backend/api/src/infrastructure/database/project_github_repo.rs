use std::sync::Arc;

use derive_more::Constructor;
use domain::Project;
use infrastructure::database::{schema::project_github_repos::dsl, Client};

use crate::domain::GithubRepo;

#[derive(DieselMappingRepository, Constructor, Clone)]
#[entities((Project, GithubRepo))]
#[ids((dsl::project_id, dsl::github_repo_id))]
#[table(dsl::project_github_repos)]
pub struct Repository(Arc<Client>);

#[cfg(test)]
mockall::mock! {
	pub Repository {
		pub fn new(client: Arc<Client>) -> Self;
		pub fn try_insert(&self, id1: &<Project as domain::Entity>::Id, id2: &<GithubRepo as domain::Entity>::Id)  -> Result<(), infrastructure::database::DatabaseError>;
		pub fn delete(&self, id1: &<Project as domain::Entity>::Id, id2: &<GithubRepo as domain::Entity>::Id)  -> Result<(), infrastructure::database::DatabaseError>;
		#[allow(clippy::type_complexity)]
		pub fn find_all_projects_of(&self, id1: &<GithubRepo as domain::Entity>::Id)  -> Result<Vec<(<Project as domain::Entity>::Id, <GithubRepo as domain::Entity>::Id)>, infrastructure::database::DatabaseError>;
	}

	impl Clone for Repository {
		fn clone(&self) -> Self;
	}
}
