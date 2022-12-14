use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_repo_details::dsl, Client};

use crate::domain::GithubRepoDetail;

#[derive(DieselRepository, Constructor)]
#[entity(GithubRepoDetail)]
#[table(dsl::github_repo_details)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
