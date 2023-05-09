use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_repo_indexes::dsl, Client};

use crate::domain::GithubRepoIndex;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubRepoIndex)]
#[table(dsl::github_repo_indexes)]
#[id(dsl::repo_id)]
#[mock]
#[features(select, insert, delete)]
pub struct Repository(Arc<Client>);
