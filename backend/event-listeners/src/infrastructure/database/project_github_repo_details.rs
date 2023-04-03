use std::sync::Arc;

use derive_more::Constructor;
use domain::Project;
use infrastructure::database::{schema::project_github_repos::dsl, Client};

use crate::domain::GithubRepoDetails;

#[derive(DieselMappingRepository, Constructor, Clone)]
#[entities((Project, GithubRepoDetails))]
#[ids((dsl::project_id, dsl::github_repo_id))]
#[table(dsl::project_github_repos)]
#[mock]
pub struct Repository(Arc<Client>);
