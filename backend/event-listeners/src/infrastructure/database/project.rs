use crate::domain::Project;
use derive_more::Constructor;
use domain::GithubRepositoryId;
use infrastructure::database::{
	schema::projects::{self, dsl},
	Client,
};
use std::sync::Arc;

#[derive(DieselRepository, Constructor)]
#[entity(Project)]
#[table(dsl::projects)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

#[derive(AsChangeset, Constructor)]
#[table_name = "projects"]
pub struct UpdateGitubRepoIdChangeset {
	github_repo_id: GithubRepositoryId,
}
