use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_repo_details::dsl, Client};

use crate::domain::GithubRepoDetails;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubRepoDetails)]
#[table(dsl::github_repo_details)]
#[id(dsl::id)]
#[mock]
pub struct Repository(Arc<Client>);
