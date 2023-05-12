use std::sync::Arc;

use derive_more::Constructor;
use domain::{GithubRepo, Project};
use infrastructure::database::{schema::project_github_repos::dsl, Client};

#[derive(DieselMappingRepository, Constructor, Clone)]
#[entities((Project, GithubRepo))]
#[ids((dsl::project_id, dsl::github_repo_id))]
#[table(dsl::project_github_repos)]
#[mock]
pub struct Repository(Arc<Client>);
