use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_repos::dsl, Client};

use crate::domain::GithubRepo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubRepo)]
#[table(dsl::github_repos)]
#[id(dsl::id)]
#[mock]
pub struct Repository(Arc<Client>);
