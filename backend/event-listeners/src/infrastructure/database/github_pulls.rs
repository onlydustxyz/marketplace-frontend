use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_pulls::dsl, Client};

use crate::domain::GithubPull;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubPull)]
#[table(dsl::github_pulls)]
#[id(dsl::id)]
#[features(insert, update)]
#[mock]
pub struct Repository(Arc<Client>);
