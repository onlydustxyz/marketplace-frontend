use std::sync::Arc;

use derive_more::Constructor;
use domain::{GithubRepo, GithubUser};
use infrastructure::database::{schema::github_repos_contributors::dsl, Client};

#[derive(DieselMappingRepository, Constructor, Clone)]
#[entities((GithubRepo, GithubUser))]
#[ids((dsl::repo_id, dsl::user_id))]
#[table(dsl::github_repos_contributors)]
#[mock]
pub struct Repository(Arc<Client>);
