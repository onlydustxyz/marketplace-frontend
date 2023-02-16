use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_repo_details::dsl, Client};

use crate::domain::GithubRepo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubRepo)]
#[table(dsl::github_repo_details)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
